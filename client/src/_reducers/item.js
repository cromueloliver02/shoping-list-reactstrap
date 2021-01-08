import {
	GET_ITEMS,
	ADD_ITEM,
	DELETE_ITEM,
	CLEAR_ITEMS,
	SET_LOADING_ITEM,
	ITEM_ERROR
} from '../_actions/types';

const initialState = {
	items: [],
	loading: false,
	error: null
};

const itemReducers = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ITEMS:
			return {
				...state,
				items: payload,
				loading: false
			};
		case ADD_ITEM:
			return {
				...state,
				items: [payload, ...state.items],
				loading: false
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== payload),
				loading: false
			};
		case CLEAR_ITEMS:
			return {
				...state,
				items: [],
				loading: false
			};
		case SET_LOADING_ITEM:
			return {
				...state,
				loading: true
			};
		case ITEM_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
};

export default itemReducers;
