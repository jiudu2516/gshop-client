import Vue from 'vue'
import router from './router'
import App from '@/App.vue'

import 'lib-flexible'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // components: {
  //   App
  // },
  // template: '<App/>'

  render: h => h(App),
  router  // 所有组件都能通过$router属性看到router对象  / 所有组件都有了一个代表当前路由的data数据: $route
})