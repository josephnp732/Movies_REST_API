import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// load Environment Variables
dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

export const jwtMiddleWare = (app) => {
    // jwt middleware
    app.use((req, res, next) => {
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        {
            jwt.verify(req.headers.authorization.split(' ')[1], privateKey, (err, decode) => {
                if (err) {
                    req.user = undefined;
                }
                req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    });
}