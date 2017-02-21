'use strict';

const validate = require('validate.js');
const validationRules = require('./fields');

const loggedIn = () => (req) => {
    if (req.session.userUuid) return;
    return { status: 401, error: 'User must be logged in' }
};

const hasFields = (fields) => (req) => {
    let error = null;
    fields.some((key) => {
        error = validate({[key]: req.body[key]}, validationRules);
        return error;
    });
    if (!error) return;
    return { status: 400, error, };
};

module.exports = {
    loggedIn,
    hasFields,
};