class EntityRepository {

	constructor(model) {
		this._model = model;
	}

	build(parameters) {
		return this._model.build(parameters);
	}
}

module.exports = EntityRepository;