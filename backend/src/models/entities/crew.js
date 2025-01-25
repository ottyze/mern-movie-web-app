const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('Crew', crewSchema);
