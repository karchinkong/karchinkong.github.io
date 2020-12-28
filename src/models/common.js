export default {
    state: {},
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    effects: {
        * login({ payload }, { call }) {

        },
    },
};