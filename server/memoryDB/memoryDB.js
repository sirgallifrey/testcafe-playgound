'use strict';

const Collection = require('./collection');

module.exports = class MemoryDB {

    constructor() {

        this._collections = {};
    }

    addCollection(name) {

        if (!this[name]) {
            this[name] = this._collections[name] =  new Collection();
            return this._collections[name];
        }
        throw new Error('This collection name is already reserved.');
    }

    getCollection(name) {

        return this._collections[name];
    }
};