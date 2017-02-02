'use strict';

if (([
        process.env.sessionsecret,
        process.env.rootuser,
        process.env.rootpass,
        process.env.crypto,
    ]).indexOf(undefined) !== -1) {
    console.error('Provide all creds');
    process.exit(1);
}

const express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require('./db');
const User = require('./user');
const endpoints = require('./endpoint');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

db.ready
    .then(() => {
        // Session
        app.use(session({
            secret: process.env.sessionsecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 4 * 60 * 60 * 1000, // 4 hours
            },
            store: new MongoStore({
                db: db.db,
                collection: config.db.sessionsTable,
                stringify: true,
                touchAfter: 60 * 60, // 1 hour (seconds)
            })
        }));

        // Create root user
        User.updateDbUser({
            username: process.env.rootuser,
            password: process.env.rootpass,
        }).then(() => {
            console.log('ROOT USER created');
        });

        // Register paths
        endpoints.forEach((pathConfig) => {
            pathConfig.handlers.forEach((handlerConfig) => {
                app[handlerConfig.method](`/${pathConfig.path}/${handlerConfig.url}`, (req, res, next) => {
                    return handlerConfig.handler.call(this, req, res, next);
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
