const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    name: {
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

module.exports = mongoose.model('Manga', mangaSchema);