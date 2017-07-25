function Dummy () {
}
Dummy.prototype = {
  get: function () {
    'use strict'
    let size = this.ran(400, 200)
    let bc = this.ran(16777216).toString(16)
    let fc = this.ran(16777216).toString(16)
    return 'https://dummyimage.com/' + size + 'x' + size + '/' + bc + '/' + fc
  },
  ran: function (range, start = 0) {
    return Math.floor(Math.random() * range) + start
  }

}

export default Dummy
