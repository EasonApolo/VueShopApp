function Statusbar () {
}

Statusbar.prototype = {
  toMain: function () {
    /* eslint-disable no-undef */
    if (Statusbar !== undefined) {
      StatusBar.backgroundColorByHexString('#FA5876')
    }
  },
  toWhite: function () {
    /* eslint-disable no-undef */
    if (Statusbar !== undefined) {
      StatusBar.backgroundColorByHexString('#FFFFFF')
    }
  },
  toDefault: function () {
    /* eslint-disable no-undef */
    if (Statusbar !== undefined) {
      StatusBar.styleDefault()
    }
  },
  toLight: function () {
    /* eslint-disable no-undef */
    if (Statusbar !== undefined) {
      StatusBar.styleLightContent()
    }
  }
}

export default Statusbar
