<template>
  <div class="index">
    <searchbar></searchbar>
    <div class="main-tab"><tab></tab></div>
  </div>
</template>

<script>
import Searchbar from './Searchbar'
import Tab from './Tab'

export default {
  name: 'index',
  components: {
    Searchbar,
    Tab
  },
  data () {
    return {
    }
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

a {
  color: #42b983;
}

.index {
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.main-tab {
  position: fixed;
  left: 0;
  top: 4rem;
  width: 100%;
  z-index: 1;
}

</style>
