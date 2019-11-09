const router = require('express').Router();
const controller = require('./authenticationController');

router.post('/signup', 
	controller.signUp);

router.post('/signin', 
	controller.signIn);

router.post('/signup/:payload', 
	controller.validateSignUp);

router.post('/reset',
	controller.resetPassword)

router.post('/reset/:payload',
	controller.resetPassword)

module.exports = router;