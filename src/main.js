import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1"
Vue.prototype.$http = axios

new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
