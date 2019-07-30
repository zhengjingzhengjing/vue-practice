import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import VuexPage from '@/views/vuexPage/vuexPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vuexpage',
      name: 'vuexpage',
      component: VuexPage
    }
  ]
})
