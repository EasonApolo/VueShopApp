<template>
  <div class="taobao">
    awefijwoiefjaowiefjoaiw<br>
    awefijwoiefjao<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    45uwqagsdvzrY4Y<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    43TQ344FVJVB<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    awefwaef<br>
    afwefawvz<br>
    weteu4<br>
    5y65u<br>
    <tab :choosen="choosenTabs" :recommend="recommendTabs" :cpntId="cpntId"></tab>
  </div>
</template>

<script>
import Tab from './Tab'

export default {
  name: 'taobao',
  props: ['cpntId'],
  components: {
    Tab
  },
  data () {
    return {
      choosenTabs: [
        {index: 0, name: '精选', default: true, component: 'advice', text: 'test1'},
        {index: 1, name: '女装', default: false, component: 'advice', text: 'text2'},
        {index: 2, name: '家居', default: false, component: 'advice', text: 'text3'},
        {index: 3, name: '数码', default: false, component: 'advice', text: 'text4'},
        {index: 2, name: '运动', default: false, component: 'advice', text: 'test3'}
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
