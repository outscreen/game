'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    username: undefined,
};

module.exports = createReducer(initialState, {
    request(state) {
        return Object.assign({}, state, {
            inProgress: true,
        });
    },

    login(state, payload) {
        console.log(123)
        return Object.assign({}, state, {
        });
    },

    logout(state, payload) {
        return Object.assign({}, state, {
        });
    },

    failure(state, payload) {
        return Object.assign({}, state, {
        });
    },
});
