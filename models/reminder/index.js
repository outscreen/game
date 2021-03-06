'use strict';

const db = require('../../core/db');
const config = require('../../config');

const add = (params) => db.create(config.db.remindersTable, {
    status: config.status.unread,
    userUuid: params.userUuid,
    dueDate: params.dueDate,
    location: params.location,
    description: params.description,
    url: params.url,
});

const get = (params) => db.get(config.db.remindersTable, params);

const getOne = (params) => db.getOne(config.db.remindersTable, params);

const update = (params) => {
    const update = {};

    params.status && (update.status = params.status);
    params.dueDate && (update.dueDate = params.dueDate);
    params.location && (update.location = params.location);
    params.description && (update.description = params.description);
    params.url && (update.url = params.url);

    return db.update(config.db.remindersTable, { _id: params._id }, {$set: update})
        .then((res) => Object.assign(res.value, update));
};

module.exports = {
    add,
    get,
    getOne,
    update,
};
