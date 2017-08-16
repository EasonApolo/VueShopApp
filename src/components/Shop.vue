<template>
  <div class="shop">
    <div class="shop-box">
      <img class="shop-avt" :src="ownprop.imgUrl" />
      <div class="shop-info">
        <div class="shop-name">{{ownprop.name}}</div>
        <div class="shop-assess">
          <div class="shop-assess-row">宝贝描述<span class="shop-star" :style="{backgroundImage:'url('+backStarUrl+')'}"><span class="shop-star-front" :style="{width:(ownprop.assess[0]*20+'%'),backgroundImage:'url('+frontStarUrl+')'}"></span></span><span class="shop-value">{{ownprop.assess[0]}}</span></div>
          <div class="shop-assess-row">卖家服务<span class="shop-star" :style="{backgroundImage:'url('+backStarUrl+')'}"><span class="shop-star-front" :style="{width:(ownprop.assess[1]*20+'%'),backgroundImage:'url('+frontStarUrl+')'}"></span></span><span class="shop-value">{{ownprop.assess[1]}}</span></div>
          <div class="shop-assess-row">物流服务<span class="shop-star" :style="{backgroundImage:'url('+backStarUrl+')'}"><span class="shop-star-front" :style="{width:(ownprop.assess[2]*20+'%'),backgroundImage:'url('+frontStarUrl+')'}"></span></span><span class="shop-value">{{ownprop.assess[2]}}</span></div>
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
      frontStarUrl: require('./assets/frontstar.png'),
      backStarUrl: require('./assets/backstar.png')
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
  padding: 0.125rem 0;
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
        display: inline-block;
        margin-top: 0.5rem;
        color: #666;
        font-size: 0.875rem;
        line-height: 0.875rem;

        .shop-assess-row {
          margin-bottom: 0.5rem;

          .shop-star {
            $starH: 0.875rem;

            display: inline-block;
            position: relative;
            margin-left: 2rem;
            width: 5 * $starH;
            height: $starH;
            background-size: contain;
            background-repeat: no-repeat;

            .shop-star-front {
              position: absolute;
              left: 0;
              top: 0;
              height: 100%;
              background-size: cover;
              background-repeat: no-repeat;
            }
          }
          .shop-value {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
}







</style>
