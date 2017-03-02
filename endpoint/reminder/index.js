'use strict';

const reminder = require('../../models/reminder');
const requestValidation = require('../../core/validate/request');


//TODO set required params
const add = (req, res) => {
    reminder.add({
        userUuid: req.session.userUuid,
        dueDate: req.body.dueDate,
        url: req.body.url,
        location: req.body.location,
        description: req.body.description,
    }).then((reminderData) => {
        res.status(200).send(reminderData.ops[0]);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
    })
};

const update = (req, res) => {
    reminder.getOne({ _id: req.body._id })
        .then((reminderData) => {
            if (reminderData.userUuid !== req.session.userUuid) {
                return Promise.reject({status: 401, text: 'Unauthorized'});
            }
        })
        .then(() => reminder.update(req.body))
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            console.error(err);
            if (err.status && err.text) return res.status(err.status).send(err.text);
            return res.status(500).send('Please try again later');
        })
};

const get = (req, res) => {
    const params = {
        userUuid: req.session.userUuid,
    };
    req.query.status && (params.status = req.query.status);
    req.params.id && (params._id = req.params.id);
    reminder.get(params)
        .then((reminders) => res.status(200).send(reminders))
        .catch((err) => {
            console.error(err);
            return res.status(500).send('Please try again later');
        });
};

module.exports = [
    {
        url: '',
        method: 'post',
        handler: add,
        rules: [
            requestValidation.loggedIn(),
            requestValidation.fieldsValid(['dueDate', 'url', 'description']),
        ],
    },
    {
        url: '',
        method: 'put',
        handler: update,
        rules: [
            requestValidation.loggedIn(),
            requestValidation.fieldsValid(['dueDate', 'url', 'description']),
        ],
    },
    {
        url: ':id?',
        method: 'get',
        handler: get,
        rules: [
            requestValidation.loggedIn(),
            requestValidation.fieldsValid(['dueDate', 'url', 'description']),
        ],
    },
];

