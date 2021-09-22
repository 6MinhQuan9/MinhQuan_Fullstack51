const express = require('express');

const app = express.Router();

const auth = require('../middlewares/auth');

const { addToCart, viewUserCart, removeProductId} = require('../controllers/cartController');

app.post("/addToCart", auth, addToCart);

app.get("viewUserCart", auth, viewUserCart);

app.delete("/removeProductById/:id", auth, removeProductId);

module.exports = app;