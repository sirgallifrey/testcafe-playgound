'use strict';

const Joi = require('joi');
const JoiHelpers = require('../utils/joiHelper');
const UUID = require('uuid');

exports.get = {
    handler: function (request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect(`/profile/${request.auth.credentials._id}`);
        }
        return reply.view('register');
    },
    auth: {
        mode: 'try'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    }
};

exports.post = {
    handler: function (request, reply) {

        const users = this.db.users.find({ username: request.payload.username });

        if (users.length > 0 ) {

            return reply.view('register', { errors: { username: { message: 'E-mail already in use' } } });    
        }

        const sid = UUID.v4();

        const newUser = this.db.users.insertOne({
            name: request.payload.name,
            email: request.payload.username,
            password: request.payload.password,
            sid
        });

        request.cookieAuth.set({ sid });
        return reply.redirect(`/profile/${newUser._id}`);
    },
    validate: {
        payload: Joi.object().keys({
            name: Joi.string().alfanumeric().min(4).max(32),
            username: Joi.string().email(),
            password: Joi.string().min(6).max(40)
        }),
        failAction: function (request, reply, source, error) {

            reply.view('login', { errors: JoiHelpers.joiDetailsToObject(error.data.details) });
        }
    },
    auth: false
};
