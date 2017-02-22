'use strict';

module.exports = (array, field) => {
    if (!(array instanceof Array)) return array;

    const result = {};
    array.forEach((value, key) => {
        result[field ? value[field] : key] = value;
    });
    return result;
};
