import { redisExpiration } from '../routes/routes';

// Health Check
export const healthCheck = (app, client) => {
    app.get('/ping', client.route(redisExpiration), (req, res) => {
        res.json({"pong": "ok"});
    });
}

