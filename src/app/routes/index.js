const router = require("express").Router();
const RequestError = require("../errors/RequestError");

router.use('/user', require('./userRoutes'));
router.use('/task', require('./taskRoutes'));

router.use((res, req, next) => {
    new RequestError(404).throw();
});

module.exports = router;