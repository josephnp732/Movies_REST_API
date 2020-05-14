import mongoose from 'mongoose';
import Ajv from 'ajv';

import { MovieSchema } from '../models/movieModel';
import { ActorSchema } from '../models/actorModel';
import { CharacterSchema } from '../models/characterModel';
import { moviesByActorSchema } from './schemas/schemas';
import validateRequest from './validator/schemaValidator';

var Movie = mongoose.model('Movie', MovieSchema);
var Actor = mongoose.model('Actor', ActorSchema);
var Character = mongoose.model('Character', CharacterSchema);

// Get all Movies from DB
export const getAllMovies = (req, res, next) => {
    Movie.find({}, (err, movies) => {
        if(err) {
            res.status(500);
            res.send("Internal Server Error. Movies Not Found. Please try again later after sometime");
        }
        
        res.json(movies);
    });
}

// POST: { "name": "actor_name" }
export const getMoviesByActor = (req, res, next) => {

    if(!validateRequest(req, res, moviesByActorSchema)) {
        return;
    }

    Actor.find({"name": {$regex: req.body.name, $options:'i'}}, (err, actor) => {
        if(err) {
            res.status(500);
            res.send("Internal Server Error. (Actors Error) Please try again later after sometime");
            return;
        }

        // empty object returned
        if(Object.keys(actor).length === 0) {
            res.status(400);
            res.send("Actor not found. Please check the name");
            return;
        }

        let actorId = actor[0].actorid;
        Character.find({"actorid": actorId}, {"_id": 0,"movieid": 1}, (err, characters) => {
            if(err) {
                res.status(500);
                res.send("Internal Server Error. (Characters Error) Please try again later after sometime");
                return;
            }

            var movieIds = [];
            characters.forEach((character) => {
                movieIds.push(character.movieid);        
            })

            Movie.find({'movieid': { $in: movieIds }}, { "_id": 0 }, (err, movies) => {
                if(err) {
                    res.status(500);
                    res.send("Internal Server Error. (Movies Error) Please try again later after sometime");
                    return;
                }
                
                res.json(movies);
            });
        });        
    });
}