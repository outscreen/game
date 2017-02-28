'use strict';

const isomorphic = require('./isomorphic');

const config = Object.assign({}, isomorphic, {
    db: {
        connectionUri: process.env.db,
        usersTable: 'r_users',
        sessionsTable: 'r_sessions',
        remindersTable: 'r_reminders',
        uuidLength: 8,
    },
});

module.exports = config;