const express = require('express');
const Joi = require('joi');
const mangaRouter = express.Router();

const mangas = [
    {id: '1', name: 'Trinh Tham 1', price: 500000},
    {id: '2', name: 'Lang Man 69', price: 20000},
    {id: '3', name: 'Kinh Di 666', price: 35000}
];


mangaRouter.get('/', (req, res) => {
    res.send(mangas);
});



mangaRouter.post('/', (req, res) => {
    const {error} = validateMangas(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    const manga = {
        id: Number(mangas[mangas.length -1].id) + 1,
        name: req.body.name,
        price: req.body.price
    };
    mangas.push(manga);
    res.send(mangas);
});

mangaRouter.put('/:id', (req, res) => {
    const {error} = validateMangas(req.body);
    if(error) return res.status(400).send(error.detaills[0].message);

    const index = mangas.findIndex((manga) => manga.id == req.params.id);
    if(index != -1){
        mangas[index].name = req.name;
        manga[index].price = req.price;
        res.send(mangas);
    }else{
        console.log('Not found manga id!');
        res.status(400).send('Not found manga id!');
    }
});
mangaRouter.delete('/:id', (req, res) => {
    const index = mangas.findIndex((manga) => manga.id == req.params.id);
    if(index != -1){
        mangas.splice(index, 1);
        res.send(mangas)
    }else{
        console.log('Not found mang id!');
        res.status(400).send('Not found mang id!');
    }
});

function validateMangas(manga) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(10000).max(500000).required()
    });
    return schema.validate(manga);
}

module.exports = mangaRouter;