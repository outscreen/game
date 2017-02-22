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

module.exports = {
    add,
    update,
};
