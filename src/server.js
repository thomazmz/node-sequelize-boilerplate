const app = require('./app/App');

app.listen(3030, () => {
    app.authenticate();
});