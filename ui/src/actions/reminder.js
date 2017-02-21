'use strict';

const reminderSuccess = (reminder) => {
    return {
        type: 'reminderSuccess',
        payload: { reminder },
    };
};

module.exports = {
    reminderSuccess,
};
