FROM node:16.13.1-alpine

WORKDIR /api-onde-tem-missa
COPY package.json .
RUN npm install
COPY . .
CMD npm start