FROM kaizendorks/vue:4 AS development

LABEL maintainer="https://github.com/kaizendorks"

RUN apk upgrade \
    && apk add docker

FROM development AS ci

WORKDIR /home/node
USER node

# Create a sample app
RUN  vue create app -i '{"useConfigFiles": true, "plugins": {"@vue/cli-plugin-unit-jest": {}}}'
WORKDIR /home/node/app

# Install vuedock
COPY . /vuedock

# TODO: open an Issue/PR in the vue-cli repo, so "vue invoke" can make use of optionalDependencies, currently we see:
# Error: Cannot resolve plugin vue-cli-plugin-vuedock from package.json. Did you forget to install it?
# This would allows us to remove the dummy package.json
RUN yarn add --dev file:/vuedock \
    && vue invoke vue-cli-plugin-vuedock -d \
    && rm -rf package.json node_modules
COPY ./test/package.json ./package.json

USER root
# Hack around to dgoss test short living images
CMD ["sleep", "1d"]
