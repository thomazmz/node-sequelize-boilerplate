class Authentication {

	getPermisionStrings = function(user) {

		Permision.findAll()
		.then(permisions => {
			if (permisions) return res.status(200).send(permisions.map(permision => permision.name))
			return new RequestError(404).throw();
		})
		.catch(err => next(err));
	}

}