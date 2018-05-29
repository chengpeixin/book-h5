import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Bookinfo from '@/pages/bookinfo'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/bookinfo',
    name: 'bookinfo',
    component: Bookinfo
  }]
})
