import {RECEIVE_ISSUES, FETCH_INFO} from '../constants/ActionTypes.js';

var state = {

	isFetching: false,

	items: []

};

const indexReducer = (state, action) => {

	switch (action.type) {

		case RECEIVE_ISSUES:
			return {
				...state,
				isFetching: false,
				items: action.posts,
				userInfo: {}
			};
			
			break;

		case FETCH_INFO:
			return {
				...state,
				isFetching: false,
				items: [],
				userInfo: action.data
			};
			
			break;

		default:
			return state;

	}

};

export default indexReducer;