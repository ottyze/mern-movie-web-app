const mongoose = require('mongoose');
const Movie = require('../entities/movies');
const Users = require('../entities/users');


const userLikesSchema = new mongoose.Schema({
    movie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
})

module.exports = mongoose.models.UserLikes || mongoose.model('UserLikes', userLikesSchema);