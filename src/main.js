import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueWorker from 'vue-worker';
import vuetify from './plugins/vuetify';
import fullscreen from 'vue-fullscreen'

Vue.use(VueWorker)
Vue.use(fullscreen)
Vue.config.productionTip = false

var env = 'loacl';

import axios from 'axios'
// NOTE: as a proxy is used, the baseURL is still 'http://localhost:8080'
export const base = axios.create({
  // baseURL: 'http://localhost:8080'
  baseURL: env === 'loacl' ? 'http://127.0.0.1:5000' : 'https://trapsa-backend.herokuapp.com/'
});

Vue.prototype.$http = base; 


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
