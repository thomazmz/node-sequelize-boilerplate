const router = require('express').Router();
const authenticationController = require('./authenticationController');

router.post('/signup', authenticationController.signUp);
router.post('/signin', authenticationController.signIn);
router.post('/signup/:payload', authenticationController.validate);

module.exports = router;