const UserRepository = require('../../domain/user/UserRepository');

console.log("teste",UserRepository);

class UserController {

	list(req, res, next) {
		return UserRepository.findOrderedBy("email", req.query.page)
		.then(result => result ? res.status(200).send(result) : new RequestError(404).throw())
		.catch(err => next(err));
	}

	findOneById(req, res, next) {
		return UserRepository.findOneById(req.params.id)
		.then(user => user ? res.status(200).send(user) : new RequestError(404).throw())
		.catch(err => next(err));
	}

}

module.exports = new UserController();