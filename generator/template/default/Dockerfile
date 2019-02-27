# BASE
FROM node:11-alpine as dev

LABEL maintainer="https://github.com/kaizendorks"

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm install

# BUILD STAGE
FROM dev as build

COPY . .
RUN npm run build

# SERVE STAGE
FROM nginx:1.14-alpine as prod

COPY --from=build /home/node/app/dist /usr/share/nginx/html
