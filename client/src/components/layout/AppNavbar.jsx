import React, { useState } from 'react';
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

const AppNavbar = () => {
	const [isOpen, toggle] = useState(false);

	return (
		<Navbar color='dark' dark expand='sm' className='mb-5'>
			<Container>
				<NavbarBrand href='/'>ShoppingList</NavbarBrand>
				<NavbarToggler onClick={() => toggle(!isOpen)} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink href='https://github.com/cromueloliver02'>
								Github
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
