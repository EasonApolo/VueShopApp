<template>
  <div class="item">
    <div class="item-box" @click="linktoItem">
      <img class="item-avt" :src="ownprop.imgUrl" />
      <div class="item-info">
        <div class="item-name">{{ownprop.name}}</div>
        <div class="item-price">{{ownprop.price}}</div>
        <div class="item-volume">{{ownprop.volume}}</div>
        <div class="item-discount">用券立减<span class="discount-strong">{{ownprop.discount}}</span>元</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'item',
  props: ['ownprop'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    linktoItem: function () {
      this.$root.eventHub.$emit('pushToDetail', this.ownprop)
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

.item {
  width: 100%;
  padding: 0.125rem 0;
  box-sizing: border-box;
  
  .item-box {
    $imgh: 7rem;
    $imgp: 0.5rem;
    position: relative;
    width: 100%;
    height: $imgh + 2 * $imgp;
    background-color: white;

    .item-avt {
      position: absolute;
      width: $imgh;
      left: $imgp;
      top: $imgp;
    }

    .item-info {
      margin-left: $imgh + 2 * $imgp;
      padding: $imgp 0rem;
      height: 2rem;
      text-align: left;

      .item-name {
        color: #444;
      }
      .item-price {
        display: inline-block;
        margin-top: 0.5rem;
        width: 10rem;
        color: #666;
        &:before {
          content: '￥';
        }
      }
      .item-volume {
        display: inline-block;
        color: #666;
        font-size: 0.875rem;
        &:before {
          content: '销量';
        }
      }
      .item-discount {
        display: inline-block;
        position: relative;
        margin-top: 0.5rem;
        line-height: 2rem;
        width: 80%;
        background-color: #FFCA28;
        color: white;
        text-align: center;
        overflow: hidden;
        .discount-strong {
          color: #E7616D;
        }
        &:before {
          content: '';
          position: absolute;
          left: -0.5rem;
          top: 0.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: white;
        }
        &:after {
          content: '';
          position: absolute;
          right: -0.5rem;
          top: 0.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: white;
        }
      }
    }
  }
}
</style>
