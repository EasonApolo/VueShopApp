<template>
  <div class="slider">
    <swiper class="slider-box" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in list" :key="index" class="slider-item">
        <a :href="item.url" >
          <div class="slider-item" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
        </a>
      </swiper-slide>
      <div class="slider-pagination swiper-pagination"  slot="pagination">
      </div>
    </swiper>
  </div>
</template>

<script>
import Dummy from './Dummy'

export default {
  name: 'slider',
  props: ['cpntId'],
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        speed: 500
      },
      list: [
        {url: Dummy.prototype.get()},
        {url: Dummy.prototype.get()},
        {url: require('../../static/S.png')}
      ]
    }
  },
  computed: {
    last: function () {
      return this.cur === 0 ? this.list.length - 1 : this.cur - 1
    },
    next: function () {
      return this.cur === this.list.length - 1 ? 0 : this.cur + 1
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
  },
  mounted () {
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

.slider {
  position: relative;
  width: 100%;
  height: 8rem;
  text-align: center;
  overflow: hidden;
}

.slider-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-item {
  width: 100%;
  height: 100%;

  .slider-item {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.slider-pagination {
  position: absolute;
  bottom: 0;
}

.swiper-pagination-bullet {
  background-color: white !important;
}
.swiper-pagination-bullet-active {
  background-color: red !important;
}

</style>
