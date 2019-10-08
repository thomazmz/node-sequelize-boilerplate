const router = require("express").Router();

router.use('/user', require('./userRoutes'));
router.use('/blog/post', require('./blogPostRoutes'));

router.use((res, req, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;