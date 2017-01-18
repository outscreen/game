'use strict';

const express = require('express');
var bodyParser = require('body-parser');

const db = require('./db');
const User = require('./user');
const web = require('./web');

const app = express();
app.use(bodyParser.json());

db.ready
    .then(() => {
        // Create root user
        User.updateDbUser({
            username: process.env.rootuser,
            password: process.env.rootpass,
        }).then(() => {
            console.log('ROOT USER created');
        });

        // Register paths
        web.forEach((pathConfig) => {
            pathConfig.handlers.forEach((handlerConfig) => {
                app[handlerConfig.method](`/${pathConfig.path}/${handlerConfig.url}`, (...args) => {
                    return handlerConfig.handler.apply(this, args);
                });
                console.log(`${handlerConfig.method} /${pathConfig.path}/${handlerConfig.url}`);
            });
        });

        // Start server
        // TODO remove hardcoded port
        app.listen(3000, () => {
            console.log('http://127.0.0.1:3000')
        })
    })
    .catch(console.log);
