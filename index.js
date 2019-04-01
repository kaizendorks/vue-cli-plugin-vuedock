module.exports = (api) => {
  // E2E tests inside docker will run in a separated container than the test container
  // They will be available at http://app:8080, so we need to disable the enforcing of localhost
  api.chainWebpack((webpackConfig) => {
    webpackConfig.devServer.disableHostCheck(true);
  });
};
