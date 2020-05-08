import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit';
import movieRoute from './src/routes/movieRoutes';

var app = express();
var PORT = 8080;

// load Environment Variables
dotenv.config();

var mongoUserName = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDbName = process.env.MONGO_DB;
var mongoSecret = process.env.MONGO_SECRET;

// Setup Helmet Security
app.use(helmet());

// Serve Static Files
app.use(express.static('public'));

// Setup Body Parser
app.use(bodyParser.urlencoded({urlencoded: true, extended: true}));
app.use(bodyParser.json());

// Rate Limiter
const limiter = new rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100, // Max Request per IP
    delayMs: 0 // disable delays
})

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@testcluster-${mongoSecret}.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Router
app.get('/', (req, res) => {
    res.send(`Welcome to Movies API`);
});

// Setup JWT
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    {
        jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
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

// routes
movieRoute(app);

// Health Check
app.get('/ping', (req, res) => {
    res.json({"pong": "ok"});
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});