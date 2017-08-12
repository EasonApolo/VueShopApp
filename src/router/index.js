import Vue from 'vue'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/Index.vue'], resolve),
      meta: {keepAlive: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: resolve => require(['@/components/Profile.vue'], resolve),
      meta: {keepAlive: true}
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/components/Detail.vue'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/components/Search.vue'], resolve)
    },
    {
      path: '/browse_records',
      name: 'browse_records',
      component: resolve => require(['@/components/BrowseRecords.vue'], resolve)
    },
    {
      path: '/pay_records',
      name: 'pay_records',
      component: resolve => require(['@/components/PayRecords.vue'], resolve)
    },
    {
      path: '/point_page',
      name: 'point_page',
      component: resolve => require(['@/components/PointPage.vue'], resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/components/Setting.vue'], resolve)
    },
    {
      path: '/buy_records',
      name: 'buy_records',
      component: resolve => require(['@/components/BuyRecords.vue'], resolve)
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: resolve => require(['@/components/Mydata.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/Login.vue'], resolve)
    }
  ]
})
