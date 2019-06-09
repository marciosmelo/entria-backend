const Movie = require('../model/Movie');

exports.getMovies = async (ctx) => {
    const movies = await Movie.find({});
    if (!movies) {
        throw new Error("Error retrieving your movies.");
    } else {
        ctx.body = movies;
    }
}