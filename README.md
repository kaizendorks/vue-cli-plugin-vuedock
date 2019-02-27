# VueDock
> Docker plugin for the Vue CLI 3

[![Build Status](https://travis-ci.org/kaizendorks/vue-cli-plugin-vuedock.svg?branch=master)](https://travis-ci.org/kaizendorks/vue-cli-plugin-vuedock)

## Instructions

#### Description
Generates docker and compose files for both development and hosting, allowing:
- running the development server
- running unit tests
- running nightwatch e2e tests
- hosting built application with nginx container

#### Installation in a Vue project
Simply run from the project root:
```vue add vuedock```

For more information, see: https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project

## Contributing

#### Development

Dockerized vue-cli

``` bash
# Build image
docker build -t vuedock --target vuecli .

# Print help
docker run --rm vuedock

# Create sample app
docker run --rm -it \
  -v "$(pwd)":/vuedock \
vuedock sh

# Create sample app
vue create -d app \
  && cd app \
  && npm install --save-dev file:/vuedock \
  && vue invoke vue-cli-plugin-vuedock
```

#### CI

Goss is tool for validating server’s configuration (avoid conf. drift). Dgoss is wrapper written on top of the goss for validating docker images. https://github.com/aelsabbahy/goss/tree/master/extras/dgoss

``` bash
# Build image
docker build -t vuedock .

# Dgoss Tests (quick smoke test to check if docker files were generated)
docker run --rm -it \
  -v "$(pwd)/test":/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
iorubs/dgoss run vuedock

# Edit tests
docker run --rm -it \
  -v "$(pwd)/test":/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
iorubs/dgoss edit vuedock

# Try building generated dockerfiles
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
vuedock docker build -t app .

# Run prod app dgoss tests
docker run --rm -it \
  -v "$(pwd)/generator/template/default":/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
iorubs/dgoss run app

# Edit prod app dgoss tests
docker run --rm -it \
  -v "$(pwd)/generator/template/default":/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
iorubs/dgoss edit app
```

## Todo:
1. Fix .dockerignore
1. Add yarn support
1. Extensive testing with different create app inputs
1. Add express support
1. Move Contributing sections somewhere else
