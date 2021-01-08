import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addItem, clearItems } from '../../_actions/item';
import { Row, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import {
	Container,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';

const Buttons = ({
	auth: { isAuthenticated },
	loading,
	addItem,
	clearItems
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState('');

	const toggle = () => setIsOpen(!isOpen);

	const onSubmit = e => {
		if (name !== '') {
			addItem(name);

			setName('');

			toggle();
		}

		e.preventDefault();
	};

	return (
		<Container className='pt-5 pb-4'>
			<Row>
				<Col sm={{ size: 6, offset: 3 }}>
					{isAuthenticated ? (
						<Fragment>
							<Button
								color='dark'
								size='sm'
								onClick={toggle}
								disabled={loading}
							>
								{console.log(loading)}
								{loading ? (
									<Fragment>
										<i className='fas fa-cog fa-spin'></i> Adding to
										list . . .
									</Fragment>
								) : (
									<Fragment>Add Item</Fragment>
								)}
							</Button>
							<Button
								color='danger'
								size='sm'
								className='ml-2'
								onClick={() => clearItems()}
							>
								Clear All
							</Button>
						</Fragment>
					) : (
						<Alert color='info'>
							<i className='fas fa-info-circle'></i> Login to gain access
						</Alert>
					)}

					<Modal isOpen={isOpen} toggle={toggle}>
						<ModalHeader toggle={toggle}>
							Add To Shopping List
						</ModalHeader>
						<ModalBody>
							<Form onSubmit={onSubmit}>
								<FormGroup>
									<Label for='item'>Item</Label>
									<Input
										type='text'
										name='name'
										id='item'
										placeholder='Add shopping item...'
										onChange={e => setName(e.target.value)}
									/>
								</FormGroup>
								<Button
									type='submit'
									color='dark'
									block
									className='mt-3'
								>
									Add Item
								</Button>
							</Form>
						</ModalBody>
					</Modal>
				</Col>
			</Row>
		</Container>
	);
};

Buttons.propTypes = {
	addItem: PropTypes.func.isRequired,
	clearItems: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	loading: state.item.loading
});

export default connect(mapStateToProps, { addItem, clearItems })(Buttons);
