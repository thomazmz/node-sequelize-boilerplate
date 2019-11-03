const application = require('./application/Application');

application.listen(3030, () => {
	application.checkDatabaseConnection();
});