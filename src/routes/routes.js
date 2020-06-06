import { getAllMovies, getMoviesByActor } from "../controllers/movieController";
import { getAllActors, getActorsbyMovie } from "../controllers/actorController";
import { getAllCharacters } from "../controllers/characterController";
import { login, register, loginRequired } from "../controllers/userController";

// redis-cache expiration
export const redisExpiration = {
  expire: 3600 // redis-cache data expires in 1 hr
};

// Funtion to get All data of all APIs
const routes = (app, redisClient) => {

  movieRoutes(app, redisClient);

  actorRoutes(app, redisClient);

  // get All Characters (Authentication Required)
  app.route("/characters/all").get(redisClient.route(redisExpiration), loginRequired, getAllCharacters);

  // register Controller
  app.route("/auth/register").post(register);

  // login Controller
  app.route("/auth/login").post(login);
};


const movieRoutes = (app, redisClient) => {
    // get All Movies
    app.route("/movies/all").get(redisClient.route(redisExpiration), getAllMovies);

    // get movies by actor
    app.route("/moviesByActor").post(redisClient.route(redisExpiration), getMoviesByActor);
}

const actorRoutes = (app, redisClient) => {
  // get All Actors
  app.route("/actors/all").get(redisClient.route(redisExpiration), getAllActors);

  // get actors by movie
  app.route("/actorsByMovie").post(redisClient.route(redisExpiration), getActorsbyMovie);
}

export default routes;
