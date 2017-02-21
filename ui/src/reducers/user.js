'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    username: undefined,
};

module.exports = createReducer(initialState, {

    stateLoaded(state, payload) {
        return Object.assign({}, state, { username: payload.username });
    },

    loginSuccess(state, payload) {
        return Object.assign({}, state, { username: payload.username });
    },

    registerSuccess(state, payload) {
        return Object.assign({}, state, { username: payload.username });
    },
});
