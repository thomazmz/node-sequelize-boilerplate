const router = require("express").Router();
const controller = require("../controllers/blogPostController");

router.get('/:id', controller.findOneById);
router.post('/signin', controller.create);
router.patch('/signup', controller.update);
router.delete('/signup', controller.delete);

module.exports = router;