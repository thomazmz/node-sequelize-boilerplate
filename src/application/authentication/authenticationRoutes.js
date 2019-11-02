const router = require('express').Router();
const controller = require('./authenticationController');

router.post('/signup', 
	controller.signUp);

router.post('/signin', 
	controller.signIn);

router.post('/signup/:payload', 
	controller.validate);

module.exports = router;