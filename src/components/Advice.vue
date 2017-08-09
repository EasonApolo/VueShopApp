<template>
  <div class="advice">
    <listview></listview>
  </div>
</template>

<script>
import Listview from './Listview'

export default {
  name: 'advice',
  props: [],
  components: {
    'listview': Listview
  },
  data () {
    return {
    }
  },
  methods: {
    scroll: function () {
      console.log('ba')
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
