/* eslint-disable no-param-reassign */
const fs = require('fs');

module.exports = (api, options) => {
  // Detect which E2E (if any) are enabled
  options.hasNightwatch = api.hasPlugin('e2e-nightwatch');
  options.hasCypress = api.hasPlugin('e2e-cypress');

  // At present if yarn is not used then it must be NPM.
  options.usesYarn = fs.existsSync('./yarn.lock');

  api.render('./template/default', options);
  if (options.hasNightwatch) api.render('./template/e2e-nightwatch', options);
  if (options.addDgossTests) api.render('./template/dgoss', options);
};
