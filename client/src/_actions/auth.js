import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	SET_LOADING_AUTH
} from './types';

// load user
export const loadUser = () => async dispatch => {
	// if (localStorage.token) {
	setAuthToken(localStorage.token);
	// }

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

// login
export const login = ({ email, password }) => async dispatch => {
	dispatch(setLoading());

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = { email, password };

	try {
		const res = await axios.post('/api/auth', body, config);

		setTimeout(() => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});

			dispatch(loadUser());
		}, 3000);
	} catch (err) {
		if (err.response.data.errors !== undefined) {
			const errors = err.response.data.errors;

			errors.forEach(error => dispatch(setAlert(error.msg, 'danger'), 3000));
		}

		dispatch({
			type: LOGIN_FAIL,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

// register
export const register = ({ name, email, password }) => async dispatch => {
	dispatch(setLoading());

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = { name, email, password };

	try {
		const res = await axios.post('/api/users', body, config);

		setTimeout(() => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});

			dispatch(loadUser());
		}, 3000);
	} catch (err) {
		if (err.response.data.errors !== undefined) {
			const errors = err.response.data.errors;

			errors.forEach(error => dispatch(setAlert(error.msg, 'danger'), 3000));
		}

		dispatch({
			type: REGISTER_FAIL,
			payload: {
				status: err.response.status,
				statusText: err.response.statusText,
				msg: err.response.data.msg
			}
		});
	}
};

// logout
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT, payload: null });
};

// set loading
const setLoading = () => dispatch => dispatch({ type: SET_LOADING_AUTH });
