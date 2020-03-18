// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../theme/index.css'
// import '../static/global/global.css'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import ElementUI from 'element-ui'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:9001/'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
