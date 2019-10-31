const router = require('express').Router();
const controller = require('./userController');

router.get('/', controller.list);
router.get('/:id', controller.findOneById);
router.post('/', controller.build);

module.exports = router;