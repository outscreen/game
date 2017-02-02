'use strict';

const thunk = require('redux-thunk').default;
const redux = require('redux');

const config = require('../config');
const reducers = require('./reducers');

const log = (store) => (next) => (action) => {
    if (!config.isDebug) return;
    console.log('action: ', action);
};

module.exports = function (initialState) {
    return redux.createStore(reducers, initialState, redux.applyMiddleware(
        thunk,
        log
    ));
};
