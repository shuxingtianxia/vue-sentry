import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/sentry'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

throw Error('nihao')
