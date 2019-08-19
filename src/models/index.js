import { queryIssues, queryOpenSources } from '../services/index';

export default {
    state: {
        issuesLists: [],
        openSourceLists: [],
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    effects: {
        * queryIssues({ payload }, { call, put }) {
            const issuesLists = yield call(queryIssues, payload);
            yield put({
                type: 'save',
                payload: { issuesLists },
            });
        },
        * queryOpenSourceLists({ payload }, { call, put }) {
            const openSourceLists = yield call(queryOpenSources);
            yield put({
                type: 'save',
                payload: { openSourceLists },
            });
        },
    },
};