const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema = {
    name: String,
    director: String,
    genre: String,
    stars: {type: Number, min: 1, max: 0}    
}

module.exports = mongoose.model("Movie", MovieSchema);