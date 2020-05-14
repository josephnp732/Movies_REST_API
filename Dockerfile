FROM node:14-alpine

ENV APP_PORT 8080
ENV JAEGER_AGENT_PORT 6831
ENV MONGO_DB movies_project

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN yarn install && \
    yarn cache clean

CMD [ "yarn", "start" ]

EXPOSE 8080