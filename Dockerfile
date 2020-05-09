FROM node:14-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
ARG MONGO_USERNAME="user"
ARG MONGO_PASSWORD="user"
ARG MONGO_SECRET="default"
ARG MONGO_DB="movies_project"
RUN yarn install && \
    yarn cache clean
CMD [ "yarn", "start" ]
EXPOSE 8080