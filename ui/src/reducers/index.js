'use strict';

const combineReducers = require('redux').combineReducers;

const auth = require('./auth');

module.exports = combineReducers({
    auth,
});
