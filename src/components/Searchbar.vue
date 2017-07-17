<template>
  <div class="search" @touchmove.stop.prevent>
    <div class="searchbar">
      <div class="qscan-entry">
      </div><div class="search-box">
        <input id="search-input" type="text" v-bind:placeholder="recommend"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'searchbar',
  data () {
    return {
      recommend: '只要9块9毛9，爱疯7s带回家'
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

$timeMargin: 1rem;  //时间栏
$barHeight: 3rem;   //除去时间栏的高度
$barMargin: 0.5rem; //搜索框顶距

.search {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 4rem;
  z-index: 1;
}
.searchbar {
  position: relative;
  width: 100%;
  height: $barHeight;
  padding-top: $timeMargin;
  box-shadow: 0 -1rem 0.1rem #AAA;
  font-size: 0.9375rem;
  background-color: #FA5876;
}

$scanmargin: 0.3rem;    //扫一扫图标的边距
$imargin: 0.3rem;       //搜索图标（放大镜🔍）的边距
$scansize: 2rem;
$isize: 2rem;

.qscan-entry {
  position: absolute;
  left: 1rem + $scanmargin;
  top: $timeMargin + $barMargin + $scanmargin;
  width: $scansize - 2 * $scanmargin;
  height: $scansize - 2 * $scanmargin;
  background-image: url(./assets/qscan.png);
  background-size: contain;
  background-repeat: no-repeat;
}

.search-box {
  position: relative;
  margin: $barMargin 4rem 0 4rem;
  height: $barHeight - 2 * $barMargin;
  width: calc(100% - 8rem);
  border-radius: 1rem;
  overflow: hidden;
  font-size: inherit;

  &:before {
    content: "";
    position: absolute;
    left: $imargin;
    top: $imargin;
    width: $isize - 2 * $imargin;
    height: $isize - 2 * $imargin;
    background-image: url(./assets/searchicon.png);
    background-size: contain;
  }

  #search-input {
    width: calc(100% - 4rem);
    height: 100%;
    padding: 0 2rem;
    border: 0;
    background-color: #F0F0F0;
    outline: none;
    font-size: inherit;
  }
}


</style>
