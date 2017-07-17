<template>
  <div id="app">
    <router-view></router-view>
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

<style>
html, body {
  overflow: hidden;
}
body {
  margin: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
a,img,button,input,textarea {
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
}
</style>
