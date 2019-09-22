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
        .then(() => console.log('Postgres connection has been established.'))
        .catch(err => console.error('Unable to connect to Postgres.', err));
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();