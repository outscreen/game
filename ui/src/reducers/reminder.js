'use strict';

const createReducer = require('../helpers/createReducer');
const config = require('../../config');

const initialState = {
    reminders: [],
};

module.exports = createReducer(initialState, {

    stateLoaded(state, payload) {
        if (!payload.reminders) return state;
        return Object.assign({}, state, { reminders: payload.reminders });
    },

    loginSuccess(state, payload) {
        if (!payload.reminders) return state;
        return Object.assign({}, state, { reminders: payload.reminders });
    },

    registerSuccess(state, payload) {
        if (!payload.reminders) return state;
        return Object.assign({}, state, { reminders: payload.reminders });
    },

});
