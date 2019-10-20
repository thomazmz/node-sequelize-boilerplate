const router = require('express').Router();
const controller = require('../controllers/userController');
const validators = require('../validators/userValidators');

router.get('/:id', validators.findById, controller.findOneById);
router.get('/:id/tasks', validators.findTasks, controller.findTasks);
router.get('/:id/tasks/:taskId', validators.findTask, controller.findTask);

module.exports = router;