import { getAllMovies, getMoviesByActor } from "../controllers/movieController";
import { getAllActors, getActorsbyMovie } from "../controllers/actorController";
import { getAllCharacters } from "../controllers/characterController";
import { login, register, loginRequired } from "../controllers/userController";
import { actorByMoviesSchema, moviesByActorSchema } from '../schemas/schemas';


// Funtion to get All data of all APIs
const routes = (app) => {

  movieRoutes(app);

  actorRoutes(app);

  // get All Characters (Auth)
  app.route("/characters/all").get(getAllCharacters);

  // register Controller
  app.route("/auth/register").post(register);

  // login Controller
  app.route("/auth/login").post(login);
};


const movieRoutes = (app) => {
    // get All Movies
    app.route("/movies/all").get(getAllMovies);

    // get movies by actor
    app.route("/moviesByActor").post(getMoviesByActor);
}

const actorRoutes = (app) => {
  // get All Actors
  app.route("/actors/all").get(getAllActors);

  // get actors by movie
  app.route("/actorsByMovie").post(getActorsbyMovie);
}

export default routes;
