module.exports = {

	has: (authorization) => {
		return (req, res, next) => {
			console.log('User must have authority to ',authorization.name);
			next();
		}
	}
}