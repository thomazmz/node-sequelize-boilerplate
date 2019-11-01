const app = require('./application/App');

app.listen(3030, () => {
	app.checkDatabaseConnection();
});