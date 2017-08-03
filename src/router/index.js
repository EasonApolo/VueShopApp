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
      component: resolve => require(['@/components/Profile.vue'], resolve)
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
    }
  ]
})
