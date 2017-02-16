'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    current: 'base',
    previous: undefined
};

module.exports = createReducer(initialState, {
    login(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'base',
        });
    },

    logout(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'login',
        });
    },

    routeChange(state, payload) {
        return Object.assign({}, state, {
            previous: state.current,
            current: payload.route,
        });
    },
});
