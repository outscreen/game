'use strict';

const fetch = require('./fetch');

const login = (params) => fetch('/user/login', {
    method: 'POST',
    body: params,
});

const logout = () => fetch({});

const create = (params) => fetch('/user', {
    method: 'POST',
    body: params,
});

const getData = () => fetch('/user', {
    method: 'GET',
});

module.exports = {
    login,
    logout,
    create,
    getData,
};
