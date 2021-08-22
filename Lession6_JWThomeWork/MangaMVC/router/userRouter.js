const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

module.exports = userRouter;