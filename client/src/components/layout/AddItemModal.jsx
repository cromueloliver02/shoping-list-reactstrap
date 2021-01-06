import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../_actions/item';
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

const AddItemModal = ({ addItem }) => {
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
		<Container>
			<Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
				Add Item
			</Button>

			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
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
						<Button type='submit' color='dark' block className='mt-3'>
							Add Item
						</Button>
					</Form>
				</ModalBody>
			</Modal>
		</Container>
	);
};

AddItemModal.propTypes = {
	addItem: PropTypes.func.isRequired
};

export default connect(null, { addItem })(AddItemModal);
