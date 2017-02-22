'use strict';

const reminderSuccess = (reminder) => {
    return {
        type: 'reminderSuccess',
        payload: { reminder },
    };
};

const locationChanged = (location) => {
    return {
        type: 'locationChanged',
        payload: { location },
    };
};

module.exports = {
    reminderSuccess,
    locationChanged,
};
