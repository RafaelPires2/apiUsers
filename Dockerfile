FROM node:16.13.1-alpine

WORKDIR /apiUsers
COPY package.json .
RUN npm install
COPY . .
CMD npm start