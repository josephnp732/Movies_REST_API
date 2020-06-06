# Movies Information REST API

Highly available REST API service to get Movies and Actors Information in JSON format

(More movies are being added)

## Features

* Designed and developed RESTful API on Node.js fetching indexed data efficiently from a **MongoDB Atlas Cluster** 
* Implemented resource **Caching** on a remote **Redis** Node reducing server response time by over 50% 
* Implemented **AuthN/AuthZ** and secured the application with **Helmet.js** protecting it from OWASP Top 10 Attacks
* Configured **CircleCI** to deploy the dockerized application on **Google Cloud Run** Serverless Architecture 
* Provisioned monitoring and analysis tools (**_Jaeger & Elastic Stack_**) on a **Digital Ocean** droplet using **Terraform**


### Test Env: **(GCP Cloud Run Test Env)**

`https://test.movies-api.me` 

### Dev Env: **(GCP Cloud Run Dev Env)**

`https://dev.movies-api.me`

[Hostname Provided by namecheap.com]

### _HTTP Methods:_

<ins>**GET:**</ins>

* `movies/all` : Get all movies
* `actors/all` : Get all actors
* `character/all` : Get all Characters (_Requires AuthN & AuthZ_)

<ins>**POST:**</ins>

* `/getMoviesByActor`: (application/json)
    - Http Body: `{"actorName": "<actor_name>"}`
* `/getActorsByMovie`: (application/json)
    - Http Body: `{"movieTitle": "<movie_title>"}`
* `/auth/register` 
    - Http Body: (application/x-www-form-urlencoded) (_Fields:_ userName, email and password)
* `/auth/login` 
    - Http Body: (application/x-www-form-urlencoded) (_Fields:_ userName, email and password) [Returns JWT Token]

### Environment Variables:

Create `.env` in project's root directory with the following variables: 

```
APP_PORT (Application Port)

MONGO_USERNAME=""
MONGO_DB=""
MONGO_PASSWORD=""
MONGO_SECRET=""

JAEGER_COLLECTOR_ENDPOINT=http://xxx.xxx.xxx.xxx.xxx:14268/api/traces
JAEGER_SERVICE_NAME=movies-api-project-local
JAEGER_AGENT_HOST=xxx.xxx.xxx.xxx.xxx
JAEGER_AGENT_PORT=xxxx

JWT_PRIVATE_KEY="<RSA256 Private Key>"
```
##### MongoDB Atlas URI Format:

`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@testcluster-${MONGO_SECRET}.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`


##### Jaeger Tracing Endpoint:

`http://<JAEGER_AGENT_HOST>:16686/` (Not Secured) [Hosted on a DigitalOcean Droplet]

##### Note:
```diff
! enviroment variable JAEGER_AGENT_HOST is used for all Redis Client, ELK Stack and Jaeger Tracing

- All Environment variables must be manually set in the cloud/local environment
```

<font color="Blue" size=6> Error Tracking on sentry.io </font>