const UserLikes = require('../../models/relations/UserLikes');
const User = require('../../models/entities/users');

const unlikeMovie = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findOne({ _id: req.userId })
        const email = user.email

        if (!email || !movieId) {
            return res.status(400).json({ message: "Email and Movie ID are required" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingLike = await UserLikes.findOne({ user: user._id, movie: movieId });
        if (!existingLike) {
            return res.status(409).json({ message: "Movie is not in favorites" });
        }

        await UserLikes.deleteOne({ user: user._id, movie: movieId });

        res.status(201).json({ message: "Movie removed from favorites" });
    } catch (err) {
        console.error("Error unliking the movie:", err);
        res.status(500).json({ message: "Failed to unlike the movie" });
    }
};

module.exports = { unlikeMovie };
