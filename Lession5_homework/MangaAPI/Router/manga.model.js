const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
    name: String,
    type: String,
    price: Number
});

module.exports = mongoose.model('Manga', MangaSchema);