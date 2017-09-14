<template>
  <div class="search">
    <div class="search-bar">
      <form class="sb-box" @keydown="toSearch">
        <input class="sb-input" type="search"
          :placeholder="recommend[recommendIndex]" v-model="keyword" @keydown="toSearch($event)"
          @input="fetchData" @focus="done = false"/>
        <span class="clear" @click="clearKeyword"></span>
      </form>
      <span class="sb-back" @click="goback">取消</span>
    </div>
    <div class="noinput" v-show="keyword.length === 0 && done === false">
      <div class="search-history" v-show="history.length !== 0">
        <h2>搜索历史</h2><span class="clear" @click="clearHistory"></span>
        <span v-for="(item, index) in history" :key="index" class="keyword" @touchend="searchWith(item)">{{item}}</span>
      </div>
      <div class="search-hot">
        <h2>热门推荐</h2>
        <span v-for="(item, index) in recommend" :key="index" class="keyword" @touchend="searchWith(item)">{{item}}</span>
      </div>
    </div>
    <div class="oninput" v-show="keyword.length !== 0 || done">
      <div class="auto-src">
        <span class="auto-src-tab" :style="{width: srcWidth}" :class="{activeSrc: index===curSrc}"
          v-for="(item, index) in src" :key="index"
          @click="forwardTo(index)">{{item.id}}
        </span>
        <span class="src-indicator" :style="{transform: indicatorLeft, width: srcWidth}"></span>
      </div>
      <ul class="auto-list" v-show="keyword.length !== 0 && !done">
        <li class="auto-word" v-for="(item, index) in src[curSrc].auto" :key="index" @touchend="searchWith(item)">{{item}}
          <span class="auto-but" @touchend.stop="newKeyword(item)"></span>
        </li>
      </ul>
      <div class="afterinput" v-show="done">
        <div class="result-list" v-for="(item, index) in src" :key="index" :style="{transform: 'translateX(' + 100 * (index - curSrc) + '%)'}">
          <listview :msg="keyword"></listview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Faker from './Faker'
import Listview from './Listview'
import Statusbar from './Statusbar'

