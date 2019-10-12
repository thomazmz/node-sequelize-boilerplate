const { check } = require('express-validator');
const utils = require('./utils');

module.exports = {

    signUp : [
        check('email')
            .not().isEmpty().withMessage('You must specify a email.')
            .isEmail().withMessage('Invalid email address.'),
        check('password')
            .not().isEmpty().withMessage('You must specify a password.')
            .isLength({ min: 5 }).withMessage('Password must be at least 5 characters in length.'),
        utils.validateResult
    ],

    signIn : [
        check('identifier')
            .not().isEmpty().withMessage('You must provide a identifier.'),
        check('password')
            .not().isEmpty().withMessage('You must provide a password.'),
        utils.validateResult
    ]

};