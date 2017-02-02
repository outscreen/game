'use strict';

const React = require('react');
const render = require('react-dom').render;

const Provider = require('react-redux').Provider;
const createStore = require('./store');
const Index = require('./components/index');

const storeName = 'store';

const initialState = JSON.parse(localStorage.getItem(storeName)) || {};
const store = createStore(initialState);
store.subscribe(() => {
    localStorage.setItem(storeName, JSON.stringify(store.getState()));
});

render((
    <Provider store={store}>
        <Index/>
    </Provider>
), document.getElementById('app'));
