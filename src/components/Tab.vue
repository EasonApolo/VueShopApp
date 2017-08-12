<template>
  <div class="tab" :id="cpntId">
    <div class="tab-container"
      @touchstart="tabbarTouchstart($event)"
      @touchmove="tabbarTouchmove($event)">
      <ul class="tab-bar" :style="{width:tabbarWidth}" :id="'tb'+cpntId">
        <div class="tab-indicator" :style="{transform: indicatorLeft}"></div>
        <li class="tab-front" v-for="(item, index) in choosenTabs" :key="index"
          @click="forwardTo(index, $event)" :style="{width:frontTabWidth}" :class="{tabfrontactive:index === curPage}">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="tab-more" @click="toggleFullpage(true)"></div>
    <transition name="slide-fade">
      <div class="fullpage" v-if="fullpageshow" @touchmove.stop.prevent :id="'fp'+cpntId">
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
    <div class="content" :style="{width: contentWidth, transform: contentTransform}" :class="{trans:untouching}">
      <div class="page" v-for="(item, index) in choosenTabs" :key="index" :style="{width: pageWidth}" :class="{scrollable:scrollable, childrenPage:id[1] === '2', parentPage: id[1] === '1'}"
        @touchstart="touchstart($event)"
        @touchmove="touchmove($event)"
        @touchend="touchend($event)"
        :id="'p'+cpntId+index">
        <div class="pagewrapper" :is="item.component" :cpntId="item.cpntId" :sonScrollable="scrolls[index].sonScrollable" :sonScrollTop="scrolls[index].sonScrollTop" :msg="item.msg" :scrollBottom="scrolls[index].scrollBottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Listview from './Listview'

