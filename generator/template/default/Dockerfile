# BASE
FROM node:11-alpine as base

LABEL maintainer="https://github.com/kaizendorks"

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY client/package.json client/package-lock.json
RUN npm install

# BUILD STAGE
FROM base as build

COPY client/ .
RUN npm run build

# SERVE STAGE
# TODO: shouldnt this be an nginx-like image and just copy the resulting "/dist" folder from the build?
FROM node:11-alpine

USER node

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY client/package.json client/package-lock.json ./
RUN npm install

COPY --chown=node:node server/ .
COPY --chown=node:node --from=build /app/dist ./dist

CMD ["npm", "start"]