var HttpStatus = require('http-status-codes');

class ApplicationError {

	constructor(properties) {
		this.status = properties ? properties.status : null;
		this.content = properties ? properties.content : null;
	}
  
	static send(response, error) {
		if (error instanceof ApplicationError && error.status != null) {
			response.status(error.status).send(HttpStatus.getStatusText(error.status));
		} else {
			response.status(500).send("Internal Server Error");
		}
	}
  
	throw() {
		throw this;
	}

}

module.exports = ApplicationError;