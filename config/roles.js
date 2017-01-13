'use strict';

const roles = {
    default: 'user',
    admin: {
        includes: ['moderator', 'user'],
    },
    moderator: {
        includes: ['user'],
    },
    user: {
        includes: [],
    },
};

module.exports = roles;