'use strict';

const Joi = require('joi');

exports.get = {
    handler: function (request, reply) {

        if (request.params.id !== request.auth.credentials._id) {
            return reply.redirect(`/profile/${request.auth.credentials._id}`);
        }

        return reply.view('profile');
    },
    validate: {
        params: Joi.object().keys({
            id: Joi.string().max(26)
        })
    }
};
