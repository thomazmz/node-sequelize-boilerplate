const app = require('./application/Application')

app.listen(3030, () => {
    app.authenticate();
});