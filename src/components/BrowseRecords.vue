<template>
  <div class="browserecords">
    <div id="top">
        <div id="back" @click="back"></div>
        <div id="text">我的浏览</div>
        <div id="clear" @click="deleteData"></div>
    </div>
    <div id="choose">
        <div id="shangpin" @click="show = 0" :class="{active: show === 0}">商品</div>
        <div id="dianpu" @click="show = 1" :class="{active: show === 1}">店铺</div>
        <div id="indicator" :style="{left: indicatorLeft}"></div>
    </div>
    <div id="content">
    <div id="goods" v-show="show === 0">
      <div class="no-record" v-show="data.length === 0">啊哦，这里空空如也,<br>快去浏览一下优惠商品吧~</div>
      <div class="goods_records" v-for="(item, index) in data" :key="index">
          <div class="img_goods"><img id="img1" :src="item.imgUrl"></div>
          <div class="goods_name">{{item.name}}</div>
          <div class="price">{{item.price}}</div>
          <div class="sales">月销：{{item.volume}}</div>
      </div>
    </div>
    <div id="shop" v-show="show === 1">
        <div class="shop_records">
            <div class="img_shop"><img id="img2"src="img/shop1.jpg"></div>
            <div class="shopname">男装旗舰店</div>
            <div class="shopitem1">
                <div class="miaoshu">宝贝描述</div>
                <div class="star1">
                  <img class="backstar" :src="backStar">
                  <img class="frontstar" :src="frontStar">
                </div>
                <div class="score1">5</div>
            </div>
            <div class="shopitem2">
                <div class="maijia">卖家服务</div>
                <div class="star2">
                  <img class="backstar" :src="backStar">
                  <img class="frontstar" :src="frontStar">
                </div>
                <div class="score1">5</div>
            </div>
            <div class="shopitem3">
                <div class="wuliu">物流服务</div>
                <div class="star3">
                  <img class="backstar" :src="backStar">
                  <img class="frontstar" :src="frontStar">
                </div>
                <div class="score1">5</div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'browserecords',
  props: [],
  components: {
  },
  data () {
    return {
      data: [],
      show: 0,
      frontStar: require('./assets/frontstar.png'),
      backStar: require('./assets/backstar.png')
    }
  },
  computed: {
    indicatorLeft: function () {
      return 'calc(' + (this.show * 50 + 25) + '% - 2rem)'
    }
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
      this.data = JSON.parse(localStorage.browseHistory)
    },
    deleteData: function () {
      this.data = []
      localStorage.browseHistory = '[]'
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
.browserecords {
  position: relative;
  height: 100%;
  z-index: 1;
  text-align: left;
}
.no-record {
  position: absolute;
  top: 30%;
  width: 100%;
  color: #AAA;
  text-align: center;
}
a {
  color: #42b983;
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
    top: .75rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#text{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6.4rem;
    line-height: 3rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
#clear {
    position: absolute;
    right: 0.5rem;
    top: .625rem;
    background-image: url(./assets/dump2.png);
    width: 1.75rem;
    height: 1.75rem;
    background-size: contain;
    background-repeat: no-repeat;
}
#choose{
    position: relative;
    height: 2rem;
}
.active {
  color: #42b983;
}
#indicator {
  position: absolute;
  box-sizing: border-box;
  width: 4rem;
  height: 2px;
  left: 0;
  bottom: 0;
  background-color: #42b983;
  transition: .3s ease-in-out;
}
#shangpin{
    position:absolute;
    width:50%;
    top:5px;
    text-align: center;
}
#dianpu{
    position:absolute;
    left:50%;
    top:5px;
    width: 50%;
    text-align: center;
}
#content{
    position: absolute;
    width: 100%;
    top: 5rem;
    bottom: 0px;
    background-color: #F0F0F0;
}
#goods{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #F0F0F0;
    overflow: scroll;
    z-index: 1;
}
.goods_records {
    position: relative;
    width: 100%;
    height: 128px;
    border-bottom: 1px #eee solid;
    background-color: white;
}
.img_goods{
    position: absolute;
    left:8px;
    top:8px;
    width:112px;
    height: 112px;
}
#img1{
    width: 112px;
    height: 112px;
}
.goods_name{
    position: absolute;
    left:128px;
    top:8px;
}
.price{
    position: absolute;
    left:128px;
    bottom: .5rem;
    color: #FA5876;
    font-size: 1.25rem;
    
    &:before {
        content: '￥';
        font-size: 1rem;
    }
}
.sales{
    position: absolute;
    right: .5rem;
    bottom: .5rem;
    color: #BBB;
    font-size: .875rem;
}

#shop{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    background-color: white;
    z-index: 0;
}
.shop_records{
    position: relative;
    height:128px;
    border-bottom: 1px #eee solid;
}
.img_shop{
    position: absolute;
    left:8px;
    top:8px;
    width:112px;
    height: 112px;
}
#img2{
    width: 112px;
    height: 112px;
}
.shopname{
    position: absolute;
    left: 128px;
    top:8px;
}
.shopitem1,.shopitem2,.shopitem3{
    position: absolute;
    width: 300px;
    height: 20px;
    left:128px;
    top:40px;
}
.shopitem2{
    top:70px;
}
.shopitem3{
    top:100px;
}
.miaoshu,.maijia,.wuliu{
    font-size: 0.875rem;
    width: 80px;
    height: 20px;
}
.star1,.star2,.star3{
    position:absolute;
    left:80px;
    top:2px;
}
.backstar{
    position: absolute;
    width:70px;
    height:14px;
}
.frontstar{
    position: absolute;
    width:70px;
    height: 14px;
}
.score1{
    position: absolute;
    left: 160px;
    top:2px;
    font-size: 0.875rem;
}
</style>
