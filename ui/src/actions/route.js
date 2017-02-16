'use strict';

const goTo = (destination) => {
    return {
        type: 'routeChange',
        payload: {
            route: destination
        },
    };
};

module.exports = {
    goTo,
};
