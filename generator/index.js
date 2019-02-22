module.exports = (api) => {
  const hasNightwatch = api.hasPlugin('e2e-nightwatch');

  const options = {
    // TODO: e2e-cypress
    hasNightwatch
  };

  api.render('./template/default', options);
  if (hasNightwatch) api.render('./template/e2e-nightwatch', options);
};