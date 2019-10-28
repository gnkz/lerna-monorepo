FROM node:11-alpine

WORKDIR /usr/src/app

COPY ./package.json ./yarn.lock ./lerna.json ./
RUN npm set unsafe-perm true
RUN yarn install --pure-lockfile

COPY ./packages/common ./packages/common
COPY ./packages/server ./packages/server

RUN yarn lerna bootstrap

CMD ["yarn", "lerna", "run", "dev", "--stream", "--scope=@daisy/server"]