<template>
  <div class="optionlink">
    <ul class="ol-box">
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg + ')'}"></div></li>
      <li class="ol-item"><div class="ol-bg" :style="{backgroundImage: 'url(' +bg + ')'}"></div></li>
      <li class="ol-item">awefae</li>
      <li class="ol-item">afwefwefwaef</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'optionlink',
  props: ['cpntId'],
  components: {
  },
  data () {
    return {
      bg: require('./assets/S.png')
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

.ol-box {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  padding-bottom: 1px;
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
