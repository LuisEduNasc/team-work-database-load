const knex = require('knex');
require("dotenv").config();

const config = {
    client: 'mysql',
    connection: {
        host: process.env.localServer,
        user: process.env.localUser,
        password: process.env.localPassword,
        database: process.env.localDatabase,
        connectionTimeout: 3600000,
        requestTimeout: 3600000,
    },
    pool: {
        idleTimeoutMillis: 3600000,
        min: 2,
        max: 10
    }
}

const connection = knex(config);

module.exports = connection;