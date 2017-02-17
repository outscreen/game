'use strict';

const isoFetch = require('isomorphic-fetch');

// TODO change path
// TODO replace fetch with module
const fetch = (url, params) => isoFetch(`http://127.0.0.1:1717${url}`, {
    method: params.method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params.body),
})
    .then((res) => {
        if (!res.ok) return res.text().then((data) => Promise.reject(data));
        return res.json();
    });

const login = (params) => fetch('/user/login', {
    method: 'POST',
    body: JSON.stringify(params),
})
    .then((userData) => {
        console.log(88, userData)
    })
    .catch((err) => ({
        error: err,
    }));

const logout = () => fetch({});

const create = (params) => fetch('/user/create', {
    method: 'POST',
    body: JSON.stringify(params),
})
    .then((userData) => {
        console.log(88, userData)
    })
    .catch((err) => ({
        error: err,
    }));

module.exports = {
    login,
    logout,
    create,
};
