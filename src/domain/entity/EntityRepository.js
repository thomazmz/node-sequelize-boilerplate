class EntityRepository {

	constructor(model) {
		this._model = model;
	}

	findOrderedBy(attribute="id", offset, limit=100) {
		return this._model.findAndCountAll({
			order: [[attribute, 'ASC']],
			limit: limit,
			offset: offset
		 });
	}

	findAll() {
		return this._model.findAll();
	}

	findOneById(id) {
		return this._model.findOne({
			where: { id }
		});
	}


	build(parameters) {
		return this._model.build(parameters);
	}

	create(parameters) {
		return this._model.create(parameters);
	}
}

module.exports = EntityRepository;