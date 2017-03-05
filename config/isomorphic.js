'use strict';

const config = {
    locations: {
        home: 'Home',
        office: 'Office',
    },
    defaultLocation: 'home',
    status: {
        read: 'read',
        unread: 'unread',
    },
    serverUrl: 'http://alinaloi.com',
};

config.locationList = Object.keys(config.locations).map((key) => ({id: key, name: config.locations[key]}));

module.exports = config;
