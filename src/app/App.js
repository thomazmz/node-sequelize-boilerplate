const express = require('express');
const models = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');

class App {
    constructor() {
        this.sequelize = models.sequelize;
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(morgan('dev'));
        this.express.use('/', routes);
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();