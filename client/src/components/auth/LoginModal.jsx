import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../_actions/auth';
import Alert from '../layout/AppAlert.jsx';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	NavLink
} from 'reactstrap';

const LoginModal = ({ loading, login }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formData;

	const toggle = () => setIsOpen(!isOpen);

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onLogin = e => {
		login(formData);

		setFormData({
			email: '',
			password: ''
		});

		e.preventDefault();
	};

	return (
		<Fragment>
			<NavLink href='#!' onClick={!loading && toggle}>
				Login
			</NavLink>
			<Modal isOpen={isOpen} toggle={!loading && toggle}>
				<ModalHeader toggle={!loading && toggle}>Login</ModalHeader>
				<Alert />
				<ModalBody>
					<Form onSubmit={onLogin}>
						<FormGroup>
							<Label for='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='Email...'
								name='email'
								value={email}
								onChange={e => onChange(e)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='Password...'
								name='password'
								value={password}
								onChange={e => onChange(e)}
							/>
						</FormGroup>
						<Button type='submit' color='dark' block disabled={loading}>
							{loading ? (
								<Fragment>
									<i className='fas fa-cog fa-spin'></i> Loading . . .
								</Fragment>
							) : (
								<Fragment>Login</Fragment>
							)}
						</Button>
					</Form>
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

LoginModal.propTypes = {
	login: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	loading: state.auth.loading
});

export default connect(mapStateToProps, { login })(LoginModal);
