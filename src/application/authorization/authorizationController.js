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

	findOneById: (req, res, next) => {
		Role.findOne({ 
			where: { id: req.params.id },
			include: { model: Permision, as: 'permisions', attributes: ["id", "name"], through: { attributes: [] }},
			attributes: ["id", "name"]
		})
		.then(role => role ? res.status(200).send(role) : new RequestError(404).throw())
		.catch(err => next(err));
	},

	createRole: async (req, res, next) => {

		const permisions = await Permision.findByNames(req.body.permisions);
		if(permisions.length !== req.body.permisions.length) {
			return next(new RequestError(422, { message: 'Invalid permisions' }));
		}

		const role = await Role.findOne({ where: { name: req.body.name } })
		if(role) {
			return next(new RequestError(422, { message: 'Role already exists' }));
		}

		return sequelize.transaction(async transaction => {
				const newRole = await Role.create({ name: req.body.name })
				await newRole.setPermisions(permisions);
				return newRole;
		})
		.then(newRole => res.status(201).send(newRole))
		.catch(err => next(err));
	}
}