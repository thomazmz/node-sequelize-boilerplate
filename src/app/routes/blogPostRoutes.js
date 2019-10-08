const router = require('express').Router();
const controller = require('../controllers/blogPostController');
const authorize = require('../middlewares/authorize')

router.get('/:id', controller.findOneById);
router.post('/', authorize('createBlogPost'), controller.create);
router.patch('/', authorize('updateBlogPost'), controller.update);
router.delete('/', authorize('deleteBlogPost'), controller.delete);

module.exports = router;