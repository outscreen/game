'use strict';

const React = require('react');
const render = require('react-dom').render;
const Provider = require('react-redux').Provider;

import 'react-widgets/lib/scss/react-widgets.scss';

const Moment = require('moment');
const momentLocalizer = require('react-widgets/lib/localizers/moment');
momentLocalizer(Moment);

const createStore = require('./store');
const Index = require('./components/index');

const storeName = 'store';

const initialState = JSON.parse(localStorage.getItem(storeName)) || {};
const store = createStore(initialState);
window.store = store;

store.subscribe(() => {
    localStorage.setItem(storeName, JSON.stringify(store.getState()));
});

if (chrome.notifications) {
    chrome.notifications.create(Date.now(), {}, () => console.log(arguments))
}

render((
    <Provider store={store}>
        <Index/>
    </Provider>
), document.getElementById('app'));

window.store = store;
