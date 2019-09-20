const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require('./models');
const app = express(); 

sequelize.authenticate()
.then(() => console.log('Postgres database connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the Postgres database:', err));

// Remove in production
sequelize.sync({force: true});

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use((res, req, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.listen(3030);

module.exports = app;