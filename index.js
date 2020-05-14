import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import routes from './src/routes/routes';
import morgan from 'morgan';
import { track } from 'express-jaeger';
import * as Sentry from '@sentry/node';
import redisCache from 'express-redis-cache';
import redis from 'redis';

import { jwtMiddleWare } from './src/middleware/JWT';
import { healthCheck } from './src/routes/healthCheck';

// load Environment Variables
dotenv.config();

var mongoUserName = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDbName = process.env.MONGO_DB;
var mongoSecret = process.env.MONGO_SECRET;
var redisHost = process.env.JAEGER_AGENT_HOST;  // same container as Jaeger

const app = express();
var PORT = process.env.APP_PORT;

// Setup morgan logger
app.use(morgan('combined'));

// Enable strong E-Tag
app.set('etag','strong');

// Setup Redis-Cache Client
var redisClient = redisCache({client: redis.createClient({host: redisHost, port: "6379"})});

// Setup Helmet Security
app.use(helmet({permittedCrossDomainPolicies: true}));  

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

// Setup Jaeger API Tracing
const TracerConfig = {
    serviceName: process.env.JAEGER_SERVICE_NAME,
    sampler: {
      type: "const",
      param: 1
    },
    reporter: {
      collectorEndpoint: process.env.JAEGER_COLLECTOR_ENDPOINT,
      agentHost: process.env.JAEGER_AGENT_HOST,
      agentPort: process.env.JAEGER_AGENT_PORT,
      logSpans: true
    }
  };

app.use(track("/ping", null, TracerConfig));
app.use(track("/movies/all", null, TracerConfig));
app.use(track("/actors/all", null, TracerConfig));

// jwt middleware
jwtMiddleWare(app);

// Setup Sentry.io Middleware
var sentryDNS = process.env.SENTRY_DNS;
Sentry.init({ dsn: sentryDNS});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@testcluster-${mongoSecret}.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Router
app.get('/', (req, res) => {
    res.status(200);
    res.send(`Welcome to Movies API`);
});

// Health Check
healthCheck(app, redisClient);

// routes
routes(app, redisClient);

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});

export default app;