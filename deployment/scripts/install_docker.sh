#! /bin/bash
sudo apt-get update

# install Apache
sudo apt-get -y install apache2

# install docker 
sudo apt install -y docker.io

#download docker image
sudo docker pull josephnp732/movie-api:latest

#start docker image
sudo docker run --name movies-api --rm -it -p 80:3001 josephnp732/movie-api:latest