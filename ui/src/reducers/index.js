'use strict';

const combineReducers = require('redux').combineReducers;

const user = require('./user');
const route = require('./route');
const reminder = require('./reminder');

module.exports = combineReducers({
    user,
    route,
    reminder,
});
