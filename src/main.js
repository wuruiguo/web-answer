import Vue from 'vue'
import App from './App'
import router from './router'
import * as api from './api/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Message } from 'iview';

// require styles
import 'swiper/dist/css/swiper.css'
import 'iview/dist/styles/iview.css';

Vue.use(VueAwesomeSwiper)
Vue.prototype.$Message = Message

Vue.prototype.$http=api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
