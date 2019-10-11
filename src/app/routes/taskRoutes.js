const router = require('express').Router();
const controller = require('../controllers/blogPostController');
const authorize = require('../middlewares/authorize')

router.get('/:id', controller.findOneById);
router.post('/', controller.create);
router.patch('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;