import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../_actions/auth';
import { setAlert } from '../../_actions/alert';
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

const RegisterModal = ({ register, setAlert }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const { name, email, password, password2 } = formData;

	const toggle = () => setIsOpen(!isOpen);

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onRegister = e => {
		if (password !== password2) {
			setAlert('Passwords does not match', 'danger');

			setFormData({
				name,
				email,
				password: '',
				password2: ''
			});
		} else {
			register(formData);

			setFormData({
				name: '',
				email: '',
				password: '',
				password2: ''
			});
		}

		e.preventDefault();
	};

	return (
		<Fragment>
			<NavLink href='#!' onClick={toggle}>
				Register
			</NavLink>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Register</ModalHeader>
				<Alert />
				<ModalBody>
					<Form onSubmit={onRegister}>
						<FormGroup>
							<Label for='name'>Name</Label>
							<Input
								id='name'
								type='text'
								placeholder='Name...'
								name='name'
								value={name}
								onChange={e => onChange(e)}
							/>
						</FormGroup>
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
						<FormGroup>
							<Label for='password2'>Confirm password</Label>
							<Input
								id='password2'
								type='password'
								placeholder='Confirm password...'
								name='password2'
								value={password2}
								onChange={e => onChange(e)}
							/>
						</FormGroup>
						<Button type='submit' color='dark' block>
							Register
						</Button>
					</Form>
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

RegisterModal.propTypes = {
	register: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
};

export default connect(null, { register, setAlert })(RegisterModal);
