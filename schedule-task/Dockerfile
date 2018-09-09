FROM node:8.9.4

WORKDIR /usr/src/worker

RUN npm config set cache /usr/src/cache

RUN apt-get update

RUN apt-get -y install

COPY . .

RUN rm -rf node_modules/

RUN npm install --quiet --unsafe-perm

EXPOSE 8080

CMD [ "npm", "start" ]


