<template>
  <div class="tab">
    <ul class="tab-bar" :style="{width:tabbarWidth}">
      <div class="tab-indicator" :style="{left: indicatorLeft}"></div>
      <li class="tab-front" v-for="(item, index) in choosenTabs" :key="index" @click="forwardTo(index, $event)" :style="{width:frontTabWidth}">{{item.name}}</li>
      <div class="tab-more" @click="toggleFullpage(true)"></div>
    </ul>
    <div class="fullpage" :class="{show: fullpageshow}">
      <div class="fullpage-close" @click="toggleFullpage(false)"></div>
      <div class="tab-choosen">
        <p class="fullpage-title">我的分类</p>
        <ul class="tab-list">
          <li class="tab-option" v-for="(item, index) in choosenTabs" :key="item" :class="{defaultTab: item.default}">
            {{item.name}}
            <div :class="{tabDelete: !item.default}" @click="deleteTab(index)"></div>
          </li>
        </ul>
      </div>
      <div class="tab-recommend">
        <p class="fullpage-title">推荐分类</p>
        <ul class="tab-list">
          <li class="tab-option" v-for="(item, index) in recommendTabs" :key="item" @click="addTab(index)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="content" :style="{width: contentWidth}">
      <div class="page" v-for="(item, index) in choosenTabs" :key="index" :style="{width: pageWidth}">{{item.name}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  data () {
    return {
      total: 6,
      curPage: 0,
      startX: 0,
      curX: 0,
      scrollLen: 0,
      verticalScroll: false,
      fullpageshow: false,
      choosenTabs: [{index: 0, name: '精选', default: true}, {index: 1, name: '女装', default: false}, {index: 1, name: '家居', default: false}, {index: 1, name: '数码', default: false}, {index: 1, name: '母婴', default: false}, {index: 1, name: '家电', default: false}],
      recommendTabs: [{index: 1, name: '9块9', default: false}, {index: 1, name: '美妆', default: false}, {index: 1, name: '配饰', default: false}, {index: 1, name: '绅士', default: false}, {index: 1, name: '家装', default: false}, {index: 1, name: '运动', default: false}]
    }
  },
  computed: {
    indicatorLeft: function () {
      return 'calc(' + ((this.curPage * 2 + 1) * 50 / this.choosenTabs.length) + '%' + ' - 1.5rem)' // 1.5rem是indicator长度的1/2
    },
    tabbarWidth: function () {
      return 25 * this.choosenTabs.length + '%'
    },
    frontTabWidth: function () {
      return 100 / this.choosenTabs.length + '%'
    },
    contentWidth: function () {
      return 100 * this.choosenTabs.length + '%'
    },
    pageWidth: function () {
      return 100 / this.choosenTabs.length + '%'
    }
  },
  methods: {
    toggleFullpage: function (bool) {
      this.fullpageshow = bool
    },
    deleteTab: function (index) {
      if (this.choosenTabs[index].default) return
      this.recommendTabs = this.recommendTabs.concat(this.choosenTabs.splice(index, 1))
    },
    addTab: function (index) {
      this.choosenTabs = this.choosenTabs.concat(this.recommendTabs.splice(index, 1))
    },
    touchstart: function (e) {
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
      this.verticalScroll = false
    },
    touchmove: function (e) {
      if (this.verticalScroll) return
      if (Math.abs(e.touches[0].pageY - this.startY) > Math.abs(e.touches[0].pageX - this.startX)) {
        this.verticalScroll = true
        return
      }
      this.scrollLen = e.touches[0].pageX - this.startX
      var content = document.querySelector('.content')
      content.style.transform = 'translateX(' + (this.curX + this.scrollLen) + 'px)'
    },
    touchend: function (e) {
      var content = document.querySelector('.content')
      if (this.scrollLen > document.body.clientWidth / 2) {
        if (this.curPage > 0) {
          this.curPage--
        }
      } else if (this.scrollLen < -(document.body.clientWidth / 2)) {
        if (this.curPage < this.choosenTabs.length - 1) {
          this.curPage++
        }
      }
      this.scrollLen = 0
      this.curX = -this.curPage * document.body.clientWidth
      content.style.transform = 'translateX(' + (-this.curPage * document.body.clientWidth) + 'px)'
    },
    forwardTo: function (index) {
      if (index !== this.curPage) {
        this.curPage = index
        var content = document.querySelector('.content')
        content.style.transform = 'translateX(' + (-this.curPage * document.body.clientWidth) + 'px)'
      }
    }
  },
  mounted () {
    var content = document.querySelector('.content')
    content.addEventListener('touchend', this.touchend)
    content.addEventListener('touchmove', this.touchmove)
    content.addEventListener('touchstart', this.touchstart)
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
  margin: 0;
}

li {
  display: inline-block;
}

a {
  color: #42b983;
}

$frontTabNum: 6;
$tabbarHeight: 2rem;

.tab {
  background-color: white;
  width: calc(100% - 2rem);
  overflow: scroll;
  
  .tab-bar {
    position: relative;
    width: $frontTabNum * 20%;
    min-width: 100%;
    height: 2rem;
    line-height: 2rem;
    overflow: hidden;
    z-index: 1;
      
    .tab-indicator {
      position: absolute;
      margin: 0 calc($temp - 6rem);
      left: 0;
      bottom: 0;
      width: 3rem;
      height: 0.125rem;
      background-color: #FA5876;
      transition: 0.2s
    }

    $margin: 0.5rem; //通过此变量调节“+”的大小
    .tab-more {
      position: fixed;
      margin-top: -2rem;
      right: 0;
      width: $tabbarHeight;
      height: $tabbarHeight;
      background-color: white;
      box-shadow: -0.75rem 0rem 0.75rem -0.125rem white;

      &:before {
        content: '';
        position: absolute;
        top: $margin;
        right: $margin;
        width: $tabbarHeight - 2 * $margin;
        height: $tabbarHeight - 2 * $margin;
        background-image: url(../assets/tabmore.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .tab-front {
      display: inline-block;
      width: 100% / $frontTabNum;
    }
  }

  .fullpage {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: #F2F2F2;
    transform: translateY(-100%);
    transition: 0.2s;
    z-index: 2;

    .fullpage-close {
      position: absolute;
      $margin: 0.5rem;
      top: 1rem + $margin;
      right: 0 + $margin;
      width: 3rem - 2 * $margin;
      height: 3rem - 2 * $margin;
      background-image: url('../assets/close.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .tab-choosen {
      margin-top: 4rem;

      .tabDelete {
        content: "";
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        width: 1.2rem;
        height: 1.2rem;
        background-image: url(../assets/delete.png);
        background-size: contain;
        background-repeat: no-repeat;
      }

      .defaultTab {
        color: gray;
      }
    }
    .tab-recommend {
      margin-top: 1rem;
    }
    .fullpage-title {
      font-weight: bold;
    }
    .tab-option {
      position: relative;
      display: inline-block;
      width: 5rem;
      margin: 0.5rem 0.5rem;
      line-height: 2rem;
      border-radius: 0.5rem;
      border: 1px solid #E2E2E2;
      background-color: white;
    }
  }

  .show {
    transform: translateY(0);
  }

  .content {
    position: fixed;
    top: 6rem;
    left: 0;
    bottom: 3rem;
    width: 200%;
    transition: 0.2s;
    z-index: 0;

    .page {
      display: inline-block;
      width: 50%;
      height: 100%;
      vertical-align:top;
      overflow: scroll;
    }
  }
}

</style>
