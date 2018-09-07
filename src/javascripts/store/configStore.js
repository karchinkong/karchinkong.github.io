import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import indexReducer from '../reducer/index';


const configStore = (preloadedState) => {
	return createStore(
		indexReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware
		)
	);
};

export default configStore;