import { getAllMovies } from '../controllers/movieController';
import { getAllActors } from '../controllers/actorController';
import { getAllCharacters } from '../controllers/characterController';


const movieRoute = (app) => {
    app.route('/movies/all')
        .get(getAllMovies);

    app.route('/characters/all')
        .get(getAllCharacters);
 
    app.route('/actors/all')
        .get(getAllActors);
}

export default movieRoute