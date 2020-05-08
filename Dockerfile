FROM node:14-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN yarn install && \
    yarn cache clean
CMD [ "yarn", "start" ]
EXPOSE 3001