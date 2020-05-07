import express from 'express';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

var app = express();
var PORT = 3000;

// load Environment Variables
dotenv.config();

var mongoUserName = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDbName = process.env.MONGO_DB;
var mongoSecret = process.env.MONGO_SECRET;

// Setup Helmet Security
app.use(helmet());

// Setup Body Parser
app.use(bodyParser.urlencoded({urlencoded: true}));
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
app.route('/', (req, res) => {
    console.log("Main Route");
});

// Health Check
app.get('/ping', (req, res) => {
    res.json({"pong": "ok"});
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});