'use strict';

if (([
        process.env.sessionsecret,
        process.env.crypto,
        process.env.db,
    ]).indexOf(undefined) !== -1) {
    console.error('Provide all creds');
    process.exit(1);
}

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require('./core/db');
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

        // Register paths
        endpoints.forEach((pathConfig) => {
            pathConfig.handlers.forEach((handlerConfig) => {
                app[handlerConfig.method](`/${pathConfig.path}/${handlerConfig.url}`, (req, res, next) => {
                    if (handlerConfig.rules) {
                        let fail;
                        handlerConfig.rules.some((rule) => (fail = rule(req)));
                        if (fail) return res.status(fail.status).send(fail.error);
                    }
                    return handlerConfig.handler.call(this, req, res, next);
                });
                console.log(`${handlerConfig.method} /${pathConfig.path}/${handlerConfig.url}`);
            });
        });

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '/public/index.html'));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/public' + req.url));
        });

        // Start server
        const port = process.env.port || 1717;
        app.listen(port, () => {
            console.log(`${config.serverUrl}:${port}`)
        })
    })
    .catch(console.log);
