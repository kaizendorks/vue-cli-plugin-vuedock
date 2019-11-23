# VueDock
> Docker plugin for the Vue CLI 3 & 4

[![Build Status](https://travis-ci.org/kaizendorks/vue-cli-plugin-vuedock.svg?branch=master)](https://travis-ci.org/kaizendorks/vue-cli-plugin-vuedock)

This plugin generates the necessary docker and docker-compose files for:
- running the local development server.
- running eslint and unit tests
- running e2e tests, automatically detecting cypress and nightwatch tests
- creating a production ready image, built on top of the official nginx Docker image.

Contents
- [Installation](#installation)
    - [Options](#options)
        - [Add dgoss tests](#add-dgoss-tests)
- [Usage](#usage)
    - [Usage in development](#usage-in-development)
    - [Usage in CI servers](#usage-in-ci-servers)
    - [Usage in production](#usage-in-production)
- [Contributing](#contributing)
    - [Development in your local environment](#development-in-your-local-environment)
    - [Development in a dockerized environment](#development-in-a-dockerized-environment)
    - [CI](#ci)

## Installation
Run the following command from your project's root folder: `vue add vuedock`

- For more information on how to add plugins to your project, see: <https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project>
- Version info:
	1. For Vue CLI 3 use vudock 1.x.x, tested with node 11.
	1. For Vue CLI 4 use vudock 2.x.x, tested with node 13.

This will generate the following files in your project root:

- `Dockerfile`, multi-stage docker image used for local development and CI/Prod. Will use npm/yarn for the server and build commands depending on whether a `yarn.lock` file was detected when the plugin was installed
- `docker-compose.yml`, compose file to be used during local development for running and testing your app. Will include extra containers for running E2E and Cypress E2E tests if these were detected when the plugin was installed.
- `.dockerignore`, default ignore file

### Options

#### Add dgoss tests

You can optionally generate a `goss.yaml` file ready to test your production container using [goss](https://github.com/aelsabbahy/goss) and [dgoss](https://github.com/aelsabbahy/goss/tree/master/extras/dgoss) (a docker wrapper for goss)

When adding the plugin, you will be automatically prompted whether you want to add dgoss tests or not.

## Usage

### Usage in development

1. Run Vue Application:

        # start the dev server, then navigate to http://localhost:8080 to see your app
        docker-compose up app

1. Run ESLint:

        # Using yarn
        docker-compose run --rm app yarn lint
        # Using npm
        docker-compose run --rm app npm run lint

1. Run Unit Tests:

        # Using yarn
        docker-compose run --rm app yarn test:unit
        # Using npm
        docker-compose run --rm app npm run test:unit

1. Run E2E Tests (generated files support cypress and nightwatch out of the box)

        # Run tests (this will also run the app container if it wasnt already running)
        docker-compose run --rm test_e2e
        # To clean up
        docker-compose down

### Usage in CI Servers

1. Build CI ready Docker image:

        docker build --target build -t vueapp .

1. Run linting

        # Usign yarn
        docker run --rm vueapp yarn lint
        # Using npm
        docker run --rm vueapp npm run lint

1. Run unit test:

        # Usign yarn
        docker run --rm vueapp yarn test:unit
        # Using npm
        docker run --rm vueapp npm run test:unit

1. Run E2E Tests (generated files support cypress and nightwatch out of the box)

        # Run tests (this will also run the app container if it wasnt already running)
        docker-compose run --rm test_e2e
        # To clean up
        docker-compose down

    - **Note:** You can update the E2E tests to point at any running site by changing either the `CYPRESS_baseUrl` or `LAUNCH_URL` environment variable passed into the container (dependending on whether you use cypress or nightwatch for E2E tests). That ability means that this would also be a great basis for implementing some very complex and cool delivery and rollback pipelines.

1. Build you production image:

        docker build -t vueapp .

1. If you enabled Dgoss test you can validate the production image with:

        docker run --rm -it \
          -v "$(pwd)":/src \
          -v /var/run/docker.sock:/var/run/docker.sock \
        iorubs/dgoss run vueapp

#### Usage in production

1. Run production app built in CI server

        docker run --rm -p 8080:80 vueapp
        # Open port 8080 to see some output.

## Contributing

Start by cloning this repo. Then you can develop this plugin fully in a dockerized environment or in your local environment.

### Development in your local environment

1. Copy the full path to your copy of this repo

        pwd
        # copy path like /Users/chuck/git/kaizendorks/vue-cli-plugin-vuedock

1. Create a test `app` project in another folder using the Vue CLI

        vue create app

1. Change to the new `app` project directory and locally install this plugin. You will need the path copied in step 1

        cd app
        npm install --save-dev file:/Users/chuck/git/kaizendorks/vue-cli-plugin-vuedock
        vue invoke vue-cli-plugin-vuedock

1. Once invoked, undo the changes to the package.json and package-lock.json (or yarn.lock). Otherwise install would fail in docker as it wont have access to the directory where the vue-cli-plugin-vuedock plugin is located.

### Development in a dockerized environment

Dockerized vue-cli

``` bash
# Build image
docker build -t vuedock --target development .

# Run a shell inside the dev container
docker run --rm -it \
  -v "$(pwd)":/vuedock \
  -v /var/run/docker.sock:/var/run/docker.sock \
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

# To build and run app as normal you have to remove a line from package.json ("vue-cli-plugin-vuedock": "file:/vuedock") E.g:
docker build --target build -t vueapp .
docker run --rm vueapp yarn test:unit
```

### CI

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

# Build generated dockerfiles
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
vuedock docker build --target build -t vueapp .

# Run default Vue unit tests
docker run --rm vueapp yarn test:unit

# Try building prod container
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
