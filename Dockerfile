FROM node:12-alpine

COPY ./package.json /var/daniil/
RUN cd /var/daniil/ && npm install && npm audit fix

COPY ./src /var/daniil/src
WORKDIR /var/daniil

EXPOSE 3000

CMD npm run start