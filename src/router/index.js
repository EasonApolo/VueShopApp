import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Personal from '@/components/Personal'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    }
  ]
})
