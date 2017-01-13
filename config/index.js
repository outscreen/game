'use strict';

const roles = require('./roles');

const config = {
    db: {
        // TODO remove hardcode
        connectionUri: 'mongodb://uttcvifeomspiap:gUyBLbw1rZiaHRVDjaU6@bstf7r0betva4zy-mongodb.services.clever-cloud.com:27017/bstf7r0betva4zy',
        usersTable: 'users',
    },
    roles,
};

module.exports = config;