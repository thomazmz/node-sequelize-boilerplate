const router = require("express").Router();
const controller = require("../controllers/userController");

router.post('/', controller.create);
router.get('/:id', controller.findOneById);
router.post('/signin', controller.signIn);
router.post('/signup', controller.signUp);

module.exports = router;