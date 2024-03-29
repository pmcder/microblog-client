import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations:{
    logOut(state){
      localStorage.removeItem('jwt')
      state.loggedIn = false
    },
    logIn(state){
      state.loggedIn = true
      
    }
  }
})

new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount("#app");
