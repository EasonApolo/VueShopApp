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
        {index: 0, name: '精选', default: true, component: 'advice', text: 'test1', msg: '00'},
        {index: 1, name: '女装', default: false, component: 'advice', text: 'text2', msg: '11'},
        {index: 2, name: '家居', default: false, component: 'advice', text: 'text3', msg: '22'},
        {index: 3, name: '数码', default: false, component: 'advice', text: 'text4', msg: '33'},
        {index: 2, name: '运动', default: false, component: 'advice', text: 'test3', msg: '44'}
      ],
      recommendTabs: [
        {index: 0, name: '9块9', default: false, component: 'advice', text: 'test1'},
        {index: 1, name: '绅士', default: false, component: 'advice', text: 'test2'}
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
