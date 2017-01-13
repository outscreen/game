'use strict';

const db = require('./db');
const User = require('./user');

db.ready
    .then(() => {
        // Create root user
        User.createRoot({
            username: process.env.rootuser,
            password: process.env.rootpass,
        }).then(() => {
            console.log('ROOT USER created');
        });
    })
    .catch(console.log);
