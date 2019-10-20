const router = require('express').Router();
const controller = require('./authenticationController');
const validators = require('./validators');

router.post('/signin', validators.signIn, controller.signIn);
router.post('/signup', validators.signUp, controller.signUp);
router.post('/new', controller.newSignUp);

module.exports = router;