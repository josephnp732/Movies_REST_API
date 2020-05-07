import mongoose from 'mongoose';

export const Character = new mongoose.Schema({
    actorid: {
        type: String,
    },
    movieid: {
        type: String,
    },
    creditorder: {
        type: String,
    },
    character_name: {
        type: String,
    },
    pay: {
        type: String,
    },
    screentime: {
        type: String,
    }
});