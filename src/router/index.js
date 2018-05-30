import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Bookinfo from '@/pages/bookinfo'
import Lookbook from '@/pages/lookbook'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/bookinfo',
    name: 'bookinfo',
    component: Bookinfo,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/lookbook',
    name: 'lookbook',
    component: Lookbook,
    meta: {
      keepAlive: true
    }
  }]
})
