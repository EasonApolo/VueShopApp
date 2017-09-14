<template>
  <div id="app">
    <transition name="shake-in">
      <div class="notification" v-show="notiShow">{{notiInfo}}</div>
    </transition>
    <keep-alive exclude="'detail'">
      <router-view :key="$route.path"></router-view>
    </keep-alive>
    <tabfooter></tabfooter>
  </div>
</template>

<script>
import Tabfooter from './components/Tabfooter'

export default {
  name: 'app',
  components: {
    Tabfooter
  },
  data () {
    return {
      notiShow: false,
      notiInfo: ''
    }
  },
  methods: {
    showNotification: function (info, time = 3000) {
      if (!this.notiShow) {
        this.notiShow = true
        this.notiInfo = info
        setTimeout(() => {
          this.notiShow = false
        }, time)
      }
    }
  },
  mounted () {
    this.$root.eventHub.$emit('pushToIndex')
    this.$root.eventHub.$on('showNotification', this.showNotification)
  }
}
</script>

<style lang='scss'>
html, body {
  overflow: hidden;
}

body * {
  max-height: 999999px;   // overflow在hidden和scroll切换的时候字体会自动改变，可以用这个方法解决.
}

body {
  margin: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
a, img, button, input, textarea, div, li {
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  font-size: 1rem;
}

.notification {
  position: absolute;
  display: inline-block;
  padding: 0 0.5rem;
  top: 38.2%;
  left: 50%;
  height: 2rem;
  line-height: 2rem;
  transform: translateX(-50%);
  background-color: black;
  opacity: 0.5;
  color: white;
  z-index: 999;
  border-radius: 0.5rem;
}

.shake-in-enter-active {
  animation: shake .6s;
}

@keyframes shake
{
from {transform: translateX(calc(-50% + 0));}
10% {transform: translateX(calc(-50% - 1rem));}
30% {transform: translateX(calc(-50% + 1rem));}
50% {transform: translateX(calc(-50% - 1rem));}
80% {transform: translateX(calc(-50% + 1rem));}
to {transform: translateX(calc(-50% + 0));}
}

@-moz-keyframes shake /* Firefox */
{
from {transform: translateX(0);}
10% {transform: translateX(-5px);}
30% {transform: translateX(5px);}
50% {transform: translateX(-5px);}
80% {transform: translateX(5px);}
to {transform: translateX(0);}
}

@-webkit-keyframes shake /* Safari 和 Chrome */
{
from {transform: translateX(0);}
10% {transform: translateX(-5px);}
30% {transform: translateX(5px);}
50% {transform: translateX(-5px);}
80% {transform: translateX(5px);}
to {transform: translateX(0);}
}

@-o-keyframes shake /* Opera */
{
from {transform: translateX(0);}
10% {transform: translateX(-5px);}
30% {transform: translateX(5px);}
50% {transform: translateX(-5px);}
80% {transform: translateX(5px);}
to {transform: translateX(0);}
}
</style>
