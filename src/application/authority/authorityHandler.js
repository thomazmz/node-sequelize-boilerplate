module.exports = {

	has: (authority) => {
		return (req, res, next) => {
			console.log('User must have authority to ', authority.name);
			next();
		}
	}
}