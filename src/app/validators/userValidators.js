const { check } = require('express-validator');
const { validateResult } = require('./utils');

module.exports = {

    findById : [
        check('id')
            .not().isEmpty().withMessage('You must specify a user id.')
            .isNumeric().withMessage('User id must be a number.'),
        validateResult
    ],

    findTasks : [
        check('id')
            .not().isEmpty().withMessage('You must specify a user id.')
            .isNumeric().withMessage('User id must be a number.'),
        validateResult
    ],

    findTask : [
        check('id')
            .not().isEmpty().withMessage('You must specify a user id.')
            .isNumeric().withMessage('User id must be a number.'),
        check('taskId')
            .not().isEmpty().withMessage('You must specify a task id.')
            .isNumeric().withMessage('Task id must be a number.'),
    ],

    signUp : [
        check('email')
            .not().isEmpty().withMessage('You must specify a email.')
            .isEmail().withMessage('Invalid email address.'),
        check('username')
            .not().isEmpty().withMessage('You must specify a username.'),
        check('password')
            .not().isEmpty().withMessage('You must specify a password.')
            .isLength({ min: 5 }).withMessage('Password must be at least 5 characters in length.'),
        validateResult
    ],

    signIn : [
        check('identifier')
            .not().isEmpty().withMessage('You must provide a identifier.'),
        check('password')
            .not().isEmpty().withMessage('You must provide a password.'),
        validateResult
    ]

};