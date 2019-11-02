const router = require('express').Router();
const controller = require('./authorizationController');
const authorization = require('../../domain/authorization/Authorization');
const { has } = require('./authorizationHandler');

router.get('users/:id',
	has(authorization.to.READ_USERS_ROLES),
	controller.findUserAuthority);

router.get('/roles',
	has(authorization.to.READ_ROLES),
	controller.listRoles);

router.get('/roles/:id',
	has(authorization.to.READ_ROLES),
	controller.getRoleById);

router.post('/roles',
	has(authorization.to.CREATE_ROLES),
	controller.createRole);

router.patch('/roles',
	has(authorization.to.UPDATE_USERS_ROLES),
	controller.updateRole);

module.exports = router;