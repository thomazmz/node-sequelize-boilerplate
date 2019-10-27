const RequestError = require('../error/RequestError');
const { sequelize, Role, Permision } = require('../../domain');

module.exports = {

	findPermisions: (req, res, next) => {
		Permision.findAll()
		.then(permisions => {
		if (permisions) return res.status(200).send(permisions.map(permision => permision.name))
		return new RequestError(404).throw();
		})
		.catch(err => next(err));
	},

	findPermisionsByRole: (req, res, next) => {
		Role.findOne({ where: { id : req.params.id }})
		.then(role => {
			if(role) res.status(200).send(role.permisions.map(permision => permision.name))
			return new RequestError(404).throw();
		})
		.catch(err => next(err));
	},

	createRole: async (req, res, next) => {
		
		const permisions = await Permision.findByNames(req.body.permisions);
		if(permisions.length !== req.body.permisions.length) {
			return next(new RequestError(422, { message : 'Invalid permisions' }));
		}

		const role = await Role.findOne({ where: { name : req.body.name } })
		if(role) {
			return next(new RequestError(422, { message : 'Role already exists' }));
		}
		
		return sequelize.transaction(t => {
			return Role.create({ name : req.body.name })
			.then(role => role.setPermisions(permisions))
		})
		.then(role => res.status(201).send(role))
		.catch(err => next(err));
	}

}