const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const routes = require('./routes');
const errorHandler = require('./handlers/errorHandler');

class App {
    constructor() {
        this.sequelize = models.sequelize;
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use('/', routes);
        this.express.use(errorHandler);
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();