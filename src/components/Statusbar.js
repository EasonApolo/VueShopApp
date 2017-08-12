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
  toGrey: function () {
    /* eslint-disable no-undef */
    if (typeof window.sb !== 'undefined') {
      StatusBar.backgroundColorByHexString('#AAAAAA')
    }
  },
  toDefault: function () {
    /* eslint-disable no-undef */
    if (typeof window.sb !== 'undefined') {
      if (navigator.userAgent.indexOf('Android') !== -1) {
        StatusBar.backgroundColorByHexString('#AAA')
      } else {
        StatusBar.styleDefault()
      }
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
