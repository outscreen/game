'use strict';

const log = (...args) => {
    console.log(args);
};

log.error = (...args) => {
    console.error(args);
};

module.exports = log;