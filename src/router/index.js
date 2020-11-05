/* 
  路由器模块
 */

 import Vue from 'vue'
 import VueRouter from 'vue-router'

 import MSite from '../pages/MSite/MSite.vue'
 import Search from '../pages/Search/Search.vue'
 import Order from '../pages/Order/Order.vue'
 import Profile from '../pages/Profile/Profile.vue'

 // 声明使用vue插件vue-router
 Vue.use(VueRouter)

 export default new VueRouter({
   mode: 'history', // 去掉路径前面的#
   routes: [
     // 路由
     // 自动重定向的路由
     {
       path: '/',
       redirect: '/msite'
     },
     {
       path: '/msite', // path最左边的/代表项目根路径
       component: MSite
     },
     {
       path: '/search',
       component: Search
     },
     {
       path: '/order',
       component: Order
     },
     {
       path: '/profile',
       component: Profile
     }
   ]
 })
 