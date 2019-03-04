# DEV: Contains only dependecies, code is mapped in at runtime
FROM node:11-alpine as dev

LABEL maintainer="https://github.com/kaizendorks"

WORKDIR /home/node/app

<% if (usesYarn) { _%>
COPY package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "serve"]
<% } else { _%>
COPY package.json package-lock.json ./
RUN npm install

CMD ["npm", "run", "serve"]
<% } _%>

# BUILD: Contains all dependecies and code, making it a good target for CI jobs
FROM dev as build

COPY . .
<% if (usesYarn) { _%>
RUN yarn build
<% } else { _%>
RUN npm run build
<% } _%>

# PROD: Optipised distribution with no dev dependecies.
FROM nginx:1.14-alpine as prod

COPY --from=build /home/node/app/dist /usr/share/nginx/html
