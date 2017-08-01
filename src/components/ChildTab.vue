<template>
  <div class="tab" :id="cpntId">
    <div class="tab-more" @click="toggleFullpage(true)"></div>
    <div class="tab-container"
      @touchstart="tabbarTouchstart($event)"
      @touchmove="tabbarTouchmove($event)">
      <ul class="tab-bar" :style="{width:tabbarWidth}">
        <div class="tab-indicator" :style="{left: indicatorLeft}"></div>
        <li class="tab-front" v-for="(item, index) in choosenTabs" :key="index"
          @click="forwardTo(index, $event)" :style="{width:frontTabWidth}">
          {{item.name}}
        </li>
      </ul>
    </div>
    <transition name="slide-fade">
      <div class="fullpage" v-if="fullpageshow">
        <div class="fullpage-close" @click="toggleFullpage(false)"></div>
        <div class="tab-choosen">
          <p class="fullpage-title">我的分类</p>
          <transition-group name="flip-list" class="tab-list">
            <li class="tab-option" 
              v-for="(item, index) in choosenTabs" :key="item" :itemindex="index"
              :class="{defaultTab: item.default}" 
              @touchstart.stop.prevent="tabTouchstart(index, $event)" 
              @touchmove.stop.prevent="tabTouchmove($event)"
              @touchend.stop.prevent="tabTouchend(index, $event)">
              {{item.name}}
              <div :class="{tabDelete: !item.default}" @touchstart.stop="deleteTab(index)"></div>
            </li>
          </transition-group>
          <div class="tab-option virtual-tab" v-if="virtual.show"
            :style="{left: virtual.x, top: virtual.y}">
            {{choosenTabs[virtual.index].name}}
          </div>
        </div>
        <div class="tab-recommend">
          <p class="fullpage-title">推荐分类</p>
          <ul class="tab-list">
            <li class="tab-option" v-for="(item, index) in recommendTabs" :key="item" @click="addTab(index)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="content" :style="{width: contentWidth, left: contentTransform}" :class="{trans:untouching}">
      <div class="page" v-for="(item, index) in choosenTabs" :key="index" :style="{width: pageWidth}" :class="{scrollable:scrollable}"
        @touchstart="touchstart($event)"
        @touchmove="touchmove($event)"
        @touchend="touchend($event)">
        <div class="pagewrapper" :is="item.component" :cpntId="item.cpntId" :sonScrollable="sonScrollable"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Advice from './Advice'

