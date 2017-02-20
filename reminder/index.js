'use strict';

const db = require('../db');
const config = require('../config');

const getUnread = (userUuid) => db.get(config.db.remindersTable, {
    status: { $ne: config.status.read },
    userUuid,
});

const add = (params) => db.create(config.db.remindersTable, {
    status: config.status.unread,
    userUuid: params.userUuid,
    dueDate: params.dueDate,
    location: params.location,
});

module.exports = {
    getUnread,
    add,
};
