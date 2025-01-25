const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { registerUser } = require('./client/build/register');
const { signInUser } = require('./client/build/signin');
const { signOutUser } = require('./client/build/signout');
const { likeMovie } = require('./client/build/like');
const { unlikeMovie } = require('./client/build/unlike');
const { getGenres } = require('./client/build/unqGenres');
const { getMovies } = require('./client/build/movies');
const { fetchLikedMovies } = require('./client/build/likedMovies');
const { verifyToken } = require('./client/build/token');
const User = require('./models/entities/users');
const seedDatabase = require('./seed');


const app = express();
const PORT = 3030;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/movies-group-{group10}')
  .then(async () => {
    console.log('MongoDB connected');
    await seedDatabase(); // Seed the database after connecting
  })
  .catch((err) => console.log('Error connecting to MongoDB:', err));




app.post('/register', registerUser);

app.post('/signin', signInUser);
app.post('/signout', verifyToken, signOutUser);


app.post('/like', verifyToken, likeMovie);
app.post('/unlike', verifyToken, unlikeMovie);

app.post('/likedMovies', verifyToken, fetchLikedMovies);

app.get('/movies', getMovies);

app.get('/genres', getGenres);


app.post('/auth-status', verifyToken, async (req, res) => {
  const user = await User.findOne({ _id: req.userId })
  const userName = `${user.firstName} ${user.lastName}`
  return res.json({ message: "Token Is Valid", userName: userName, email: user.email });
});
app.listen(PORT, () => {
  console.log(`Server is ONLINE on port ${PORT}\n`);
});
