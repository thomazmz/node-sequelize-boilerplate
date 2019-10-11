const router = require("express").Router();
const controller = require("../controllers/userControllers");
const validators = require("../validators/userValidators");

router.get('/:id', controller.findOneById);
router.post('/signin', validators.signIn, controller.signIn);
router.post('/signup', validators.signUp, controller.signUp);

module.exports = router;