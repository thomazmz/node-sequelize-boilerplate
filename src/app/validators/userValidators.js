const { check } = require('express-validator');
const utils = require('./utils');

module.exports = {

    signUp : [
        check('email')
            .not().isEmpty().withMessage('Email could not be empty.')
            .isEmail().withMessage('Invalid email address.'),
        check('username')
            .not().isEmpty().withMessage('Username could not be empty.')
            .isAlphanumeric().withMessage('Login must be alphanumeric.'),
        check('password')
            .isLength({ min: 5 }).withMessage('Password must be at least 5 characters in length.')
            .matches('\[0-9\]').withMessage('Password must contain at least 1 number.')
            .matches('\[a-z\]').withMessage('Password must contain at least 1 lowercase letter.')
            .matches('\[A-Z\]').withMessage('Password must contain at least 1 uppercase letter.'),
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