'use strict';

const loggedIn = (req) => {
    return req.userUuid ? Promise.resolve() : Promise.reject();
};

module.exports = {
    loggedIn,
};