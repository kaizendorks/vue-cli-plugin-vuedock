// Update default vue-cli-plugin-e2e-nightwatch options: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch
// With these updated settings, nightwatch wont attempt to start a selenium server
// and instead will use the selenium-chrome docker image

module.exports = {
  selenium: {
    // eslint-disable-next-line no-unneeded-ternary
    start_process: process.env.SELENIUM_HOST ? false : true,
    start_session: true,
    host: process.env.SELENIUM_HOST || '127.0.0.1',
    port: process.env.SELENIUM_PORT || 4444,
  },

  test_settings: {
    default: {
      launch_url: process.env.LAUNCH_URL || 'http://localhost:8080',
      selenium_port: process.env.SELENIUM_PORT || 4444,
      selenium_host: process.env.SELENIUM_HOST || 'localhost',
      silent: true,
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
