const mongoose = require('mongoose');
const Movie = require('../../models/entities/movies');
const getGenres = async (req, res) => {
    try {
        const uniqueGenres = await Movie.aggregate([
            { $unwind: "$info.genres" },
            { $group: { _id: "$info.genres" } },
            { $project: { _id: 0, genre: "$_id" } },
        ]);

        const genresList = uniqueGenres.map(item => item.genre);

        console.log('Unique genres:', genresList);
        res.status(200).json(genresList);
    } catch (err) {
        console.error('Error fetching unique genres:', err);
        res.status(500).json({ message: "Failed to fetch unique genres" });
    }
};

module.exports = { getGenres };