const Movie = require('../../models/entities/movies');

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Failed to fetch movies" });
    }
};

module.exports = { getMovies };
