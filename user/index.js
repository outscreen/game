'use strict';

const hash = require('../helpers/hash');
const db = require('../db');
const config = require('../config');


class User {
    constructor(params) {
        this.name = params.username;
        this.hash = params.password ? hash(params.password) : params.hash;
        this.email = params.email;
        this.role = params.role;
    }

    static createDbUser(params) {
        // TODO validate params
        return db.getOne(config.db.usersTable, { username: params.username })
            .then((existingUser) => {
                if (existingUser) return Promise.reject(`User ${params.username} already exists`);

                return db.generateUuid(config.db.usersTable).then((uuid) => {
                    params.uuid = uuid;
                    return db.create(config.db.usersTable, params).then(() => new User(params));
                });
            });
    }

    static createRoot(params) {
        params.hash = hash(params.password);
        delete params.password;

        return db.getOne(config.db.usersTable, { username: params.username })
            .then((existingUser) => {
                console.log(existingUser)
                if (existingUser) {
                    return db.update(config.db.usersTable, { username: params.username },
                        { $set: params }).then(() => new User(params));
                }

                return db.generateUuid(config.db.usersTable).then((uuid) => {
                    params.uuid = uuid;
                    return db.create(config.db.usersTable, params).then(() => new User(params));
                });
            });
    }

    static createInstance(params) {
        if (params.create) {
            params.hash = hash(params.password);
            delete params.password;
            delete params.create;
            return User.createDbUser(params);
        }

        // If only user id passed, try getting the user from db
        const searchParams = typeof params === 'string' ? { uuid: params } : params;

        return db.getUser(searchParams).then((user) => {
            if (!user) return Promise.reject('No such user');
            return Promise.resolve(new User(user));
        });
    }
}

module.exports = User;
