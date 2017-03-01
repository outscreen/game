'use strict';

const loginSuccess = (userInfo) => {
    return {
        type: 'loginSuccess',
        payload: userInfo,
    };
};

const logoutSuccess = () => {
    return {
        type: 'logoutSuccess',
    };
};

const registerSuccess = (userInfo) => {
    return {
        type: 'registerSuccess',
        payload: userInfo,
    };
};

const userLoadSuccess = (user) => {
    return {
        type: 'userLoadSuccess',
        payload: user,
    };
};

const userLoadFailure = () => {
    return {
        type: 'userLoadFailure',
    };
};

module.exports = {
    loginSuccess,
    registerSuccess,
    logoutSuccess,
    userLoadSuccess,
    userLoadFailure,
};
