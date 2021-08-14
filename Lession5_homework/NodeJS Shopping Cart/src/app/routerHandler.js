const productRoutes = require('./routes');

module.exports = app => {
    app.productRoutes('/product', productRoutes);
}