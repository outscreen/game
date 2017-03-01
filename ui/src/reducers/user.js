'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    username: undefined,
    loggedIn: false,
};

module.exports = createReducer(initialState, {

    stateLoadSuccess(state, payload) {
        return Object.assign({}, state, {
            username: payload.username,
            loggedIn: true,
        });
    },

    stateLoadFailure(state) {
        return Object.assign({}, state, {
            loggedIn: false,
        });
    },

    loginSuccess(state, payload) {
        return Object.assign({}, state, {
            username: payload.username,
            loggedIn: true,
        });
    },

    logoutSuccess() {
        return Object.assign({}, initialState);
    },

    registerSuccess(state, payload) {
        return Object.assign({}, state, {
            username: payload.username,
            loggedIn: true,
        });
    },
});
