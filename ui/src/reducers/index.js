'use strict';

const combineReducers = require('redux').combineReducers;

const auth = require('./user');
const route = require('./route');

module.exports = combineReducers({
    auth,
    route,
});
