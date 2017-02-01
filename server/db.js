'use strict';

const neDB = require('nedb');

const internals = {};

internals.db = {};

exports.init = (cb) => {

    internals.db.users = new neDB();

    internals.db.users.insert({

        name: 'Administrator',
        email: 'admin@admin.com',
        password: '123123'
    }, (err, doc) => {

        if (err) {
            cb(err, null);
        }
        return cb(null, internals.db);
    });
};
