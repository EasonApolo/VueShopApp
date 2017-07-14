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
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
