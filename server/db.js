'use strict';

const MemoryDB = require('./memoryDB/memoryDB');

const internals = {};

internals.db = new MemoryDB();

internals.db.addCollection('users');

internals.db.users.insertOne({

    name: 'Administrator',
    email: 'admin@admin.com',
    password: '123123'
});

module.exports = internals.db;
