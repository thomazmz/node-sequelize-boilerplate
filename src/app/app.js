const express = require('express');
const models = require('./models');

class App {
    constructor() {
        this.express = express();
        this.express.use(express.json);
        this.express.use(require("./routes"));
        this.sequelize = models.sequelize;
    }

    authenticate() {
        this.sequelize.authenticate()
        .then(() => console.log('Postgres connection has been established.'))
        .catch(err => console.error('Unable to connect to Postgres.', err));
    }
}

module.exports = new App();
