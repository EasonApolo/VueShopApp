<template>
  <div class="mydata">
    <div class="top">
      <div id="text">个人资料</div>
      <div id="back" @click="back"></div>
    </div>
    <div class="part">
      <div class="white"></div>
      <div class="head">
        <div class="t">头像</div>
        <div class="user_head"></div>
      </div>
      <div class="head">
        <div class="t">昵称</div>
        <div id="name" @click="setnameshow=true">用户名</div>
      </div>
      <div class="head">
        <div class="t">性别</div>
        <div id="sex">男</div>
      </div>
      <div class="head">
        <div class="t">生日</div>
        <div id="birthday">1996-1-1</div>
      </div>
    </div>

    <div class="part">
      <div class="white"></div>
      <div class="head">
        <div class="t">修改密码</div>
      </div>
    </div>
    <div class="setname" v-show="setnameshow">
      <div class="content"><div>请输入用户名</div><div>---------</div></div>
      <div class="close" @click="setnameshow=false">关闭</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mydata',
  props: [],
  components: {
  },
  data () {
    return {
      setnameshow: false
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
.mydata {
  position: relative;
  height: 100%;
  background-color: white;
  text-align: left;
  z-index: 1;
}
.top{
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
  width: 100%;
  line-height: 3rem;
  font-size:1.2rem;
  color: #FFFFFF;
  text-align: center;
}
.white{
  width: 100%;
  height: 15px;
  background-color: #e0e0e0;
}
.head{
  position: relative;
  width: 100%;
  height:55px;
  border: 1px solid #ededed;
}
.t{
  position: absolute;
  padding-top:15px;
  left:10px;
}
.user_head{
  position: absolute;
  width: 41px;
  height: 41px;
  top:7px;
  right: 10px;
  z-index: 1;
  background-image: url(./assets/user_center_default_head.png);
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
}
#name{
  position: absolute;
  padding-top: 15px;
  right: 10px;
  color: #bababa;
}
#sex{
  position: absolute;
  padding-top: 15px;
  right: 10px;
  color: #bababa;
}
#birthday{
  position: absolute;
  padding-top: 15px;
  right: 10px;
  color: #bababa;
}
.setname{
  position: absolute;
  top:0px;
  left:0px;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index:1002;
  overflow: auto;
  text-align: center;
}
.content{
  margin: 0 auto;
  margin-top: 100px;
  height:200px;
  width:75%;
  border:7px solid #FA5876;
  border-radius: 7px;
}
.close{
  margin-top: 50px;
}


</style>
