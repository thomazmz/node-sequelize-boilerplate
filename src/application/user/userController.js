class UserController {
    
    loadRoutes() {
        this.express.use(routes);
    }

    loadMiddlewares() {
        this.express.use(bodyParser.json());
        this.express.use(errorHandler);
    }

    loadInfrastructure() {
        this.sequelize = models.sequelize;
        this.mailer = mailer;
        this.redis = redis; 
    }

    listen(port) {
        this.express.listen(port, () => console.log(`Successfully listening on ${port}`));
    }
}

module.exports = new App();