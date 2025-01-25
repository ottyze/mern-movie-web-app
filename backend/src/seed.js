const mongoose = require('mongoose');
const fs = require('fs');
const movies = require('./models/entities/movies');
const userLikes = require('./models/relations/UserLikes');

async function seedDatabase() {
  const allmovies = JSON.parse(fs.readFileSync('./src/movies.json', 'utf-8'));
  try {
    // Clear existing data to avoid duplicates\
    for (const movie of allmovies) {
      const existingMovie = await movies.findOne({ title: movie.title, year: movie.year });
      if (!existingMovie) {
        await movies.create({
          year: movie.year,
          title: movie.title,
          info: movie.info,
        });

      }
    }
    const movieCount = await movies.countDocuments({});
    console.log(`${movieCount} movies seeded successfully.`);
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

module.exports = seedDatabase;
