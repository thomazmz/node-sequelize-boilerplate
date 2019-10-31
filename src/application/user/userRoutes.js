const router = require('express').Router();
const controller = require('./UserController');

router.get('/', controller.list);
router.get('/:id', controller.findOneById);

module.exports = router;