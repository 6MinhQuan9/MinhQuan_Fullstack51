const express = require('express');
const mangaRouter = express.Router();
const mangaController = require('../controllers/mangaController');

mangaRouter.get('/', mangaController.getAll);
mangaRouter.get('/manga/:id', mangaController.getById);
mangaRouter.post('/', mangaController.post);
mangaRouter.put('/manga/:id', mangaController.put);
mangaRouter.delete('/manga/;id', mangaController.delete);

module.exports = mangaRouter;