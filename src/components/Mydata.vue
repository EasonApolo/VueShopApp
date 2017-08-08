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
  padding-top: 1rem;
}
#back{
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  left: 1rem;
  top: 1.75rem;
  z-index: 1;
  background-image: url(./assets/back.png);
  background-size: contain;
  background-repeat: no-repeat;
}
#text{
  position: absolute;
  top: 1rem;
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
  width: 100%;
  height:50px;
  border: 1px solid #e3e3e3;
}
.t{
  position: absolute;
  padding-top:12px;
  left:10px;
}
</style>
