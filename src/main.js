import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router/index'
import VChart from 'v-charts'
import store from '@/store/index'
import VueI18n from 'vue-i18n'
import Axios from "axios"
import i18n from './lang'
import VueParticles from "vue-particles";
import Vcomp from './components'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/iconfont/iconfont.css";
import "./assets/css/global.scss";
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false
Vue.config.productionTip = "/api";
Vue.use(VueRouter);
Vue.use(VueParticles);
Vue.use(VChart);
Vue.use(Vcomp);
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
});
new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
