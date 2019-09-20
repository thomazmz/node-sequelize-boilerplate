const app = require('./app');

app.express.listen(3030, () => {
    console.log('Successfully listening on port 3030');
    app.authenticate();
});