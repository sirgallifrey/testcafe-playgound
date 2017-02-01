'use strict';

const Joi = require('joi');
const JoiHelpers = require('../utils/joiHelper');
const UUID = require('uuid');

exports.get = {
    handler: function (request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect(`/profile/${request.auth.credentials._id}`);
        }
        return reply.view('login');
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

        this.db.users.findOne({ email: request.payload.username }, (err, user) => {

            if (err) {
                throw err;
            }
            if (!user || user && user.password !== request.payload.password) {

                return reply.view('login', { message: 'Could not find match with this email and password'});    
            }
            const sid = UUID.v4();
            this.db.users.update({ _id: user._id }, { $set: { sid } }, (err, upUser) => {

                if (err) {
                    throw err;
                }
                request.cookieAuth.set({ sid });
                return reply.redirect(`/profile/${user._id}`);
            });
        });
    },
    validate: {
        payload: Joi.object().keys({
            username: Joi.string().email(),
            password: Joi.string().min(6).max(40)
        }),
        failAction: function (request, reply, source, error) {

            reply.view('login', { errors: JoiHelpers.joiDetailsToObject(error.data.details) });
        }
    },
    auth: false
};
