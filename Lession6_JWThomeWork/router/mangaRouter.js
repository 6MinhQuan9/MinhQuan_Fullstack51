const express = require('express');

const router = express.Router();

const Joi = require('joi');

const mangaModel = require('../model/manga.model');

const jwt = require('jsonwebtoken');

function mangaValidate(manga) {
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            type: Joi.string().min(7).required(),
            price: Joi.number().min(10000).required()
        }
    )
    return schema.validate(manga);
}

router.post('/manga', async (req, res) => {
    const {error} = mangaValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const nameExisted = await mangaModel.findOne({ name: req.body.name});
    if (nameExisted) return res.status(400).send('Manga is existed!!!');

    const newManga = new mangaModel();

    newManga.name = req.body.name;
    newManga.type = req.body.type;
    newManga.price = req.body.price;

    try{
        const manga = await newManga.save();
        
        var token = jwt.sign({ id: manga._id}, 'thisismangatoken');

        res.header('auth-token', token).send(token);
    }catch(error){
        res.status(400).send(error);
    }
});

const checkToken = (req, res, next) => {
    const token = req.header('mang-token');

    if(!token) return res.status(401).send('Forbidden!!!');

    try {
        req.comic = jwt.verify(token , 'thisismangatoken');

        next();
    } catch (error) {
        res.status(400).send('Token Incorrect!');
    }
}

router.get('/manga/:id', checkToken, async (req, res) => {
    await mangaModel.findOne({ _id: req.params.id }).exec((err, manga) => {
        if(err) {
            res.send('Id not existed');
        }else{
            res.json(manga)
        }
    });
});

module.exports = router;