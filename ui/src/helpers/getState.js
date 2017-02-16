'use strict';

const stateUrl = '/state';

module.exports = () => fetch(stateUrl).catch((err) => {
    console.log(err)
});
