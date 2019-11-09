const router = require('express').Router();
const controller = require('./authorityController');
const Authority = require('../../domain/authority/Authority');
const { has } = require('./authorityHandler');

router.get('users/:id',
	has(Authority.to.READ_USERS_ROLES),
	controller.findUserAuthority);

router.get('/roles',
	has(Authority.to.READ_ROLES),
	controller.listRoles);

router.get('/roles/:id',
	has(Authority.to.READ_ROLES),
	controller.getRoleById);

router.post('/roles',
	has(Authority.to.CREATE_ROLES),
	controller.createRole);

router.patch('/roles',
	has(Authority.to.UPDATE_USERS_ROLES),
	controller.updateRole);

module.exports = router;