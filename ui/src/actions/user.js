'use strict';

const loginSuccess = (userInfo) => {
    return {
        type: 'loginSuccess',
        payload: userInfo,
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
};
