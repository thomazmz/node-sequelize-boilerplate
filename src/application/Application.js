const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./error/errorMiddlewares');
const models = require('../infrastructure/database');

class App {
    constructor() {
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use('/users', require('./user/userRoutes'));
        this.express.use(errorMiddleware);
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();