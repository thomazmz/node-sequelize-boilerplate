module.exports = {

	has: (authorization) => {
		return (req, res, next) => {
			console.log(authorization.name);
			next();
		}
	}
}