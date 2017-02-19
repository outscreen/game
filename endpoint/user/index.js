'use strict';

const User = require('../../user');
const reminder = require('../../reminder');

//TODO set required params
const login = (req, res) => {
    const response = {};

    User.getDbUser({
        username: req.body.username,
        password: req.body.password,
    }).catch((err) => {
        console.error(err);
        return Promise.reject({ status: 401, text: 'Invalid username or password' });
    }).then((userInfo) => {
        req.session.userUuid = userInfo.uuid;
        response.username = userInfo.username;
        return reminder.getUnread(userInfo.uuid)
            .catch(() => Promise.resolve(null));
    }).then((reminders) => {
        response.reminders = reminders;
        response.success = true;
        res.status(200).send(response);
    }).catch((err) => {
        res.status(err.status).send(err.text);
    });
};

const create = (req, res) => {
    const response = {};

    User.createDbUser({
        username: req.body.username,
        password: req.body.password,
    }).then((userInfo) => {
        req.session.userUuid = userInfo.uuid;
        response.username = userInfo.username;
        response.reminders = [];
        response.success = true;
        res.status(200).send(response);
    }).catch((err) => {
        res.status(400).send(err);
    });
};

const logout = (req, res) => {
    delete req.session.userUuid;
    res.status(200).send({success: true});
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

