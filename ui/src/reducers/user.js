'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    username: undefined,
};

module.exports = createReducer(initialState, {

    loginFailure(state, payload) {
        return Object.assign({}, state, {
        });
    },

});
