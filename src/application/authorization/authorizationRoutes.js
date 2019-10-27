const router = require('express').Router();
const controller = require('./authorizationController');

router.get('/permisions', controller.findPermisions);
router.post('/roles', controller.createRole);

module.exports = router;