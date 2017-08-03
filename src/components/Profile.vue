<template>
  <div class="profile" @click="aaa">
    fafawfefaw<br>
    fafawfefaw<br>
    fafawfefaw<br>
    fafawfefaw<br>
    fafawfefaw<br>
    fafawfefaw<br>
    fafawfefaw<br>
  </div>
</template>

<script>

export default {
  name: 'profile',
  data () {
    return {

    }
  },
  methods: {
    aaa: function () {
      window.location.href = '../../static/a.html'
      console.log(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.profile {
  height: 100%;
  height: 100%;
}
</style>