export default {
  name: 'search',
  props: [],
  components: {
    'listview': Listview
  },
  data () {
    return {
      recommendIndex: this.$route.query.recommendIndex,
      keyword: '',
      history: localStorage.searchHistory === undefined ? [] : JSON.parse(localStorage.searchHistory),
      recommend: this.$route.query.recommend,
      auto: ['联想词1', '联想词2', '联想词3', '联想词4', '联想词5'],
      done: false,
      curSrc: 0,
      src: [{id: '淘宝', auto: ''}, {id: '京东', auto: ''}]
    }
  },
  computed: {
    indicatorLeft: function () {
      return 'translateX(' + (this.curSrc * (1 / this.src.length * document.body.offsetWidth)) + 'px)'
    },
    srcWidth: function () {
      return 100 / this.src.length + '%'
    }
  },
  methods: {
    goback: function () {
      this.keyword = ''
      this.done = false
      window.history.back(-1)
    },
    fetchData: function () {
      let ret = Faker.prototype.getAuto(this.keyword)
      this.src[this.curSrc].auto = ret
    },
    forwardTo: function (index) {
      this.curSrc = index
      if (this.src[this.curSrc].auto === '') {
        this.fetchData()
      }
    },
    newKeyword: function (item) {
      this.keyword = item
      this.fetchData()
    },
    // searchWith: 通过点击历史标签、推荐标签和联想标签，进入search的方式
    searchWith: function (item) {
      this.keyword = item
      this.search()
    },
    // searchWith: 输入或未输入，直接点击enter，进入search的方式
    toSearch: function (e) {
      if (e.keyCode === 13 || e === undefined) {
        e.preventDefault()
        if (this.keyword.length === 0) {
          this.keyword = this.recommend[this.recommendIndex]
        }
        this.search()
      }
    },
    search: function () {
      //  长度大于10的输入不存储
      if (this.keyword.length <= 15) {
        this.insertIntoHistory()
      }
      this.done = true
    },
    // insertIntoHistory: 负责更新history和localstorage
    insertIntoHistory: function () {
      if (localStorage.searchHistory === undefined || localStorage.searchHistory === '') {
        localStorage.searchHistory = '[]'
      }
      if (Object.prototype.toString.call(this.history) !== '[object Array]') {
        this.history = []
      }
      let inHistory = false
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i] === this.keyword) {
          // 如果搜索词已经在了就换到最前面
          this.history.splice(0, 0, this.history.splice(i, 1)[0])
          inHistory = true
          break
        }
      }
      //  否则插到最前面
      if (!inHistory) {
        this.history.unshift(this.keyword)
        //  history最多存储10个
        if (this.history.length > 10) {
          this.history.pop()
        }
      }
      localStorage.searchHistory = JSON.stringify(this.history)
    },
    clearHistory: function () {
      this.history.splice(0, this.history.length)
      localStorage.searchHistory = JSON.stringify(this.history)
    },
    clearKeyword: function () {
      this.keyword = ''
      this.done = false
    },
    updateRecommend: function () {
      this.recommend = this.$route.query.recommend
      this.recommendIndex = this.$route.query.recommendIndex
    },
    updateStatusBar: function (isEnter) {
      if (isEnter) {
        if (navigator.userAgent.indexOf('Android') !== -1) {
          Statusbar.prototype.toGrey()
        } else {
          Statusbar.prototype.toDefault()
          Statusbar.prototype.toWhite()
        }
      } else {
        if (navigator.userAgent.indexOf('Android') === -1) {
          Statusbar.prototype.toLight()
        }
        Statusbar.prototype.toMain()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateRecommend()
      vm.updateStatusBar(true)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.updateStatusBar(false)
    next()
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

.search {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: white;
  z-index: 1;
}

.search-bar {
  display: flex;
  height: 2rem;
  padding:0.375rem;
  .sb-box {
    position: relative;
    display: inline-block;
    flex: auto;
    height: 100%;
    border-radius: 1rem;
    overflow: hidden;

    .sb-input {
      width: calc(100%);
      height: 100%;
      padding: 0 1rem;
      background-color: #F2F2F2;
      outline: none;
      border: 0;
      font-size: 0.875rem;
      color: #333;
      &::-webkit-search-cancel-button {
        display: none;
      }
    }

    .clear {
      position: absolute;
      right: .5rem;
      top: .5rem;
      width: 1rem;
      height: 1rem;
      background-image: url(./assets/clear.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .sb-back {
    width: 3rem;
    line-height: 2rem;
    font-size: 0.875rem;
  }
}
.search-hot, .search-history {
  position: relative;
  text-align: left;

  h2 {
    font-size: 1rem;
    margin: .5rem .875rem;
  }
  .keyword {
    margin: .5rem;
    display: inline-block;
    padding: 0.1875rem 1rem;
    border-radius: 1rem;
    background-color: #F2F2F2;
    font-size: .875rem;
    word-wrap: normal;
  }
}

.search-history .clear {
  position: absolute;
  right: 1rem;
  top: .5rem;
  width: 1rem;
  height: 1rem;
  background-image: url(./assets/dump.png);
  background-size: contain;
  background-repeat: no-repeat;
}

.oninput {
  position: absolute;
  left: 0;
  top: 2.75rem;
  right: 0;
  bottom: 0;
}
.auto-src {
  position: relative;
  height: 2rem;
  border-bottom: 1px solid #DDD;

  .auto-src-tab {
    line-height: 2rem;
    display: inline-block;
  }

  .activeSrc {
    color: #FA5876;
  }

  .src-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    transition: .3s;

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 61.8%;
      height: 100%;
      background-color: #FA5876;
    }
  }
}
.auto-list {
  text-align: left;
  background-color: #F2F2F2;
  font-size: 0.9375rem;

  .auto-word {
    padding-left: 1rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #EEE;
    background-color: white;
  }

  .auto-but {
    float: right;
    margin: 0.75rem;
    width: 1rem;
    height: 1rem;
    background-image: url(./assets/automate.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.afterinput {
  position: absolute;
  left: 0;
  top: 2rem;
  right: 0;
  bottom: 0;
  overflow: hidden;
  
  .result-list {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transition: transform .3s ease;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
}

</style>
