'use strict';

const User = require('../../user');

const login = (req, res) => {
    User.getDbUser({
        username: req.body.username,
        password: req.body.password,
    }).then(() => {
        // TODO create session
        res.status(200).send({ success: true });
    }).catch(() => {
        res.status(401).send('Invalid username or password');
    });
};

const create = (req, res) => {
    User.createDbUser({
        username: req.body.username,
        password: req.body.password,
    }).then(() => {
        // TODO create session
        res.status(200).send({ success: true });
    }).catch((err) => {
        res.status(400).send(err);
    });
};

const logout = (req, res) => {
    // UPDATE SESSION
};

module.exports = [
    {
        url: 'login',
        method: 'post',
        handler: login,
    },
    {
        url: 'create',
        method: 'post',
        handler: create,
    },
    {
        url: 'logout',
        method: 'post',
        handler: create,
        auth: ['loggedIn'],
    }
];

