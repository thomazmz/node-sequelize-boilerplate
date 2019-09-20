const router = require("express").Router();
const controller = require("../controllers/userController");

router.post('/', controller.create);
router.get('/', controller.findOneById);

module.exports = router;