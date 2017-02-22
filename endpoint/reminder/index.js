'use strict';

const reminder = require('../../reminder');

//TODO set required params
const add = (req, res) => {
    reminder.add({
        userUuid: req.session.userUuid,
        dueDate: req.body.dueDate,
        location: req.body.location,
        description: req.body.description,
    }).then((reminderData) => {
        res.status(200).send({success: true, reminder: reminderData.ops[0]});
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

module.exports = [
    {
        url: '',
        method: 'post',
        handler: add,
    },
    {
        url: '',
        method: 'put',
        handler: update,
    },
];

