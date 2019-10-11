var HttpStatus = require('http-status-codes');

class RequestError extends Error {

	constructor(status, properties) {
        super(properties && properties.message ? properties.message : HttpStatus.getStatusText(status));
        this.errors = properties && properties.errors ? properties.errors : undefined;
        this.status = status;
    }
    
    asJson() {
        return {
            requestMethod : this.requestMethod,
            requestUrl: this.requestUrl,
            status : this.status,
            message : this.message,
            errors : this.errors
        }
    }
  
	throw() {
		throw this;
	}

}

module.exports = RequestError;