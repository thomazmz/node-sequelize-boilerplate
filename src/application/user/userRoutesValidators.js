
const { check } = require('express-validator');
const { validateResult } = require('./utils');

module.exports = {

    findById : [
        check('id')
            .not().isEmpty().withMessage('You must specify a user id.')
            .isNumeric().withMessage('User id must be a number.'),
        validateResult
    ]
    
};