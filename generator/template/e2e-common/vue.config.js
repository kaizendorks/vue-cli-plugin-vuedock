// vue.config.js
module.exports = {
  configureWebpack: {
    devServer: {
      // E2E tests inside docker will run in a separated container than the test container
      // They will be available at http://app:8080, so we need to disable the enforcing of localhost
      disableHostCheck: true,
    },
  },
};
