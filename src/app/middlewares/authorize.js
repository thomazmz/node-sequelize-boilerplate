const jwt = require('jsonwebtoken');

module.exports = (permision) => {
	return function(req, res, next) {
    try {
			const token = req.headers.authorization.split(' ')[1];
			const decodedToken = jwt.verify(token, 'secret');
			const userId = decodedToken.userId;
			next();
		} catch {
			res.status(500).json({
				error: "ERRO"
			});
		}
	}
}