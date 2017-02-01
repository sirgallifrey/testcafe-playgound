'use strict';

const Hapi = require('hapi');
const DB = require('./db');
const Vision = require('vision');
const Inert = require('inert');
const HapiAuthCookie = require('hapi-auth-cookie');
const Pug = require('pug');
const Routes = require('./routes/routes');
const Path = require('path');

const server = new Hapi.Server({
    connections: {
        routes: {
            validate: {
                options: {
                    abortEarly: false
                }
            }
        }
    }
});

server.connection({
    host: 'localhost',
    port: 3000
});

DB.init((err, db) => {

    if (err) {
        throw err;
    }
    server.bind({ db });

    server.register([Vision, Inert, HapiAuthCookie], (err) => {

        if (err) {
            throw err;
        }

        server.views({
            engines: { pug: Pug },
            path: __dirname + '/views',
            compileOptions: {
                pretty: true
            }
        });

        server.auth.strategy('session', 'cookie', true, {
            password: 'password-should-be-32-characters',
            cookie: 'sid',
            redirectTo: '/login',
            isSecure: false,
            validateFunc: function (request, session, callback) {

                db.users.findOne({ sid: session.sid }, (err, user) => {

                    if (err) {
                        return callback(err, null);
                    }
                    else if (!user) {
                        return callback(null, false);
                    }
                    console.log(user);
                    return callback(null, true, user);

                });
            }
        });

        server.ext('onPreResponse', (request, reply) => {

            const response = request.response;
            if (response.variety && response.variety === 'view') {
                response.source.context = response.source.context || {};
                if (request.auth.isAuthenticated) {
                    response.source.context.user = {
                        name: request.auth.credentials.name,
                        email: request.auth.credentials.email
                    };
                }
            }
            return reply.continue();
        });

        server.route(Routes);

        server.route({
            method: 'GET',
            path:'/{params*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, './public')
                }
            }
        });

        server.start((err) => {

            if (err) {
                throw err;
            }

            console.log('connect to ', server.info.uri);
        });
    });

});




module.export = server;
