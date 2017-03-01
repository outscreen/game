'use strict';

const User = require('../../models/user');
const reminder = require('../../models/reminder');
const requestValidation = require('../../core/validate/request');

//TODO set required params
const login = (req, res) => User.getDbUser({
    username: req.body.username,
    password: req.body.password,
}).then((userInfo) => {
    req.session.userUuid = userInfo.uuid;
    req.session.username = userInfo.username;
    res.status(200).send({username: userInfo.username});
}).catch((err) => {
    console.error(err);
    res.status(401).send('Invalid username or password');
});

const create = (req, res) => User.createDbUser({
    username: req.body.username,
    password: req.body.password,
}).then((userInfo) => {
    req.session.userUuid = userInfo.uuid;
    res.status(200).send({username: userInfo.username});
}).catch((err) => {
    res.status(400).send(err);
});

const logout = (req, res) => {
    delete req.session.userUuid;
    delete req.session.username;
    res.status(200).send({success: true});
};

const state = (req, res) => {
    res.status(200).send({username: req.session.username});
};

module.exports = [
    {
        url: 'login',
        method: 'post',
        handler: login,
        // do not validate fields to allow old users log in if validation rules change
        rules: [requestValidation.fieldsPresent(['username', 'password'])],
    },
    {
        url: '',
        method: 'post',
        handler: create,
        rules: [requestValidation.fieldsValid(['username', 'password'])],
    },
    {
        url: 'logout',
        method: 'get',
        handler: logout,
    },
    {
        url: '',
        method: 'get',
        handler: state,
        rules: [requestValidation.loggedIn()],
    },
];

