
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
    ]
};