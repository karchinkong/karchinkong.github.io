import {RECEIVE_ISSUES, FETCH_INFO} from '../constants/ActionTypes';
import {CONFIG} from '../constants/Config';

/**
 * 获取Issues
 * @param data
 * @returns {{type, posts: *}}
 */
const receiveIssues = (data) => {
	return {
		type: RECEIVE_ISSUES,
		posts: data
	};
};

/**
 * 判断共享状态里是否已经有数据,若有数据则不需要再请求接口获取数据
 * @param state
 * @returns {boolean}
 */
const shouldFetchIssues = (state) => {

	if (!state) {
		return true;
	}

	return !state.items.length;

};

/**
 * 获取Issues数据
 * @returns {function(*=, *)}
 */
export const fetchIssues = () => {

	return (dispatch, getState) => {

		if (!shouldFetchIssues(getState())) {

			return Promise.resolve();

		} else {

			dispatch(() => {

				let url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues?creator=karchinkong&per_page=100`;

				return fetch(url)
					.then(response => response.json())
					.then(json =>
						dispatch(receiveIssues(json))
					)

			});

		}

	}

};

export const fetchInfo = () => {

	return (dispatch, getState) => {

		const {owner, githubUrl, age, jobs} = CONFIG;

		dispatch({

			type: FETCH_INFO,

			data: {owner, githubUrl, age, jobs}

		});

	}

};