'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    current: 'login',
    previous: undefined
};

module.exports = createReducer(initialState, {
    login(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'profile',
        });
    },

    logout(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'login',
        });
    },
});
