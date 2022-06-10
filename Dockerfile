FROM node:16 as base

WORKDIR /usr/src

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
