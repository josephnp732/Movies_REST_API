import mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    movieid: {
        type: String,
    },
    title: {
        type: String,
    },
    budget: {
        type: String,
    },
    gross: {
        type: String,
    },
    mpaa_rating: {
        type: String,
    },
    release_date: {
        type: String,
    },
    genre: {
        type: String,
    },
    runtine: {
        type: String,
    },
    rating: {
        type: String,
    },
    rating_count: {
        type: String,
    },
    summary: {
        type: String,
    },
});