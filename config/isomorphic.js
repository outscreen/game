'use strict';

const config = {
    locations: {
        home: 'Home',
        office: 'Office',
    },
    defaultLocation: 'home',
};

config.locationList = Object.keys(config.locations).map((key) => ({id: key, name: config.locations[key]}));

module.exports = config;
