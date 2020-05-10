import mongoose from 'mongoose';
import { MovieSchema } from '../models/movieModel';
import { ActorSchema } from '../models/actorModel';
import { CharacterSchema } from '../models/characterModel';

var Movie = mongoose.model('Movie', MovieSchema);
var Actor = mongoose.model('Actor', ActorSchema)
var Character = mongoose.model('Character', CharacterSchema)

// Get all Movies from DB
export const getAllActors = (req, res, next) => {
    Actor.find({}, (err, actors) => {
        if(err) {
            res.status(500);
            res.send("Internal Server Error. Movies Not Found. Please try again later after sometime");
        }
        
        res.json(actors);
    });
}

// POST: { "movieTitle": "movie_title" }
export const getActorsbyMovie = (req, res, next) => { 
    Movie.find({'title': {$regex: req.body.movieTitle, $options:'i'}}, (err, movies) => {
        if(err) {
            res.status(500);
            res.send("Internal Server Error. (Movies Error) Please try again later after sometime");
            return;
        }

        // empty object returned
        if(Object.keys(movies).length === 0) {
            res.status(400);
            res.send("Movie not found. Please check the title.");
            return;
        }

        let movieId = movies[0].movieid;

        Character.find({"movieid": movieId}, {"_id": 0,"actorid": 1}, (err, characters) => {
            if(err) {
                res.status(500);
                res.send("Internal Server Error. (Characters Error) Please try again later after sometime");
                return;
            }

            var actorIds = [];
            characters.forEach((actor) => {
                actorIds.push(actor.actorid);        
            })

            Actor.find({'actorid': { $in: actorIds }}, { "_id": 0 }, (err, actors) => {
                if(err) {
                    res.status(500);
                    res.send("Internal Server Error. (Actors Error) Please try again later after sometime");
                    return;
                }

                res.json(actors);
            });            
        });
    });
}