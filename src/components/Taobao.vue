<template>
  <div class="taobao">
    <slider></slider>
    <optionlink></optionlink>
    <tab :choosen="choosenTabs" :recommend="recommendTabs" :cpntId="cpntId" :scrollable="sonScrollable" :scrollTop="sonScrollTop"></tab> 
  </div>
</template>

<script>
import Tab from './Tab'
import OptionLink from './OptionLink'
import Slider from './Slider'

export default {
  name: 'taobao',
  props: ['cpntId', 'sonScrollable', 'sonScrollTop'],
  components: {
    'tab': Tab,
    'optionlink': OptionLink,
    'slider': Slider
  },
  data () {
    return {
      choosenTabs: [
        {index: 0, name: '男装', default: true, component: 'listview', text: '男装', msg: '男装'},
        {index: 1, name: '女装', default: false, component: 'listview', text: 'text2', msg: '女装'},
        {index: 2, name: '手机', default: false, component: 'listview', text: 'text3', msg: '手机'},
        {index: 3, name: '球鞋', default: false, component: 'listview', text: 'text4', msg: '球鞋'},
        {index: 2, name: '连衣裙', default: false, component: 'listview', text: 'test3', msg: '连衣裙'}
      ],
      recommendTabs: [
        {index: 0, name: '风衣', default: false, component: 'listview', text: '风衣', msg: '风衣'},
        {index: 1, name: '果干', default: false, component: 'listview', text: '果干', msg: '果干'}
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
