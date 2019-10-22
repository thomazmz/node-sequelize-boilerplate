const express = require('express');

const bodyParser = require('body-parser');
const errorMiddleware = require('./error/errorMiddlewares');

class App {
    constructor() {
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use('/authentication', require('./authentication/authenticationRoutes'));
        this.express.use(errorMiddleware);
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();