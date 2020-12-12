/* 
   vuex最核心的管理对象  通过export default store对象
*/

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import shop from './modules/shop'

Vue.use(Vuex) // 声明使用Vuex

export default new Vuex.Store({
  modules: {
    shop
  },
  state,
  mutations,
  actions,
  getters
})