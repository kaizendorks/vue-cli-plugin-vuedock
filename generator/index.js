module.exports = (api, options) => {
  options.hasNightwatch = api.hasPlugin('e2e-nightwatch');

  api.render('./template/default', options);
  if (options.hasNightwatch) api.render('./template/e2e-nightwatch', options);
  if (options.addDgossTests) api.render('./template/dgoss', options);
};
