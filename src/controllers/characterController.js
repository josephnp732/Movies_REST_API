import mongoose from 'mongoose';
import { CharacterSchema } from '../models//characterModel'

var Character = mongoose.model('Character', CharacterSchema);

// Get all Movies from DB
export const getAllCharacters = (req, res, next) => {
    Character.find({}, (err, characters) => {
        if(err) {
            res.StatusCode(500);
            res.send("Internal Server Error. Movies Not Found. Please try again later after sometime");
        }
        
        res.json(characters);
    });
}