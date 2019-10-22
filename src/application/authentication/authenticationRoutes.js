const router = require('express').Router();
const controller = require('./authenticationControllers');
const validators = require('./authenticationRoutesValidators');

router.post('/signin', validators.signIn, controller.signIn);
router.post('/signup', validators.signUp, controller.signUp);

module.exports = router;