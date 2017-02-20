'use strict';

const reminder = require('../../reminder');

//TODO set required params
const add = (req, res) => {
    reminder.add({
        userUuid: req.session.userUuid,
        dueDate: req.body.dueDate,
        location: req.body.location,
    }).then((reminderData) => {
        res.status(200).send({success: true, reminder: reminderData.ops[0]});
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
    })

};

module.exports = [
    {
        url: '',
        method: 'post',
        handler: add,
    },
];

