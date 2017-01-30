'use strict';

const Index = require('./index');

module.exports = [
    { method: 'GET', path: '/', config: Index.get }
];
