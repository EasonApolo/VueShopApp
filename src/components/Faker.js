function Faker () {
}
Faker.prototype = {
  getAuto: function (key) {
    if (key.length > 15) {
      return []
    }
    return Array.apply(null, Array(this.ran(20))).map(() => {
      return key + this.ranC(this.ran(6, 1))
    })
  },
  ran: function (range, start = 0) {
    return Math.floor(Math.random() * range) + start
  },
  ranC: function (bit = 1) {
    let ret = ''
    for (let i = 0; i < bit; i++) {
      ret += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
    return ret
  }
}

export default Faker
