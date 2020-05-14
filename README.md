### Test Env: **(GCP Cloud Run Test Env)**

`https://test.movies-api.me` 

### Dev Env: **(GCP Cloud Run Dev Env)**

`https://dev.movies-api.me`

[Hostname Provided by namecheap.com]

#### _HTTP Methods:_

<ins>**GET:**</ins>

* `movies/all` : Get all movies
* `actors/all` : Get all actors
* `character/all` : (_Authenticated_) Get all Characters

<ins>**POST:**</ins>

* `/getMoviesByActor`: (application/json)
    - Http Body: `{"actorName": "<actor_name>"}`
* `/getActorsByMovie`: (application/json)
    - Http Body: `{"movieTitle": "<movie_title>"}`
* `/auth/register` (application/x-www-form-urlencoded)
* `/auth/login` (application/x-www-form-urlencoded)

### Jaeger Tracing Endpoint:

`http://174.138.109.75:16686/` (Not Secured) [Hosted on a DigitalOcean Droplet]

### Error Tracking on sentry.io