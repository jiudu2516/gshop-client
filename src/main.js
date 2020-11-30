import Vue from 'vue'
import 'lib-flexible'
import './veeValidate'

import * as API from './api'

import router from './router'
import store from './vuex/store'
import App from '@/App.vue'
import Header from '@/components/Header/Header.vue'
import Stars from '@/components/Stars/Stars.vue'

// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Stars', Stars)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // components: {
  //   App
  // },
  // template: '<App/>'

  render: h => h(App),
  router,  // 所有组件都能通过$router属性看到router对象  / 所有组件都有了一个代表当前路由的data数据: $route
  store  // 所有组件都能看到 $store
})