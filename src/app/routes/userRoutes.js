const router = require("express").Router();
const controller = require("../controllers/userController");
const validators = require("./validators/userValidator");

router.get('/:id', controller.findOneById);
router.post('/signin', controller.signIn);
router.post('/signup', controller.signUp);

module.exports = router;