'use strict';

module.exports = class Collection {

    constructor() {

        this.data = {};
        this.nextId = 0;
    }

    findById(id) {

        const doc = this.data[id];
        if (doc) {
            return doc;
        }
        return null;
    }

    find() {

        const result = Object.keys(this.data).map((id) => {

            return this.data[id];
        });
        return result;
    }

    insertOne(doc) {

        const newDoc = Object.assign({}, doc);
        newDoc._id = this.nextId;
        this.data[this.nextId] = newDoc;
        this.nextId ++;
        return newDoc;
    }

    updateOne(id, payload) {

        const doc = this.data[id];
        if (doc) {
            const newDoc = Object.assign({}, doc, payload);
            this.data[id] = newDoc;
            return newDoc;
        }
        return null;
    }
};