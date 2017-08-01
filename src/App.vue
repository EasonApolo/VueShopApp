<template>
  <div id="app">
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
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
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
  z-index: 1;
  font-size: 1rem;
}
</style>
