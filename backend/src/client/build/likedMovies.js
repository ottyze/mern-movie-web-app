const UserLikes = require('../../models/relations/UserLikes');
const User = require('../../models/entities/users');

const fetchLikedMovies = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        const email = user.email
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const likedMovies = await UserLikes.find({ user: user._id }).populate('movie');
        const movies = likedMovies.map((like) => like.movie);

        res.status(200).json(movies);
    } catch (err) {
        console.error("Error fetching liked movies:", err);
        res.status(500).json({ message: "Failed to fetch liked movies" });
    }
};

module.exports = { fetchLikedMovies };