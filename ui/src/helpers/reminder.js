'use strict';

const fetch = require('./fetch');

const add = (params) => fetch('/reminder', {
    method: 'POST',
    body: params,
});

const update = (params) => fetch('/reminder', {
    method: 'PUT',
    body: params,
});

const getByStatus = (status) => fetch(`/reminder/?status=${status}`, {
    method: 'GET',
});

module.exports = {
    add,
    update,
    getByStatus,
};
