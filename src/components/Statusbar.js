function Statusbar () {
}

Statusbar.prototype = {
  toMain: function () {
    /* eslint-disable no-undef */
    if (typeof window.sb !== 'undefined') {
      StatusBar.backgroundColorByHexString('#FA5876')
    }
  },
  toWhite: function () {
    /* eslint-disable no-undef */
    if (typeof window.sb !== 'undefined') {
      StatusBar.backgroundColorByHexString('#FFFFFF')
    }
  },
  toDefault: function () {
    /* eslint-disable no-undef */
    if (typeof window.sb !== 'undefined') {
      StatusBar.styleDefault()
    }
  },
  toLight: function () {
    /* eslint-disable no-undef */
    if (typeof window.sb !== 'undefined') {
      StatusBar.styleLightContent()
    }
  }
}

export default Statusbar
