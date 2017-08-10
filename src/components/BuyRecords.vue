<template>
  <div class="buyrecords">
    <div class="top">
        <div id="text">购买记录</div>
        <div id="back" @click="back"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'buyrecords',
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
.buyrecords {
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
</style>
