'use strict';

const routeChange = (destination) => {
    return {
        type: 'routeChange',
        payload: {
            route: destination
        },
    };
};

const stateLoadSuccess = (state) => {
    return {
        type: 'stateLoadSuccess',
        payload: state,
    };
};

const stateLoadFailure = () => {
    return {
        type: 'stateLoadFailure',
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
    stateLoadSuccess,
    stateLoadFailure,
};
