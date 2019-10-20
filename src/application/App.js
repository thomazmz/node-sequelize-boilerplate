const express = require('express');

const bodyParser = require('body-parser');
const errorHandler = require('./utils/error/errorMiddleware');

class App {
    constructor() {
        this.express = express();
        this.loadMiddlewares();
        this.loadRoutes();
    }

    loadMiddlewares() {
        this.express.use(bodyParser.json());
        this.express.use(errorHandler);
    }

    loadRoutes() {
        this.express.use('/authentication', require('./authenticationRoutes'));
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();