const userRepository = require('../../domain/user/UserRepository');

module.exports = {

	list(req, res, next) {
		return userRepository.findOrderedBy("email", req.query.page)
		.then(result => result ? res.status(200).send(result) : new RequestError(404).throw())
		.catch(err => next(err));
	},

	findOneById(req, res, next) {
		return userRepository.findOneById(req.params.id)
		.then(user => user ? res.status(200).send(user) : new RequestError(404).throw())
		.catch(err => next(err));
	},

	 create(req, res, next) {
		const userParams = { username, email, password }
		return userRepository.create(userParams)
		.then(user => user ? res.status(200).send(user) : new RequestError(404).throw())
		.catch(err => next(err));
	 }

}