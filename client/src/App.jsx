import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/layout/AppNavbar.jsx';
import ShoppingList from './components/shopping-list/ShoppingList.jsx';
import AddItemModal from './components/layout/AddItemModal.jsx';
// redux
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
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
