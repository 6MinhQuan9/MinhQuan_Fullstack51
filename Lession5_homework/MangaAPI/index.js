const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MangaModel = require("./Router/manga.model");

const db = "mongodb://localhost/manga-list";
const port = 6969;

mongoose.connect(db);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Api working!');
});

app.get('/mangas', (req, res) => {
    console.log(req.query.name);
    MangaModel.find({name:req.query.name}).exec((err, mangas) => {
        if(err) {
            res.send('Cannot get manga info!');
        }else{
            console.log('Get manga info successfully!');
            res.json(mangas);
        }
    })
});

app.put('/manga/:id', (req, res) => [
    MangaModel.findOneAndUpdate(
        {_id: req.params.id},
        { $set: {name: req.body.name }},
        {upsert : true},
        (err, manga) => {
            if(err) {
                res.send('Cannot update manga info!');
            }else{
                res.send(200);
            }
        }
    )
])
var MangaName = 'Ninja Loan Thi'
app.delete('/manga/:id', (req, res) => {
    MangaModel.findOneAndDelete({name: MangaName}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('One manga deleted successfully!');
    })
})
app.post('/manga', (req,res) => {
    var manga = new MangaModel();
    manga.name = req.body.name;
    manga.type = req.body.type;
    manga.price = req.body.price;

    manga.save((err, manga) => {
        if (err) {
            res.send('Error! Cannot save manga info!')
        }else{
            console.log('Save manga info successfully!')
            res.send(manga)
        }
    });
});


app.listen(port, () => {
    console.log('app listening on port: ', port);
});