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

module.exports = {
    loginSuccess,
    registerSuccess,
    logoutSuccess,
};
