<template>
  <div class="jindong">
  </div>
</template>

<script>
import Tab from './Tab'

export default {
  name: 'jindong',
  props: ['cpntId'],
  components: {
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
</style>
