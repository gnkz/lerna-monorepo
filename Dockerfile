FROM node:11-alpine as base

WORKDIR /usr/src/app

COPY ./package.json ./yarn.lock ./lerna.json ./
RUN npm set unsafe-perm true
RUN yarn install --pure-lockfile

COPY ./packages ./packages
RUN yarn lerna bootstrap
