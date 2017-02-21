'use strict';

const createReducer = require('../helpers/createReducer');

const initialState = {
    current: 'base',
    previous: undefined,
    error: null,
};

module.exports = createReducer(initialState, {
    clear(state) {
        return Object.assign({}, state, {
            error: null
        });
    },

    stateLoaded(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'base',
            error: null,
        });
    },

    loginSuccess(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'base',
            error: null,
        });
    },

    registerSuccess() {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'base',
            error: null,
        });
    },

    actionFailure(state, payload) {
        return Object.assign({}, state, {
            error: payload.error,
        });
    },

    logoutSuccess(state) {
        return Object.assign({}, state, {
            previous: state.current,
            current: 'login',
            error: null,
        });
    },

    routeChange(state, payload) {
        if (payload.route === state.current) return state;

        return Object.assign({}, state, {
            previous: state.current,
            current: payload.route,
            error: null,
        });
    },
});
