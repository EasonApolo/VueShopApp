<template>
  <div class="index">
    <searchbar></searchbar>
    <div class="main-tab">
      <tab :choosen="choosenTabs" :recommend="recommendTabs" :cpntId="mainCpntId"></tab>
    </div>
  </div>
</template>

<script>
import Searchbar from './Searchbar'
import Tab from './Tab'

export default {
  name: 'index',
  components: {
    Searchbar,
    'tab': Tab
  },
  data () {
    return {
      mainCpntId: 'l11',
      choosenTabs: [
        {index: 0, name: '淘宝', default: true, component: 'taobao', cpntId: 'l21'},
        {index: 1, name: '京东', default: true, component: 'jindong', cpntId: 'l22'}
      ],
      recommendTabs: [
        {index: 0, name: '唯品会', default: false, component: 'weipinghui', cpntId: 'l23'}
      ]
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
  position: absolute;
  top: 0;
  bottom: 3rem;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.main-tab {
  position: absolute;
  top: 4rem;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

</style>
