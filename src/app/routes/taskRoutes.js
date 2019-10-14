const router = require('express').Router();
const controller = require('../controllers/taskController');
const { authenticate } = require('../handlers/authenticationHandler');

router.get('/:id', authenticate, controller.findOneById);
router.get('/', authenticate, controller.findAll);
router.post('/', authenticate, controller.create);
router.patch('/', authenticate, controller.update);
router.delete('/', authenticate, controller.delete);

module.exports = router;