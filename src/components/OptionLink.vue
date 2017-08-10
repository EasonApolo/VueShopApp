<template>
  <div class="optionlink">
    <ul class="ol-box">
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg1 + ')'}"></div></li>
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg2 + ')'}"></div></li>
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg3 + ')'}"></div></li>
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg4 + ')'}"></div></li>
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg1 + ')'}"></div></li>
    </ul>
  </div>
</template>

<script>
import Dummy from './Dummy'

export default {
  name: 'optionlink',
  props: ['cpntId'],
  components: {
  },
  data () {
    return {
      bg1: Dummy.prototype.get(),
      bg2: Dummy.prototype.get(),
      bg3: Dummy.prototype.get(),
      bg4: Dummy.prototype.get()
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
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
}

a {
  color: #42b983;
}

.optionlink {
  margin-bottom: 0.625rem;
}

.ol-box {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  padding-bottom: 1px;
  overflow: hidden;
  background-color: white;
}

.ol-item {
  flex: 0 0 calc(33.33% - 1px);
  margin-right: -1px;
  margin-bottom: -1px;
  $borderColor: #EEE;
  border: 1px solid $borderColor;
  position: relative;
  vertical-align: middle;
  
  &::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
    width: .1px;
    vertical-align: middle;
  }

  .ol-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
