import axios from 'axios';
import {
	GET_ITEMS,
	ADD_ITEM,
	DELETE_ITEM,
	CLEAR_ITEMS,
	SET_LOADING_ITEM,
	ITEM_ERROR
} from './types';

export const getItems = () => async dispatch => {
	dispatch(setLoading());

	try {
		const res = await axios.get('/api/items');

		dispatch({
			type: GET_ITEMS,
			payload: res.data
		});
	} catch (err) {
		console.error(err.message);

		dispatch({
			type: ITEM_ERROR,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

export const addItem = name => async dispatch => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = { name };

		const res = await axios.post('/api/items', body, config);

		setTimeout(() => {
			dispatch({
				type: ADD_ITEM,
				payload: res.data
			});
		}, 1500);
	} catch (err) {
		console.error(err.message);

		dispatch({
			type: ITEM_ERROR,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

export const deleteItem = itemId => async dispatch => {
	try {
		await axios.delete(`/api/items/${itemId}`);

		dispatch({
			type: DELETE_ITEM,
			payload: itemId
		});
	} catch (err) {
		console.error(err.message);

		dispatch({
			type: ITEM_ERROR,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

export const clearItems = () => async dispatch => {
	try {
		await axios.delete('/api/items');

		dispatch({ type: CLEAR_ITEMS });
	} catch (err) {
		console.error(err.message);

		dispatch({
			type: ITEM_ERROR,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

const setLoading = () => dispatch => {
	dispatch({
		type: SET_LOADING_ITEM
	});
};
