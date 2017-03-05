'use strict';

const isoFetch = require('isomorphic-fetch');
const config = require('../../config');

const fetch = (url, params) => isoFetch(`${config.serverUrl}${url}`, {
    method: params.method,
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(params.body),
})
    .then((res) => {
        if (res.ok) return res.json();
        return res.text().then((data) => Promise.reject(data));
    });


module.exports = fetch;
