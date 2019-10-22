const { validationResult } = require('express-validator');
const RequestError = require('./error/RequestError');

module.exports = {

    validateResult: (req, res, next) => {

        const result = validationResult(req).formatWith(({ location, msg, param }) => {
            return { message: msg, parameter: param, location: location }
        });

        if (!result.isEmpty()) {
            new RequestError(422, { errors: result.array({ onlyFirstError: true }) }).throw();
        } else {
            next()
        }
    }
}