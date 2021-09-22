const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/cartApi", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});