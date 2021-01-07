import React, { Fragment, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/layout/AppNavbar.jsx';
import ShoppingList from './components/shopping-list/ShoppingList.jsx';
import AddItemModal from './components/layout/AddItemModal.jsx';
import { loadUser } from './_actions/auth';
import setAuthToken from './utils/setAuthToken';
// redux
import store from './store';
import { Provider } from 'react-redux';

// if (localStorage.token) {
setAuthToken(localStorage.token);
// }

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Fragment>
				<AppNavbar />
				<AddItemModal />
				<ShoppingList />
			</Fragment>
		</Provider>
	);
};

export default App;
