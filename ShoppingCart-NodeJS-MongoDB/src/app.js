const express = require('express');

const bodyParser = require('body-parser');

const userRouter = require('./routers/user');

const productRouter = require('./routers/products');

const cartRouter = require('./routers/cart');

const app = express.Router();

 require("dotenv").config();

 const port = process.env.PORT;

 app.use(express.json());

 app.user(express.urlencoded({ extended: true}));

 app.use("/api/v1/users", userRouter);

 app.use("/api/v1/products", productRouter);

 app.use("/api/v1/cart", cartRouter);

 app.get("/", (req, res) => {
     res.send("Welcome to homepage");
 });

 app.listen(port, () => {
     console.log(`Sever is listening on port ${port}`);
 })

