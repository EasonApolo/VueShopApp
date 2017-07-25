<template>
  <div class="tabfooter" @touchmove.prevent>
    <ul class="bottom">
      <li class="active">
        <router-link to="/index">Index</router-link>
      </li><li>
        <router-link to="/#">#</router-link>
      </li><li>
        <router-link to="/personal">Personal</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tabfooter',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabfooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
}

ul {
  margin: 0;
  list-style-type: none;
}
.bottom {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border-top: 1px solid #EEE;
  background-color: #F8F7F3;
}

li {
  margin: 0;
  width: 33%;
  line-height: 3rem;
  display: inline-block;
}

a {
  color: #42b983;
  text-decoration: none;
}
.router-link-active {
  color: #027943;
}
</style>
