const mongoose = require('mongoose');

require("../db/connect");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

 productSchema.virtual("carts", {
     ref: "Cart",
     localField: "_id",
     foreignField: "procductId"
 });

 const Product = mongoose.model("Product", productSchema);

 module.exports = Product;