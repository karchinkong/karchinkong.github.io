import { queryIssues } from '../services/index';

export default {
    state: {
        issuesLists: [],
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    effects: {
        * queryIssues({ payload }, { call, put }) {
            const data = yield call(queryIssues, payload);
            yield put({
                type: 'save',
                payload: { issuesLists: data },
            });
        },
    },
};