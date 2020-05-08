import { getAllMovies } from '../controllers/movieController';
import { getAllActors } from '../controllers/actorController';
import { getAllCharacters } from '../controllers/characterController';
import { login,
            register,
            loginRequired } from '../controllers/userController';

// Funtion to get All data of all APIs
const movieRoute = (app) => {
    app.route('/movies/all')
        .get(getAllMovies);

    app.route('/characters/all')
        .get(getAllCharacters);
 
    app.route('/actors/all')
        .get(getAllActors);

    // register Controller    
    app.route('/auth/register')
        .post(register);

    // login Controller
    app.route('/auth/login')
        .post(login);
}

export default movieRoute