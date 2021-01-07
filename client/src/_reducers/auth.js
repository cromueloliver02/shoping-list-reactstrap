import axios from 'axios';
import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	SET_LOADING_AUTH
} from '../_actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	user: null,
	loading: false,
	error: null
};

const auth = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: false
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			delete axios.defaults.headers.common['x-auth-token'];
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				loading: false,
				error: payload
			};
		case SET_LOADING_AUTH:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default auth;
