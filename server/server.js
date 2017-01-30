'use strict';

const Hapi = require('hapi');
const DB = require('./db');
const Vision = require('vision');
const Pug = require('pug');
const Routes = require('./routes/routes');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

server.bind({
    db: DB
});

server.register([Vision], (err) => {

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

    server.route(Routes);

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('connect to ', server.info.uri);
    });
});


module.export = server;
