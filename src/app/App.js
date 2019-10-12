const express = require('express');
const models = require('./models');
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const RequestError = require("./errors/RequestError");

class App {
    constructor() {
        this.sequelize = models.sequelize;
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use('/', routes);
        this.express.use(errorHandlerMiddleware);
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();

function errorHandlerMiddleware(err, req, res, next) {
    if (err instanceof RequestError)  {
        res.status(err.status).send(err.asJson());
    } else {
        if (err instanceof Error) { 
            console.error(err.stack); 
        } else {
            console.log(err);
        }
        res.status(500).send('Internal Server Error');
    }
}

// function authenticationHandlerMiddlewre(err, req, res, next) {

//     // Check if there is a token 

//     // If there is a token, auehn
//     next();
// }