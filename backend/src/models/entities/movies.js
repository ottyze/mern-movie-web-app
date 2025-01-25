const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    title: { type: String, required: true },
    info: {
      directors: [String],
      release_date: { type: Date },
      rating: { type: Number },
      genres: [String],
      image_url: { type: String },
      plot: { type: String },
      rank: { type: Number },
      running_time_secs: { type: Number },
      actors: [String],
    },
  })

module.exports = mongoose.model('Movie', movieSchema);
