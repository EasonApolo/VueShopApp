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
        <div class="user_head"><div id="img" :style="{backgroundImage:'url('+user.avatar+')'}"></div></div>
        <div class="user_id">{{user.name}}</div>
        <div class="level"><div class="user_level">{{user.point}}</div></div>
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
        <div class="item3">敬请期待</div>
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
      avatar: require('./assets/user_center_default_head.png'),
      user: {}
    }
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
      this.user = JSON.parse(localStorage.userInfo)
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
    background-color: #f4f4f4;
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
    top: 0.95rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#point{
    position: absolute;
    top:0.7rem;
    width: 100%;
    line-height: 2rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
.mypoint{
    position: relative;
    height:60px;
    background-color: #FFFFFF;
}
.user_head {
    position: absolute;
    left: 10px;
    top: -20px;
    width: 70px;
    height:70px;
    padding: 2px;
    background: #fff;
    border-radius: 50%;
    
    #img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }
}

.mypoint{
    position: relative;
    height:60px;
    /*border-bottom:1px solid #e0e0e0;*/
}
.user_id{
    position:absolute;
    padding-top:5px;
    padding-left: 100px;
    display: inline;
}
.level{
  position: absolute;
  top:25px;
  padding-left: 100px;
  display: inline;
}
.user_level {
  margin-top: 6px;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1rem;
  font-size: 0.875rem;
  width: 1rem;
  background-color: #FD8298;
  border-radius: .5rem;
  color: white;

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 8px;
    width: .75rem;
    height: .75rem;
    background-image: url(./assets/lv.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.myassets,.attention{
    position: relative;
    border-top:1px solid #f4f4f4;
    background-color: #FFFFFF;
    height:80px;
    margin-top: 10px;
}
.attention{
    border-bottom: 1px solid #f4f4f4;
}

.item{
    position: absolute;
    padding-top:10px;
    width: 100%;
    height:30px;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
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
  border-right:1px solid #f4f4f4;
}

.col:last-child {
  border-right: 0;
}

.amount{
    font-size: 0.9rem;
    color: #FA5876;
}

.pointitem{
    background-color: #fff;
    margin-top: 10px;
    border-top: 1px solid #f4f4f4;

}
.pointitem div {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #f4f4f4;
}
</style>
