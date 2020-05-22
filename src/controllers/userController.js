import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
    UserSchema
} from '../models/userModel';

// load Environment Variables
dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

const User = mongoose.model('User', UserSchema);

// register new user
export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    })
}

// Authenticate User
export const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            res.status(401).send({
                message: "No User found"
            });
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).send({
                    message: "Unauthenticated"
                });
            } else {
                return res.json({
                    token: jwt.sign({
                        email: user.email,
                        username: user.username,
                        _id: user.id,
                    }, privateKey, {
                        expiresIn: "1h"   // Token expires in 1 hr
                    })
                });
            }
        } 
    });
}

// Authorize User
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized User!'
        });
    }
}