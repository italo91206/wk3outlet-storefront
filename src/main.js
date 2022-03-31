import Vue from 'vue'
import Vuex from 'vuex'
import store from './store';
import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification';
import jwt_decode from 'jwt-decode';
import 'vue-toast-notification/dist/theme-default.css';
import App from './App.vue'
import routes from './routes.js'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueToast);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');

  if(user != null){
    let user_decoded = jwt_decode(user);
    let exp_date = new Date(user_decoded.exp * 1000);

    // console.log("user_decoded", user_decoded)
    // console.log("exp_date", exp_date)

    if(exp_date > new Date()){
      store.commit('perfil/setPerfil', user_decoded.usuario);
    }
    else
      localStorage.removeItem('user')
  }

  next();
})

new Vue({
  router,
  VueToast,
  store,
  render: h => h(App),
}).$mount('#app')
