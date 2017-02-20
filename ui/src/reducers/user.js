'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    username: undefined,
};

module.exports = createReducer(initialState, {

    loginSuccess(state, payload) {
        return Object.assign({}, state, { username: payload.username });
    },

    registerSuccess(state, payload) {
        const newState = { username: payload.username };
        if (payload.reminders) newState.remibders = payload.reminders;

        return Object.assign({}, state, newState);
    },

});
