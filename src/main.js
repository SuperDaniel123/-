// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/css/style.css'
import '@/common/font/font-awesome/css/font-awesome.min.css'
import 'swiper/dist/css/swiper.css'
import '@/common/js/axios'
import store from './store'
Vue.config.productionTip = false
import { Button,Swipe, SwipeItem,Tab,Tabs,List,Toast} from 'vant';
Vue.use(Button).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(List).use(Toast)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
