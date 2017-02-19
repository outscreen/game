'use strict';

const fetch = require('./fetch');

const add = (params) => fetch('/reminder', {
    method: 'POST',
    body: params,
});

