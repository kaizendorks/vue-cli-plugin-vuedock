# VueDock
> Docker plugin for the Vue CLI 3

[![Build Status](https://travis-ci.org/kaizendorks/vue-cli-plugin-vuedock.svg?branch=master)](https://travis-ci.org/kaizendorks/vue-cli-plugin-vuedock)

## Instructions

#### Description
Generates Docker/Docker-compose files for:
- running the local development server.
- running eslint and unit tests
- creating a production ready image, built on top of the official nginx Docker image.

#### Installation in a Vue project
Simply run the following command from your project's root folder: `vue add vuedock`

For more information, see: https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project

#### Usage: Dev (Example using Yarn)

1. Run Vue Application:

        docker-compose up app

1. Run ESLint:

        docker-compose run --rm app yarn lint

1. Run Unit Tests:

        docker-compose run --rm app yarn test:unit

1. **Run E2E Tests (Currently not working):**

#### Usage: CI Server (Example using NPM)

1. Build CI ready Docker image:

        docker build --target build -t vueapp .

1. Run linting

        docker run --rm vueapp npm run lint

1. Run unit test:

        docker run --rm vueapp npm run test:unit

1. **Run E2E Tests (Currently not working)**:

1. Build you production image:

        docker build -t vueapp .

1. If you enabled Dgoss test you can validate the production image with:

        docker run --rm -it \
          -v "$(pwd)":/src \
          -v /var/run/docker.sock:/var/run/docker.sock \
        iorubs/dgoss run vueapp

#### Usage: Prod

1. Run production app:

        docker run --rm -p 8080:80 vueapp
        # Open port 8080 to see some output.

## Contributing

#### Development

Dockerized vue-cli

``` bash
# Build image
docker build -t vuedock --target vuecli .

# Print help
docker run --rm vuedock

# Run a shell inside the dev container
docker run --rm -it \
  -v "$(pwd)":/vuedock \
vuedock sh

# Create sample app
vue create app

# Change dir to project dir
cd app

# Install plugin using NPM
npm install --save-dev file:/vuedock

# Or install plugin using YARN
yarn add --dev file:/vuedock

# Run plugin
vue invoke vue-cli-plugin-vuedock
```

#### CI

Goss is tool for validating server’s configuration (avoid conf. drift). Dgoss is a wrapper written on top of goss for validating docker images.
https://github.com/aelsabbahy/goss/tree/master/extras/dgoss

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
  -v "$(pwd)/generator/template/dgoss":/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
iorubs/dgoss run app

# Edit prod app dgoss tests
docker run --rm -it \
  -v "$(pwd)/generator/template/dgoss":/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
iorubs/dgoss edit app
```

## Todo:
1. Fix .dockerignore issue
1. Add E2E test support
1. Add express support
1. Move Contributing sections somewhere else or not?
