class EntityRepository {

	constructor(model) {
		this._model = model;
	}

	findAllOrderedBy(attribute="id", offset, limit=100) {
		return User.findAndCountAll({
			order: [[attribute, 'ASC']],
			limit: limit,
			offset: offset
		 });
	}

	findAll() {
		return this._model.findAll();
	}

	build(parameters) {
		return this._model.build(parameters);
	}

	create(parameters) {
		return this._model.create(parameters);
	}
}

module.exports = EntityRepository;