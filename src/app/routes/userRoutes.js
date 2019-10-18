const router = require('express').Router();
const controller = require('../controllers/userController');
const validators = require('../validators/userValidators');

router.get('/:id', validators.findById, controller.findOneById);
router.get('/:id/tasks', controller.findUserTasks);
router.get('/:id/tasks/:taskId', controller.findUserTask);
router.post('/signin', validators.signIn, controller.signIn);
router.post('/signup', validators.signUp, controller.signUp);

module.exports = router;