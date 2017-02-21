'use strict';

const routeChange = (destination) => {
    return {
        type: 'routeChange',
        payload: {
            route: destination
        },
    };
};

const stateLoaded = (state) => {
    return {
        type: 'stateLoaded',
        payload: state,
    };
};

const actionFailure = (error) => {
    return {
        type: 'actionFailure',
        payload: { error, },
    };
};

const clear = () => {
    return {
        type: 'clear',
    }
};

module.exports = {
    routeChange,
    actionFailure,
    clear,
    stateLoaded,
};
