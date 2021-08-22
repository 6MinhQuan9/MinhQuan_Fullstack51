const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MangaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Manga', MangaSchema);