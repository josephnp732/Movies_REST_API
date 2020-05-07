import mongoose from 'mongoose';
import { ActorSchema } from '../models/actorModel'

var Actor = mongoose.model('Actor', ActorSchema);

// Get all Movies from DB
export const getAllActors = (req, res, next) => {
    Actor.find({}, (err, actors) => {
        if(err) {
            res.StatusCode(500);
            res.send("Internal Server Error. Movies Not Found. Please try again later after sometime");
        }
        
        res.json(actors);
    });
}