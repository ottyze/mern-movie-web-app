const mongoose = require('mongoose');
const Movie = require('../entities/movies');
const Genre = require('../entities/genres');


const movieGenresSchema= new mongoose.Schema({
    movie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true
    },
    genre: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Genre', 
        required: true
    }
})

module.exports = mongoose.model('MovieGenres', movieGenresSchema);