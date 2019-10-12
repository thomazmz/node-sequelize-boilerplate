const router = require("express").Router();

router.use('/user', require('./userRoutes'));
router.use('/task', require('./taskRoutes'));

router.use((res, req, next) => { 
    RequestError(404).throw();
});

module.exports = router;