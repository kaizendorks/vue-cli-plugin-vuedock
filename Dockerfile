# Todo: Create cli image and use it here: E.g FROM kaizendorks/vue:3
FROM node:11-alpine as vuecli

LABEL maintainer="https://github.com/kaizendorks"

RUN npm install -g @vue/cli@^3.0.0 \
    && vue --version

USER node
WORKDIR /home/node

CMD ["vue"]

FROM vuecli as ci

user root

RUN apk upgrade \
    && apk add docker

user node

# Create a sample app and install vuedock
RUN  vue create -d app
COPY --chown=node:node . ./vuedock
WORKDIR /home/node/app
RUN npm install --save-dev file:/home/node/vuedock \
    && vue invoke vue-cli-plugin-vuedock -d \
    && rm -rf package.json package-lock.json node_modules \
    && touch package-lock.json

COPY ./test/package.json ./package.json

user root

# Hack around to dgoss test short living images
CMD ["sleep", "1d"]
