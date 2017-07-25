<template>
  <div class="shop">
    <div class="shop-box">
      <img class="shop-avt" :src="ownprop.imgUrl" />
      <div class="shop-info">
        <div class="shop-name">{{ownprop.name}}</div>
        <div class="shop-assess">
          <div class="">宝贝描述<span></span><span>{{ownprop.assess[0]}}</span></div>
          <div class="">卖家服务<span></span><span>{{ownprop.assess[1]}}</span></div>
          <div class="">物流服务<span></span><span>{{ownprop.assess[2]}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'shop',
  props: ['ownprop'],
  components: {
  },
  data () {
    return {
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

.shop {
  width: 100%;
  padding: 1px;
  box-sizing: border-box;
  
  .shop-box {
    $imgh: 7rem;
    $imgp: 0.5rem;
    position: relative;
    width: 100%;
    height: $imgh + 2 * $imgp;
    background-color: white;

    .shop-avt {
      position: absolute;
      width: $imgh;
      left: $imgp;
      top: $imgp;
    }

    .shop-info {
      margin-left: $imgh + 2 * $imgp;
      padding: $imgp 0rem;
      height: 2rem;
      text-align: left;

      .shop-name {
        color: #444;
      }
      .shop-assess {
        margin-top: 0.5rem;
        color: #666;
        font-size: 0.875rem;
      }
    }
  }
}







</style>
