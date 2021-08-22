const express = require('express');

const mongoose = require('mongoose');

const app = express();

const mangaRouter = require('./router/mangaRouter');

const db = 'mongodb://localhost/mangaList';

const port = 6969;

mongoose.connect(db);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Api working!!!')
});

app.use('/api', mangaRouter);

app.listen( port, () => {
    console.log('App listening on port: ', port);
});