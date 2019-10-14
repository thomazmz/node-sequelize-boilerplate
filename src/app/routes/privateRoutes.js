const router = require('express').Router();
const controller = require('../controllers/privateController');
const { authenticate } = require('../handlers/authenticationHandler');

router.get('/', authenticate, controller.private);

module.exports = router;