'use strict';

module.exports = (initialState, reducerMap) => {
    return (state, action) => {
        state || (state = initialState);

        const reducer = reducerMap[action.type];

        return typeof reducer === 'function'
            ? reducer(state, action.payload)
            : state;
    };
};
