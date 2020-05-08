import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },   
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
        type: String,
        default: Date.now
    }
});

// Compare Password with HashPassword
UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}