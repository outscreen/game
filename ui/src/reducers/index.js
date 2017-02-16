'use strict';

const combineReducers = require('redux').combineReducers;

const auth = require('./auth');
const route = require('./route');

module.exports = combineReducers({
    auth,
    route,
});
