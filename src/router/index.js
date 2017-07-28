import Vue from 'vue'
import Router from 'vue-router'
import Personal from '@/components/Personal'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: resolve => require(['@/components/Index.vue'], resolve),
      meta: {keepAlive: true}
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/components/Detail.vue'], resolve)
    }
  ]
})
