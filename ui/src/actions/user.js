'use strict';

const loginSuccess = (userInfo) => {
    return {
        type: 'loginSuccess',
        payload: {
            route: destination
        },
    };
};

module.exports = {
    loginSuccess,
};
