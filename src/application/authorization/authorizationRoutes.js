const router = require('express').Router();
const authorizationController = require('./authorizationController');

router.get('users/:id', authorizationController.findUserAuthority);
router.get('/roles', authorizationController.listRoles);
router.get('/roles/:id', authorizationController.getRoleById);
router.post('/roles', authorizationController.createRole);
router.patch('/roles', authorizationController.updateRole);


module.exports = router;