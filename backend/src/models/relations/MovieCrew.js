const mongoose = require('mongoose');
const Movie = require('../entities/movies');
const Crew = require('../entities/crew');  


const movieCrewSchema = new mongoose.Schema({
    movie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true
    },
    crew: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Crew', 
        required: true
    },
    role: { 
        type: String, 
        enum: ['Actor', 'Director'], 
        required: true 
    }
})

module.exports = mongoose.model('MovieCrew', movieCrewSchema);