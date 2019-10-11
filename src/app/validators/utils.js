const { validationResult } = require('express-validator');
const RequestError = require('../errors/RequestError');

module.exports = {

    validateResult: (req, res, next) => {

        const result = validationResult(req).formatWith(({ location, msg, param }) => {
            return { message: msg, parameter: param, location: location }
        });

        !result.isEmpty() ?  new RequestError(422, { errors: result.array() }).throw() : next();
        
    }
}