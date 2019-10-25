const router = require('express').Router();
const controller = require('../controllers/userController');
const validators = require('../validators/userValidators');

router.get('/:id', validators.findById, controller.findOneById);

module.exports = router;