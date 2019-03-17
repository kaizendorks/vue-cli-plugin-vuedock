// Update default vue-cli-plugin-e2e-nightwatch options: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch
// With these updated settings, nightwatch wont attempt to start a selenium server
// and instead will use the selenium-chrome docker image.

// For additional nightwatch settings see: http://nightwatchjs.org/gettingstarted#settings-file

module.exports = {
  output_folder: 'tests/e2e/reports',

  selenium: {
    log_path: 'tests/e2e/reports/',
    // eslint-disable-next-line no-unneeded-ternary
    start_process: process.env.SELENIUM_HOST ? false : true,
    start_session: true,
    debug: false,
    host: process.env.SELENIUM_HOST || '127.0.0.1',
    port: process.env.SELENIUM_PORT || 4444,
  },

  test_settings: {
    default: {
      launch_url: process.env.LAUNCH_URL || 'http://localhost:8080',
      selenium_host: process.env.SELENIUM_HOST || '127.0.0.1',
      selenium_port: process.env.SELENIUM_PORT || 4444,
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'tests/e2e/reports/screenshots',
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
