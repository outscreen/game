'use strict';

const db = require('../db');
const config = require('../config');

const getUnread = (userUuid) => db.get(config.db.remindersTable, {
    status: { $ne: config.status.read },
    userUuid,
});

module.exports = {
    getUnread,
};
