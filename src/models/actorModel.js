import mongoose from 'mongoose';

export const ActorSchema = new mongoose.Schema({
    actorid: {
        type: String,
    },
    name: {
        type: String,
    },
    date_of_birth: {
        type: String,
    },
    birth_city: {
        type: String,
    },
    birth_country: {
        type: String,
    },
    height_inches: {
        type: String,
    },
    biography: {
        type: String,
    },
    gender: {
        type: String,
    },
    ethnicity: {
        type: String,
    },
    networth: {
        type: String,
    }
});