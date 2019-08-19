import { queryIssues, queryOpenSources, queryIssueDetailById, queryIssueCommentById } from '../services/index';

export default {
    state: {
        issuesLists: [],
        issueDetail: {},
        issueCommentLists: [],
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
        * queryIssueDetailById({ payload }, { call, put }) {
            const issueDetail = yield call(queryIssueDetailById, payload);
            yield put({
                type: 'save',
                payload: { issueDetail },
            });
        },
        * queryIssueCommentById({ payload }, { call, put }) {
            const issueCommentLists = yield call(queryIssueCommentById, payload);
            yield put({
                type: 'save',
                payload: { issueCommentLists },
            });
        },
        * addComment({}, { put, select }) {
            const comment = yield select(state => state.index.issueCommentLists);
            yield put({
                type: 'save',
                payload: {
                    issueCommentLists: [
                        ...comment,
                        {
                            'url': 'https://api.github.com/repos/karchinkong/Blogsystem/issues/comments/522495265',
                            'html_url': 'https://github.com/karchinkong/Blogsystem/issues/4#issuecomment-522495265',
                            'issue_url': 'https://api.github.com/repos/karchinkong/Blogsystem/issues/4',
                            'id': 21391230,
                            'node_id': 'MDEyOklzc3VlQ29tbWVudDUyMjQ5NTI2NQ==',
                            'user': {
                                'login': 'karchinkong',
                                'id': 16110331,
                                'node_id': 'MDQ6VXNlcjE2MTEwMzMx',
                                'avatar_url': 'https://avatars2.githubusercontent.com/u/16110331?v=4',
                                'gravatar_id': '',
                                'url': 'https://api.github.com/users/karchinkong',
                                'html_url': 'https://github.com/karchinkong',
                                'followers_url': 'https://api.github.com/users/karchinkong/followers',
                                'following_url': 'https://api.github.com/users/karchinkong/following{/other_user}',
                                'gists_url': 'https://api.github.com/users/karchinkong/gists{/gist_id}',
                                'starred_url': 'https://api.github.com/users/karchinkong/starred{/owner}{/repo}',
                                'subscriptions_url': 'https://api.github.com/users/karchinkong/subscriptions',
                                'organizations_url': 'https://api.github.com/users/karchinkong/orgs',
                                'repos_url': 'https://api.github.com/users/karchinkong/repos',
                                'events_url': 'https://api.github.com/users/karchinkong/events{/privacy}',
                                'received_events_url': 'https://api.github.com/users/karchinkong/received_events',
                                'type': 'User',
                                'site_admin': false,
                            },
                            'created_at': '2019-08-19T09:44:56Z',
                            'updated_at': '2019-08-19T09:44:56Z',
                            'author_association': 'OWNER',
                            'body': 'TestComment!',
                        },
                    ],
                },
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