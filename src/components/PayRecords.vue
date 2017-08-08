<template>
  <div class="pay-records">
    <div id="top">
      <div id="back" @click="back"></div>
      <div id="text">支付记录</div>
    </div>
    <div id="payinfo">
      <div v-for="(item, index) in data" :key="index">
        <div class="title" v-if="item.tag !== undefined">{{item.tag}}</div>
        <div class="info">
          <div class="week">{{item.day}}</div>
          <div class="day">{{item.date}}</div>
          <div class="img"><img class="img1" :src="item.imgSrc"></div>
          <div class="money">{{item.money}}</div>
          <div class="seller">{{item.seller}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'payrecords',
  props: [],
  components: {
  },
  data () {
    return {
      data: [
        {day: '周日', date: '2017-08-06', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-05', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-02', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-07-24', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-07-21', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-06-09', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-06', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-06', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-06', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-06', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'},
        {day: '周日', date: '2017-08-06', imgSrc: require('./assets/wallet.png'), money: '-2.00', seller: '天猫超市'}
      ]
    }
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
    }
  },
  mounted () {
    let cur = new Date()
    let curDate = cur.getDate()
    let curMonth = cur.getMonth()
    let curYear = cur.getFullYear()
    let lastTag = 'lastTag'
    let thisTag = 'thisTag'
    for (let i = 0; i < this.data.length; i++) {
      let date = new Date(this.data[i].date)
      if (date.getDate() === curDate && date.getMonth() === curMonth && date.getFullYear() === curYear) {
        this.data[i].day = '今天'
      } else if (date.getDate() + 1 === curDate && date.getMonth() === curMonth && date.getFullYear() === curYear) {
        this.data[i].day = '昨天'
      }
      if (date.getMonth() === curMonth && date.getFullYear() === curYear) {
        thisTag = '本月'
      } else if (date.getFullYear() === curYear) {
        thisTag = (date.getMonth() + 1) + '月'
      } else {
        thisTag = date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
      }
      if (thisTag !== lastTag) {
        lastTag = thisTag
        this.data[i].tag = thisTag
      }
      console.log(this.data[i].tag)
      this.data[i].date = this.data[i].date.slice(5)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchData()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.no-record {
  width: 100%;
}
a {
  color: #42b983;
}
.pay-records {
  position: relative;
  height: 100%;
  background-color: white;
  text-align: left;
  z-index: 1;
}
#payinfo {
  position: absolute;
  width: 100%;
  height: calc(100% - 55px);
  overflow: scroll;
}
#top{
    position: relative;
    background-color:#FA5876;
    height: 3rem;
}
#back{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: 0.75rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#text{
    position: absolute;
    top: 0rem;
    width: 100%;
    line-height: 3rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
.title {
  display: inline-block;
  margin-bottom: -1px;
  width: calc(100% - 1rem);
  height: 2rem;
  line-height: 2rem;
  padding-left: 1rem;
  background-color: #F5F5F9;
}
.info{
  position: relative;
  padding-left: 1rem;
  height: 4rem;
  border-top: 1px #E8E8E8 solid;
}
.week{
    height: 30px;
    padding-top: 7px;
    color: #b2b2b2;
}
.day{
    height: 30px;
    color: #b2b2b2;
    font-size:0.875rem;
}
.img{
    position: absolute;
    left: 5rem;
    top: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}
.img1{
    width: 40px;
    height:40px;
    border-radius: inherit;
}
.money{
    position: absolute;
    top: 0.75rem;
    left:140px;
    font-size: 1.25rem;
    line-height: 1.25rem;
}
.seller{
    position: absolute;
    top: 2.5rem;
    left:140px;
    font-size:0.75rem;
    line-height: 0.75rem;
}
</style>
