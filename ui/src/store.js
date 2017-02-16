'use strict';

const thunk = require('redux-thunk').default; // TODO WTF?
const redux = require('redux');

const config = require('../config');
const reducers = require('./reducers');

const log = (store) => (next) => (action) => {
    if (!config.isDebug) return next(action);
    console.log('action: ', action);
    return next(action);
};

module.exports = function (initialState) {
    return redux.createStore(reducers, initialState, redux.applyMiddleware(
        log
    ));
};
