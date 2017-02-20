'use strict';

const isoFetch = require('isomorphic-fetch');

// TODO change path
const fetch = (url, params) => isoFetch(`http://127.0.0.1:1717${url}`, {
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
