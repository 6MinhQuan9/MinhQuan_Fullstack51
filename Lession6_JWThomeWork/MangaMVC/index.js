const express = require('express');

const router = require('./router/router.js');

const mongoose = require('mongoose');

const app = express();

//Connect to MongoDD

const db = "mongodb://localhost/mangaMVC";

const port = 9669;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

router(app);

app.listen(port, () => console.log('Sever is running on port ', port));
