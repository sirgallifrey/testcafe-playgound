'use strict';

const Index = require('./index');
const Login = require('./login');
const Profile = require('./profile');

module.exports = [
    { method: 'GET', path: '/', config: Index.get },
    { method: 'GET', path: '/login', config: Login.get },
    { method: 'POST', path: '/login', config: Login.post },
    { method: 'GET', path: '/profile/{id}', config: Profile.get }
];
