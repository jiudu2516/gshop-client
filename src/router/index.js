/* 
  路由器模块
 */

 import Vue from 'vue'
 import VueRouter from 'vue-router'

 import routes from './routes'

 // 声明使用vue插件vue-router
 Vue.use(VueRouter)

 export default new VueRouter({
   mode: 'history', // 去掉路径前面的#
   routes
 })
