const mangaRouter = require('./mangaRouter');

const userRouter = require('./userRouter');

const middlewareVerify = require('../middlewares/verifyUser');

const router = (app) => {
    app.use('/', userRouter);
    app.use('/mangas',middlewareVerify, mangaRouter);
};

module.exports = router;