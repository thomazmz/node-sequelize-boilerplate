
const express = require('express');
const models = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');

class App {
    constructor() {
        this.sequelize = models.sequelize;
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use('/', routes);
    }

    authenticate() {
        this.sequelize.authenticate()
        .then(() => {
            this.sequelize.sync({force: true});
            console.log('Postgres connection has been established.');
        })
        .catch(err => console.error('Unable to connect to Postgres.', err));
    }
}

module.exports = new App();