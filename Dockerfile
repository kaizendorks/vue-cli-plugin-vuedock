# Todo: Create cli image and use it here: E.g FROM kaizendorks/vue:3
FROM node:11-alpine AS vuecli

LABEL maintainer="https://github.com/kaizendorks"

RUN npm install -g @vue/cli@^3.0.0 \
    && vue --version

USER node
WORKDIR /home/node

CMD ["vue"]

FROM vuecli AS ci

USER root

RUN apk upgrade \
    && apk add docker

USER node

# Create a sample app and install vuedock
RUN  vue create app -i '{"useConfigFiles": true, "plugins": {"@vue/cli-plugin-unit-jest": {}}}'
COPY --chown=node:node . ./vuedock
WORKDIR /home/node/app
RUN yarn add --dev file:/home/node/vuedock \
    && vue invoke vue-cli-plugin-vuedock -d \
    && rm -rf package.json node_modules

COPY ./test/package.json ./package.json

USER root

# Hack around to dgoss test short living images
CMD ["sleep", "1d"]
