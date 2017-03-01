'use strict';

const createReducer = require('../helpers/createReducer');
const config = require('../../config');
const arrayToObj = require('../helpers/arrayToObj');

const initialState = {
    reminders: {},
    currentLocation: config.defaultLocation,
    selectedReminder: null,
};

module.exports = createReducer(initialState, {

    stateLoadSuccess(state, payload) {
        if (!payload.reminders) return state;
        return Object.assign({}, state, { reminders: arrayToObj(payload.reminders, '_id') });
    },

    loginSuccess(state, payload) {
        if (!payload.reminders) return state;
        return Object.assign({}, state, { reminders: arrayToObj(payload.reminders, '_id') });
    },

    registerSuccess(state, payload) {
        if (!payload.reminders) return state;
        return Object.assign({}, state, { reminders: arrayToObj(payload.reminders, '_id') });
    },

    locationChanged(state, payload) {
        if (payload.location === state.currentLocation) return state;
        return Object.assign({}, state, {currentLocation: payload.location});
    },

    reminderSelected(state, payload) {
        return Object.assign({}, state, {selectedReminder: payload.reminder});
    },

    reminderSuccess(state, payload) {
        const newState = Object.assign({}, state);
        newState.reminders[payload.reminder._id] = payload.reminder;
        return Object.assign(newState);
    },
});
