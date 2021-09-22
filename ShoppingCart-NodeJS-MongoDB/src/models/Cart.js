const mongoose = require('mongoose');

require("../db/connect");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;