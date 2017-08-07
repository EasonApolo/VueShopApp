<template>
  <div class="point-page">
    <div class="point-manage">
        <div class="top">
            <div id="point">积分管理</div>
            <div id="back" @click="back"></div>
        </div>
    </div>


    <!--个人积分栏-->
    <div class="mypoint">
        <div class="user_head"><img id="img" :src="avatar"></div>
        <div class="user_id">用户ID</div>
    </div>
    <!--我的资产-->
    <div class="myassets">
        <div class="item">我的资产</div>
        <div class="row">
            <div class="col">
                <span class="amount">0</span>
                <span class="title">金币</span>
            </div>
            <div class="col">
                <span class="amount">0</span>
                <span class="title">碎银子</span>
            </div>
            <div class="col">
                <span class="amount">0</span>
                <span class="title">积分</span>
            </div>
        </div>
    </div>

    <!--我的关注-->
    <div class="attention">
        <div class="item">我的关注</div>
        <div class="row">
            <div class="col">
                <span class="amount">0</span>
                <span class="title">粉丝</span>
            </div>
            <div class="col">
                <span class="amount">0</span>
                <span class="title">关注</span>
            </div>
        </div>
    </div>
    <div class="pointitem">
        <div class="item1">积分兑换</div>
        <div class="item2">兑换记录</div>
        <div class="item3">。。。。</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'pointpage',
  props: [],
  components: {
  },
  data () {
    return {
      avatar: require('./assets/user_center_default_head.png')
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
.point-page {
    position: relative;
    height: 100%;
    background-color: white;
    text-align: left;
    z-index: 1;
}
.top{
    position: relative;
    background-color:#FA5876;
    height:100px;
}
#back{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: 1.5rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#point{
    position: absolute;
    padding-top: 20px;
    width: 100%;
    line-height: 2rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
.mypoint{
    position: relative;
    height:60px;
}
.user_head {
    position: absolute;
    left: 10px;
    top: -20px;
    width: 70px;
    height:70px;
    border: 1px solid #e0e0e0;
    padding: 1px;
    background: #fff;
    border-radius: 50%;
}
#img{
    width:100%;
    border-radius: 50%;
}

.mypoint{
    position: relative;
    height:60px;
    /*border-bottom:1px solid #e0e0e0;*/
}
.user_id{
    position:absolute;
    padding-top: 35px;
    padding-left: 100px;
    display: inline;
}

.myassets,.attention{
    position: relative;
    border:1px solid #e0e0e0;
    border-radius: 5px;
    height:80px;
}
.item{
    position: absolute;
    padding-top:10px;
    width: 100%;
    height:30px;
    text-align: center;
    border-bottom: 1px dashed #e0e0e0;
}
.row{
    position:absolute;
    width:100%;
    padding-top: 50px;
    display: -webkit-box;
    display: -webkit-flex;
}
.col{
    -webkit-box-flex:1;
    -webkit-flex:1;
    flex:1;
    text-align:center;
    border-right:1px dashed #e0e0e0;
}
.amount{
    font-size: 0.9rem;
    color: #FA5876;
}

.pointitem{
    background-color: #fff;
    margin: 10px;
    border: 1px solid #d2d2d2;
    border-radius:5px;
}
.pointitem div {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    border-bottom: 1px solid #d2d2d2;
}
</style>
