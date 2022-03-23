import Vue from 'vue'
import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import App from './App.vue'
import routes from './routes.js'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueToast);

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  VueToast,
  render: h => h(App),
}).$mount('#app')
