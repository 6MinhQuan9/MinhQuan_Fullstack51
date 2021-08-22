const mangaModel = require('../model/manga.model');

const {mangaValidate} = require('../middlewares/validate');

class MangaController {
    //GET/mangas

    getAll = (req, res) => {
        console.log(req.query.name);
        mangaModel.find({}).exec((err, mangas) => {
            if(err) {
                res.send('Cannot get manga list!!!');
            } else {
                console.log(mangas);
                res.json(mangas);
            }
        });
    }

    //GET/manga/:id

    getById = (req, res) => {
        mangaModel.findOne({ _id: req.params.id}).exec((err, manga) => {
            if (err) {
                res.send('Error!! Cannot get manga!!');
            } else {
                
                res.json(manga);
            }
        });
    }

    //PUT/manga/:id

    put = (req, res) => {
        const {error} = mangaValidate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        mangaModel.findOneAndUpdate({_id: req.params.id}, 
            {
                name: req.body.name,
                autho: req.body.author,
                type: req.body.type,
                price: req.body.price
            }, {upsert: true},
            (err, manga) => {
                if(err) {
                    res.send('Error!! update fail!!');
                }else{
                    res.send('Manga update successfully!!!')
                }
            })
    }

    //POST /mangas

    post = (req, res) => {
        const {error} = mangaValidate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let manga = new mangaModel();
        manga.name = req.body.name;
        manga.author = req.body.author;
        manga.type = req.body.type;
        manga.price = req.boyd.price

        manga.save((err, manga) => {
            if(err){
                res.send('Error!! Save manga info fail!!');
            }else {
                console.log('Save manga info successfully!', manga);
                res.send(manga);
            }
        })
    }

    //PUT/manga/:id

    delete = (req, res) => {
        mangaModel.findOneAndDelete({ _id: req.params.id}, (err, manga) => {
            if(err) {
                res.send('Error!!')
            } else {
                res.send('Manga deleted!!');
            }
        })
    }
}


module.exports = new MangaController();