<template>
  <div class="jindong">
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    <tab :choosen="choosenTabs" :recommend="recommendTabs" :cpntId="cpntId" :scrollable="sonScrollable" :scrollTop="sonScrollTop"></tab> 
  </div>
</template>

<script>
import Tab from './Tab'

export default {
  name: 'jindong',
  props: ['cpntId', 'sonScrollable', 'sonScrollTop'],
  components: {
    Tab
  },
  data () {
    return {
      choosenTabs: [
        {index: 0, name: '精选', default: true, component: 'listview', text: 'test1'},
        {index: 1, name: '女装', default: false, component: 'listview', text: 'text2'},
        {index: 2, name: '家居', default: false, component: 'listview', text: 'text3'},
        {index: 3, name: '数码', default: false, component: 'listview', text: 'text4'},
        {index: 2, name: '运动', default: false, component: 'listview', text: 'test3'}
      ],
      recommendTabs: [
        {index: 0, name: '9块9', default: false, component: 'listview', text: 'test1'},
        {index: 1, name: '绅士', default: false, component: 'listview', text: 'test2'}
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
</style>
