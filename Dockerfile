FROM node:10.0.0-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn install && \
    yarn cache clean
CMD [ "yarn", "start" ]
EXPOSE 3001