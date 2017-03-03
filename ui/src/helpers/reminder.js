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

const getBy = (params) => {
    let query = '?';
    Object.keys(params).forEach((key) => query += `${key}=${params[key]}&`)
    return fetch(`/reminder/${query}`, {
        method: 'GET',
    });
};

module.exports = {
    add,
    update,
    getBy,
};
