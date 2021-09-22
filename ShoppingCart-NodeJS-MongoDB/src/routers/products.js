const express = require('express');

const app = express.Router();

const { addProduct, getAllProducts, updateProductById, deleteProductById} = require('../controllers/productController');

app.post("/newProduct", addProduct);

app.get("/getAllProducts", getAllProducts);

app.patch('/updateProductById/:id', updateProductById);

app.delete('/deleteProductById/:id', deleteProductById);

module.exports = app;