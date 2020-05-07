import mongoose from 'mongoose';
import { MovieSchema } from '../models/movieModel'

var Movie = mongoose.model('Movie', MovieSchema);

// Get all Movies from DB
export const getAllMovies = (req, res, next) => {
    Movie.find({}, (err, movies) => {
        if(err) {
            res.StatusCode(500);
            res.send("Internal Server Error. Movies Not Found. Please try again later after sometime");
        }
        
        res.json(movies);
    });
}