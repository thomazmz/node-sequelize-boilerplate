const { header, validationResult } = require('express-validator');
const { User } = require('../../domain/models');
const RequestError = require('../utils/error/RequestError');

module.exports = {

    authenticate : [
        header('authorization').not().isEmpty().withMessage('You must specify a token.'),
        (req, res, next) => {
            const result = validationResult(req).formatWith(({ location, msg, param }) => {
                return { message: msg, parameter: param, location: location }
            });

            if (!result.isEmpty()) {
                new RequestError(422, { errors: result.array({ onlyFirstError: true }) }).throw();
            } else {
                const token = req.headers.authorization.split(' ')[1];
                User.verifyToken(token)
                .then(user => user ? embedUserAndProceed(user, req, next) : new RequestError(401).throw())
                .catch(err => next(new RequestError(401)));
            }
        }
    ]
};
    
function embedUserAndProceed(user, req, next) {
    req.user = user;
    next();
}