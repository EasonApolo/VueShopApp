<template>
  <div class="tabfooter" @touchmove.prevent>
    <ul class="bottom">
      <li class="active">
        <router-link to="/index">今日推荐</router-link>
      </li><li>
        <router-link to="/#">#</router-link>
      </li><li>
        <router-link to="/profile">个人中心</router-link>
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
  },
  methods: {
    pushToDetail: function (pprop) {
      this.$router.push({name: 'detail', query: { iprop: pprop }})
    },
    pushToSearch: function (recommend, recommendIndex) {
      this.$router.push({name: 'search', query: {recommend: recommend, recommendIndex: recommendIndex}})
    },
    pushToBrowseRecords: function () {
      this.$router.push({name: 'browse_records'})
    }
  },
  mounted () {
    this.$root.eventHub.$on('pushToSearch', this.pushToSearch)
    this.$root.eventHub.$on('pushToDetail', this.pushToDetail)
    this.$root.eventHub.$on('pushToBrowseRecords', this.pushToBrowseRecords)
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
  font-size: 0.875rem;
  z-index: 0;
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
  color: #999;
  text-decoration: none;
}
.router-link-active {
  color: #FA4866;
}
</style>
