'use strict'

exports.get = {
    handler: function (request, reply) {

        reply.view('index', { isAuthenticated: request.isAuthenticated });
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
