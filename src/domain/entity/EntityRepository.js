class EntityRepository {

	constructor(model) {
		this._model = model;
	}

	build(parameters) {
		return this._model.build(parameters);
	}

	create(parameters) {
		return this._model.create(parameters);
	}
}

module.exports = EntityRepository;