<template>
  <div class="markrecords">
    <div id="top">
        <div id="back" @click="back"></div>
        <div id="text">我的收藏</div>
        <div id="clear" @click="manage">{{manageWord}}</div>
    </div>
    <div id="content" :class="{inManage: !manageMode}">
        <div id="goods" v-show="show === 0">
          <div class="goods_records" v-for="(item, index) in data" :key="index">
            <div class="select"><button :class="{selected: !isSelected(index)}" @click="select(index)"></button></div>
            <div class="img_goods"><img id="img1" :src="item.imgUrl"></div>
            <div class="goods_name">{{item.name}}</div>
            <div class="price">{{item.price}}</div>
            <div class="sales">月销：{{item.volume}}</div>
          </div>
        </div>
    </div>
    <div class="no-record" v-show="data.length === 0">啊哦，这里空空如也,<br>快去收藏吧~</div>
    <transition name="slide-up">
      <div class="bottom" v-show="manageMode">
        <button class="select-all" :class="{selected: !allSelected}" @click="selectAll"></button><span>{{selectLabel}}</span>
        <button class="select-submit" :class="{submitAble: submitable}" @click="unMark">取消收藏</button>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'markrecords',
  props: [],
  components: {
  },
  data () {
    return {
      data: [],
      show: 0,
      manageMode: false,
      selectSet: new Set(),
      selectArray: [],
      allSelected: false,
      frontStar: require('./assets/frontstar.png'),
      backStar: require('./assets/backstar.png')
    }
  },
  computed: {
    indicatorLeft: function () {
      return 'calc(' + (this.show * 50 + 25) + '% - 2rem)'
    },
    selectLabel: function () {
      return this.allSelected ? '全不选' : '全选'
    },
    submitable: function () {
      return this.selectArray.length !== 0
    },
    manageWord: function () {
      return this.manageMode ? '完成' : '编辑'
    }
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
      this.data = JSON.parse(localStorage.mark)
      this.manageMode = false
      this.selectSet.clear()
      this.selectArray = []
    },
    manage: function () {
      this.manageMode = !this.manageMode
      // this.data = []
      // localStorage.mark = '[]'
    },
    select: function (index) {
      if (this.selectSet.has(index)) {
        this.selectSet.delete(index)
        this.allSelected = false
      } else {
        this.selectSet.add(index)
      }
      this.selectArray = Array.from(this.selectSet)
    },
    isSelected: function (index) {
      for (let i = 0; i < this.selectArray.length; i++) {
        if (this.selectArray[i] === index) {
          return true
        }
      }
    },
    selectAll: function () {
      console.log('a')
      if (!this.allSelected) {
        for (let i = 0; i < this.data.length; i++) {
          this.selectSet.add(i)
        }
        this.selectArray = Array.from(this.selectSet)
      } else {
        this.selectSet.clear()
        this.selectArray = Array.from(this.selectSet)
      }
      this.allSelected = !this.allSelected
    },
    unMark: function () {
      for (let i = this.data.length - 1; i >= 0; i--) {
        if (this.selectSet.has(i)) {
          this.data.splice(i, 1)
          this.selectSet.delete(i)
        }
      }
      localStorage.mark = JSON.stringify(this.data)
      this.selectArray = Array.from(this.selectSet)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchData()
    })
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
.markrecords {
  position: relative;
  height: 100%;
  z-index: 1;
  text-align: left;
}
.no-record {
  position: absolute;
  top: 30%;
  width: 100%;
  color: #AAA;
  text-align: center;
}
a {
  color: #42b983;
}
#top{
    position: relative;
    background-color:#FA5876;
    height: 3rem;
}
#back{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: .75rem;
    z-index: 1;
    background-image: url(./assets/back.png);
    background-size: contain;
    background-repeat: no-repeat;
}
#text{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6.4rem;
    line-height: 3rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
#clear {
    position: absolute;
    right: 0.5rem;
    top: .625rem;
    width: 2rem;
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: .875rem;
    background-size: contain;
    background-repeat: no-repeat;
    color: white;
}
#content{
    position: absolute;
    top: 3rem;
    left: 0;
    right: -2.5rem;
    bottom: 0px;
    background-color: #F4F4F4;
    overflow: scroll;
    transition: .2s;
}
#goods{
    position: absolute;
    top: 0;
    left: 2.5rem;
    right: 0;
    bottom: 0;
    z-index: 1;
}
.goods_records {
    position: relative;
    width: 100%;
    height: 128px;
    border-bottom: 1px #eee solid;
}

.select {
  position: absolute;
  left: -2.5rem;
  top: 0;
  width: 2.5rem;
  height: 100%;
  background-color: #F4F4F4;

  button {
    padding: 0;
    position: absolute;
    left: .625rem;
    top: calc(50% - .625rem);
    width: 1.25rem;
    height: 1.25rem;
    background-image: url(./assets/select.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    border-radius: 50%;
    border: none;
    outline: none;
  }
}

.img_goods{
    position: absolute;
    left:8px;
    top:8px;
    width:112px;
    height: 112px;
}
#img1{
    width: 112px;
    height: 112px;
}
.goods_name{
    position: absolute;
    left:128px;
    top:8px;
}
.price{
    position: absolute;
    left:128px;
    bottom: .5rem;
    color: #FA5876;
    font-size: 1.25rem;
    
    &:before {
        content: '￥';
        font-size: 1rem;
    }
}
.sales{
    position: absolute;
    right: .5rem;
    bottom: .5rem;
    color: #BBB;
    font-size: .875rem;
}
.inManage {
  transform: translateX(-2.5rem);
}
.selected {
  background-image: url(./assets/select-empty.png) !important;
}
.bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: white;
  transition: .2s;
  z-index: 1;

  .select-all {
    padding: 0;
    position: absolute;
    left: .625rem;
    top: calc(50% - .625rem);
    width: 1.25rem;
    height: 1.25rem;
    background-image: url(./assets/select.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    border-radius: 50%;
    border: none;
    outline: none;
  }

  span {
    margin-left: 2.5rem;
    line-height: 3rem;
    color: #888;
  }

  .select-submit {
    width: 6rem;
    height: 100%;
    float: right;
    background-color: #CCC;
    border: 0;
    outline: none;
    color: white;
    font-size: .875rem;
  }

  .submitAble {
    background-color: #FA5876;
  }
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: .3s;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(3rem);
}
</style>
