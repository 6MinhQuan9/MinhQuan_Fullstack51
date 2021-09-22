const Product = require('../models/Products');

const responseHelper = require('../helpers/responseHelpers');

//create product

exports.addProduct = async (req, res) => {
    try{
        const product = new Product(req.body);

        await product.save();

        return responseHelper.successapi(res, "Created product", 201, product);
    } catch(err) {
        return responseHelper.error(res, "Invalid request", 400, err);
    }
};

//get all products

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return responseHelper.successapi(res, "All products", 200, products);
    } catch (err) {
        return responseHelper.error(res, "Invalid request", 500, err);
    }
};


//update product

exports.updateProductById = async (req, res) => {
    try{
        console.log("update");

        const product = await Product.findByIdAndUpdate({ _id: req.params.id}, req.body, {new: true});

        console.log(product);

        await product.save();

        return responseHelper.successapi(res, "Product updated successfully!!", 204, product);
    } catch (err) {
        return responseHelper.error(res, "Invalid request", 400);
    }
};

// delete product

exports.deleteProductById = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete({ _id: req.params.id});
        return responseHelper.successapi(res, "Product deleted successfull!!!", 204, product);
    } catch (err) {
        return responseHelper.error(res, "Product not found", 500, err);
    }
};