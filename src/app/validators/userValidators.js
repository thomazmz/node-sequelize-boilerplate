const { check, validationResult } = require('express-validator');

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
        (req, res, next) => {
            const errors = validationResult(req)
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            } else {
                next();
            }
        }
    ],

    signIn : [
        check('identifier')
            .not().isEmpty().withMessage('You must provide a identifier.'),
        check('password')
            .not().isEmpty().withMessage('You must provide a password.'),
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
            else next();
        }
    ]

};