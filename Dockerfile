FROM node:12-alpine

WORKDIR /app

COPY . .

# RUN npm i -g regenerator-runtime