export default {
  name: 'tab',
  props: {'choosen': {}, 'recommend': {}, 'cpntId': {}, 'scrollable': {type: Boolean, default: true}, 'scrollTop': {type: Number, default: 0}},
  data () {
    return {
      id: this.cpntId.split(''),
      curPage: 0,
      startX: 0,
      curX: 0,
      scrollLen: 0,
      verticalScroll: false,
      fullpageshow: false,
      fullpageTop: 0,
      virtualIndex: 0,
      virtual: {
        index: 0,
        show: false,
        x: 0,
        y: 0,
        top: this.cpntId.split('')[1] === '1' ? 4 * window.getComputedStyle(document.body).fontSize.slice(0, -2) : 6 * window.getComputedStyle(document.body).fontSize.slice(0, -2)
      },
      untouching: true,
      firstTouchmove: false,
      choosenTabs: this.choosen,
      recommendTabs: this.recommend,
      initScrollTop: 0,
      tabbar: {
        x: 0,
        y: 0,
        firstTouchmove: false,
        isVertical: true
      },
      scrolls:
        Array.apply(null, Array(this.choosen.length)).map((item, i) => {
          return {
            sonScrollTop: -1,
            sonScrollable: false,
            pageScrollTop: 0,
            scrollBottom: false,
            height: 0
          }
        })
    }
  },
  components: {
    Listview
  },
  computed: {
    indicatorLeft: function () {
      let tbwStr = parseInt(this.tabbarWidth.slice(0, -1))
      let tbwStr100 = tbwStr < 100 ? 100 : tbwStr
      let rem = window.getComputedStyle(document.body).fontSize.slice(0, -2)
      let tbw = tbwStr100 / 100 * (document.body.offsetWidth - 2 * rem) // 括号里是tab-container的宽度
      let tw = tbw / this.choosenTabs.length
      let trans = tw * (this.curPage + 0.5)
      return 'translateX(calc(' + trans + 'px - 1.5rem))' // 1.5rem是indicator长度的1/2
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
      return 'translateX(' + (this.curX + this.scrollLen) + 'px)'
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
      this.scrolls.splice(index, 1)
    },
    addTab: function (index) {
      this.choosenTabs = this.choosenTabs.concat(this.recommendTabs.splice(index, 1))
      this.scrolls.push({
        sonScrollTop: -1,
        sonScrollable: false,
        pageScrollTop: 0
      })
    },
    touchstart: function (e) {
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
      this.verticalScroll = false
      this.untouching = false
      this.firstTouchmove = true
    },
    touchmove: function (e) {
      if (this.firstTouchmove) {
        this.firstTouchmove = false
        let scrollX = e.touches[0].pageX - this.startX
        if (Math.abs(e.touches[0].pageY - this.startY) > Math.abs(scrollX)) {
          this.verticalScroll = true
          return
        }
      }
      if (!this.verticalScroll) {
        let scrollX = e.touches[0].pageX - this.startX
        this.scrollLen = scrollX
        e.preventDefault()
        e.stopPropagation()
      }
      if (this.cpntId === 'l11') {
        e.stopPropagation()
      }
    },
    touchend: function (e) {
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
      let st = this.scrollTop === -1 ? this.initScrollTop : this.scrollTop
      this.virtual.y = $event.changedTouches[0].pageY - st - this.virtual.top + 'px'
      this.virtual.index = index
    },
    tabTouchmove: function ($event) {
      this.virtual.x = $event.changedTouches[0].pageX + 'px'
      let st = this.scrollTop === -1 ? this.initScrollTop : this.scrollTop
      this.virtual.y = $event.changedTouches[0].pageY - st - this.virtual.top + 'px'
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
              this.scrolls.splice(onIndex, 0, this.scrolls.splice(index, 1)[0])
              this.resetScrollTop(index, onIndex)
            }
          }
        } else {
          return
        }
      })
    },
    resetScrollTop: function () {
      Array.prototype.slice.apply(arguments).map(index => {
        this.$nextTick(function () {
          document.getElementById('p' + this.cpntId + index).scrollTop = this.scrolls[index].pageScrollTop
        })
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
    },
    scroll: function (e) {
      let top = e.target.scrollTop
      let hei = e.target.firstChild.offsetHeight
      this.scrolls[this.curPage].sonScrollable = top >= hei
      this.scrolls[this.curPage].sonScrollTop = hei - top
      this.scrolls[this.curPage].pageScrollTop = top
    },
    childrenScroll: function (e) {
      this.scrolls[this.curPage].pageScrollTop = e.target.scrollTop
      this.scrolls[this.curPage].scrollBottom = e.target.scrollTop + this.scrolls[this.curPage].height >= e.target.firstChild.offsetHeight
    },
    initializeScrollTop: function (e) {
      for (let i = 0; i < this.scrolls.length; i++) {
        document.getElementById('p' + this.cpntId + i).scrollTop = this.scrolls[i].pageScrollTop
      }
    },
    indicatorChange: function () {
      this.$nextTick(() => {
        let tb = document.getElementById('tb' + this.cpntId)
        let left = tb.lastChild.offsetWidth * this.curPage
        let right = tb.lastChild.offsetWidth * (this.curPage + 1)
        let scroll = tb.parentNode.scrollLeft
        let width = tb.parentNode.offsetWidth
        let toScroll
        if (right - scroll >= width) {
          toScroll = right - width
        } else if (left < scroll) {
          toScroll = left
        }
        var TWEEN = require('@tweenjs/tween.js')
        var coords = { x: scroll, y: tb.parentNode }
        var tween = new TWEEN.Tween(coords)
          .to({x: toScroll}, 300)
          .onUpdate(() => {
            coords.y.scrollLeft = coords.x
          })
        tween.start()
        requestAnimationFrame(animate)

        function animate (time) {
          requestAnimationFrame(animate)
          TWEEN.update(time)
        }
      })
    }
  },
  mounted: function () {
    if (this.id[1] === '1') {
      for (let i = 0; i < this.scrolls.length; i++) {
        document.getElementById('p' + this.cpntId + i).addEventListener('scroll', this.scroll)
      }
      // [].forEach.call(document.getElementsByClassName('parentPage'), item => {
      //   item.addEventListener('scroll', this.scroll)
      // })
    }
    if (this.id[1] === '2') {
      for (let i = 0; i < this.scrolls.length; i++) {
        let curP = document.getElementById('p' + this.cpntId + i)
        curP.addEventListener('scroll', this.childrenScroll)
        this.scrolls[i].height = curP.offsetHeight
      }
    }
    // fullpage的virtual-tab由于定位用了absolute，位置会受到顶栏和父tab滑动距离影响([prop]this.scrollTop)。
    // 顶栏高度在this.virtual.top中给出。
    // 滑动高度在this.scroll()中会计算，但没有初始化的过程。
    // 父tab的scrollTop就是0，子tab的scrollTop在这里计算出来。
    // 父tab滑动高度初始就是pageWrapper的高度。pageWrapper也就是当前这个tab的父节点。
    if (this.id[1] === '2') {
      this.initScrollTop = document.getElementById(this.cpntId).parentNode.offsetHeight
    }
    this.$root.eventHub.$on('tabInitScrollTop', this.initializeScrollTop)
  },
  beforeCreate: function () {
    //  避免循环引用，在beforeCreate钩子这里动态引入。
    this.$options.components.Taobao = require('./Taobao.vue')
    this.$options.components.Jindong = require('./Jindong.vue')
    this.$options.components.Weipinghui = require('./Weipinghui.vue')
  },
  watch: {
    'route': 'routeChange',
    'indicatorLeft': 'indicatorChange'
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
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  
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

  .tab-top {
    position: absolute;
    top: 0;
    left: 0;
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

    .tabfrontactive {
      color: #FA5876;
    }
  }

  .fullpage {
    position: absolute;
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
        position: absolute;
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
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
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
