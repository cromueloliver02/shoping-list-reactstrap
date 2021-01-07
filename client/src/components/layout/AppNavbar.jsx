import React, { Fragment, useState } from 'react';
import RegisterModal from '../auth/RegisterModal.jsx';
import LoginModal from '../auth/LoginModal.jsx';
import { connect } from 'react-redux';
import { logout } from '../../_actions/auth';
import PropTypes from 'prop-types';

import {
	Navbar,
	Container,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

const AppNavbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
	const [isOpen, toggle] = useState(false);

	const guestLink = (
		<Fragment>
			{user !== null && (
				<NavItem>
					<NavLink>Howdy, {user.name}</NavLink>
				</NavItem>
			)}
			<NavItem>
				<NavLink href='#!' onClick={() => logout()}>
					Logout
				</NavLink>
			</NavItem>
		</Fragment>
	);

	const authLink = (
		<Fragment>
			<NavItem>
				<LoginModal />
			</NavItem>
			<NavItem>
				<RegisterModal />
			</NavItem>
		</Fragment>
	);

	return (
		<Navbar color='dark' dark expand='sm'>
			<Container>
				<NavbarBrand href='/'>ShoppingList</NavbarBrand>
				<NavbarToggler onClick={() => toggle(!isOpen)} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						{!loading && isAuthenticated ? guestLink : authLink}
						<NavItem>
							<NavLink
								href='https://github.com/cromueloliver02/shoping-list-reactstrap'
								target='_blank'
							>
								Github
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

AppNavbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavbar);
