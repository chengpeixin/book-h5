// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import Cookie from 'js-cookie'
import axios from 'axios'
import MD5 from 'blueimp-md5'
import BScroll from 'better-scroll'
import './../static/reset.css'
import touch from 'vue-directive-touch'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

router.beforeEach((to, from, next) => {
  if (to.meta.Auth) {
    const user = Cookie.get('user')
    if (!user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
axios.defaults.baseURL = 'http://xinpeicheng.com:8083'
Vue.config.productionTip = false
Vue
  .use(touch)
  .use(Mint)

Vue.prototype.$Cookie = Cookie
Vue.prototype.$http = axios
Vue.prototype.$md5 = MD5
Vue.prototype.$Bscroll = BScroll
// Vue.component(Header.name, Header)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
