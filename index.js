var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var movieSchema = new mongoose.Schema({
        name: String,
        stars: Number
    });

    movieSchema.methods.rating = function() {
        var titleWithRating = 
        this.stars ? this.name + " Is a " + this.stars + " stars movie."
                    : this.name + "Isn't rated yet";
        console.log(titleWithRating);
    }
    var Movie = mongoose.model('Movie', movieSchema);

    var inception = new Movie({name: 'Inception', stars: 5});
    var avengers = new Movie({name: 'Avengers', stars: 3});

    inception.save(function (err, fluffy) {
        if (err) return console.error(err);
        inception.rating();
    });

    avengers.save(function(err, avengers) {
        if (err) return console.error(err);
        avengers.rating();
    })

    Movie.find(function (err, movies) {
        if (err) return console.error(err);
        console.log(movies);
    })

    Movie.find({name: /^Avengers/ }, function(err, movies) {
        if (err) return console.error(err);
        console.log(movies);
    } );

    Movie.deleteMany({name: 'Inception'});
    Movie.deleteMany({name: 'Avengers'});
    });