export default {
  name: 'tab',
  props: {'choosen': {}, 'recommend': {}, 'cpntId': {}, 'scrollable': {type: Boolean, default: true}},
  data () {
    return {
      curPage: 0,
      startX: 0,
      curX: 0,
      scrollLen: 0,
      verticalScroll: false,
      fullpageshow: false,
      virtualIndex: 0,
      virtual: {
        index: 0,
        show: false,
        x: 0,
        y: 0
      },
      untouching: true,
      firstTouchmove: false,
      choosenTabs: this.choosen,
      recommendTabs: this.recommend,
      sonScrollable: false,
      tabbar: {
        x: 0,
        y: 0,
        firstTouchmove: false,
        isVertical: true
      }
    }
  },
  components: {
    Advice
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
    },
    contentTransform: function () {
      return this.curX + this.scrollLen + 'px'
    }
  },
  methods: {
    add: function (component, text) {
      this.items.push({
        'component': component,
        'text': text
      })
    },
    toggleFullpage: function (bool) {
      this.fullpageshow = bool
    },
    deleteTab: function (index) {
      if (this.choosenTabs[index].default) return
      if (index === this.curPage) this.forwardTo(0)
      this.recommendTabs = this.recommendTabs.concat(this.choosenTabs.splice(index, 1))
    },
    addTab: function (index) {
      this.choosenTabs = this.choosenTabs.concat(this.recommendTabs.splice(index, 1))
    },
    touchstart: function (e) {
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
      this.verticalScroll = false
      this.untouching = false
      this.firstTouchmove = true
    },
    touchmove: function (e) {
      // 通过父tab滑动的距离设置子tab是否可以滑动
      let top = e.currentTarget.scrollTop
      let sonH = e.currentTarget.firstChild.offsetHeight
      if (top >= sonH) {
        this.sonScrollable = true
      } else if (top <= sonH) {
        this.sonScrollable = false
      }
      let scrollX = e.touches[0].pageX - this.startX
      if (this.firstTouchmove) {
        this.firstTouchmove = false
        if (Math.abs(e.touches[0].pageY - this.startY) > Math.abs(scrollX)) {
          this.verticalScroll = true
          return
        }
      }
      if (!this.verticalScroll) {
        this.scrollLen = scrollX
        e.preventDefault()
        e.stopPropagation()
      }
      if (this.cpntId === 'l11') {
        e.stopPropagation()
      }
    },
    touchend: function (e) {
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      if (this.verticalScroll) {
        let top = e.currentTarget.scrollTop
        let sonH = e.currentTarget.firstChild.offsetHeight
        if (top >= sonH - 80 && top < sonH) {
          var TWEEN = require('@tweenjs/tween.js')
          var tween = new TWEEN.Tween({x: e.currentTarget.scrollTop, y: e.currentTarget})
          .to({x: sonH}, 200)
          .onUpdate(function () {
            this.y.scrollTop = this.x
          })
          tween.start()
          requestAnimationFrame(animate)
          this.sonScrollable = true
        }
      }
      if (this.scrollLen > document.body.clientWidth / 4) {
        if (this.curPage > 0) {
          this.curPage--
        }
      } else if (this.scrollLen < -(document.body.clientWidth / 4)) {
        if (this.curPage < this.choosenTabs.length - 1) {
          this.curPage++
        }
      }
      this.untouching = true
      this.scrollLen = 0
      this.curX = -this.curPage * document.body.clientWidth
    },
    forwardTo: function (index) {
      if (index !== this.curPage) {
        this.curPage = index
        this.curX = -this.curPage * document.body.clientWidth
      }
    },
    tabTouchstart: function (index, $event) {
      if (this.choosenTabs[index].default) {
        return
      }
      this.virtual.show = true
      this.virtual.x = $event.changedTouches[0].pageX + 'px'
      this.virtual.y = $event.changedTouches[0].pageY + 'px'
      this.virtual.index = index
    },
    tabTouchmove: function ($event) {
      this.virtual.x = $event.changedTouches[0].pageX + 'px'
      this.virtual.y = $event.changedTouches[0].pageY + 'px'
    },
    tabTouchend: function (index, $event) {
      this.virtual.show = false
      this.$nextTick(function () {
        let curMouseOn = document.elementFromPoint($event.changedTouches[0].clientX, $event.changedTouches[0].clientY)
        if (curMouseOn !== null && curMouseOn.hasAttribute('itemindex')) {
          let onIndex = curMouseOn.getAttribute('itemindex')
          if (index !== onIndex) {
            if (!this.choosenTabs[onIndex].default && !this.choosenTabs[index].default) { // 只有要插入位置的标签不是默认的才可以
              this.choosenTabs.splice(onIndex, 0, this.choosenTabs.splice(index, 1)[0])
            }
          }
        } else {
          return
        }
      })
    },
    tabbarTouchstart: function ($event) {
      let bar = this.tabbar
      bar.x = $event.touches[0].pageX
      bar.y = $event.touches[0].pageY
      bar.firstTouchmove = true
      bar.isVertical = true
    },
    tabbarTouchmove: function ($event) {
      let abs = Math.abs
      let bar = this.tabbar
      if (bar.firstTouchmove) {
        if (abs($event.touches[0].pageX - bar.x) > abs($event.touches[0].pageY - bar.y)) {
          bar.isVertical = false
        }
        bar.firstTouchmove = false
      }
      if (!bar.isVertical) {
        $event.stopPropagation()
      }
    }
  },
  beforeCreate: function () {
    //  避免循环引用，在beforeCreate钩子这里动态引入。
    this.$options.components.Taobao = require('./Taobao.vue')
    this.$options.components.Jindong = require('./Jindong.vue')
    this.$options.components.Weipinghui = require('./Weipinghui.vue')
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
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  
  $margin: 0.5rem; //通过此变量调节“+”的大小
  .tab-more {
    position: absolute;
    top: 0;
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
      background-image: url(./assets/tabmore.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .tab-container {
    position: absolute;
    width: calc(100% - 2rem);
    overflow: scroll;
  }

  .tab-bar {
    position: relative;
    width: $frontTabNum * 20%;
    min-width: 100%;
    height: 2rem;
    line-height: 2rem;
      
    .tab-indicator {
      position: absolute;
      margin: 0 calc($temp - 6rem);
      left: 0;
      bottom: 0;
      width: 3rem;
      height: 0.125rem;
      background-color: #FA5876;
      transition: 0.3s
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
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
    z-index: 999;

    .fullpage-close {
      position: absolute;
      $margin: 0.3rem;
      top: 1rem + $margin;
      right: 0 + $margin;
      width: 2rem - 2 * $margin;
      height: 2rem - 2 * $margin;
      background-image: url('./assets/close.png');
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
        background-image: url(./assets/delete.png);
        background-size: contain;
        background-repeat: no-repeat;
      }

      .defaultTab {
        color: gray;
      }

      .virtual-tab {
        position: fixed;
        opacity: 0.5;
        transform: translateX(-50%) translateY(-50%);
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

    .flip-list-move {
      transition: 0.2s;
    }
  }

  .show {
    top: 0;
  }

  .trans {
    transition: 0.3s;
  }

  .scrollable {
    overflow: scroll !important;
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(20px);
    opacity: 0;
  }

  .content {
    position: absolute;
    top: 2rem;
    left: 0;
    bottom: 0;
    width: 200%;

    .page {
      position: relative;
      display: inline-block;
      width: 50%;
      height: 100%;
      vertical-align:top;
      overflow: hidden;
      background-color: #EEEEEE;
      transition: 1s;

      .pageWrapper {
        position: relative;
      }
    }
  }
}

</style>
