<template>
  <div class="setting">
    <div id="top">
      <div id="back" @click="back"></div>
      <div id="text">设置</div>
    </div>
    <div class="part">
      <div class="signout" @click="signOut" :class="{disabled: !loginOk}">退出当前账号</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'setting',
  props: ['loginOk'],
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
    back: function () {
      this.$root.eventHub.$emit('closeSetting')
    },
    fetchData: function () {
    },
    signOut: function () {
      if (localStorage.userInfo !== undefined && localStorage.userInfo !== null) {
        delete localStorage.userInfo
        this.$root.eventHub.$emit('updateUserInfo')
        this.$root.eventHub.$emit('closeSetting')
      }
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
.setting {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #F4F4F4;
    text-align: left;
    z-index: 1;
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
    width: 100%;
    line-height: 3rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}

.part {
  margin-bottom: .5rem;
  background-color: white;

  .row {
    line-height: 2.5rem;
    height: 2.5rem;
  }

  .signout {
    height: 2.75rem;
    line-height: 2.875rem;
    color: #FA5876;
    text-align: center;
  }

  .disabled {
    color: #AAA;
  }
}
</style>
