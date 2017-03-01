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

const reminderSelected = (reminder) => {
    return {
        type: 'reminderSelected',
        payload: { reminder },
    };
};

const reminderRead = (reminder) => {
    return {
        type: 'reminderRead',
        payload: { reminder },
    };
};

module.exports = {
    reminderSuccess,
    locationChanged,
    reminderSelected,
    reminderRead,
};
