// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default home': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
//      .assert.elementPresent('.hello')
      .assert.containsText('.content h2', 'Welcome!') //intro copy
      .assert.elementCount('img', 1)  //logo
      .end()
  },

  'default email page': function (browser) {

    const devServer = browser.globals.devServerURL
    browser
      .url(devServer + '/#/email/bob@bob.com')
      .waitForElementVisible('#app', 4000)
      .assert.elementPresent('.list')
//      .assert.containsText('.content h2', 'Welcome!')
//      .assert.elementCount('img', 0)
      .end()
  }

}
