import Vue from 'vue'
import { reqShopDatas } from '../../api'

import {
  RECEIVE_SHOPDATAS,
  ADD_FOOD_COUNT,
  DEL_FOOD_COUNT,
} from '../mutation-types'

const state = {
  initTest: '模块化shop数据测试',
  shopDatas: {}  // 商家数据
}

const mutations = {
  [RECEIVE_SHOPDATAS] (state, shopDatas) {
    state.shopDatas = shopDatas
  },
  [ADD_FOOD_COUNT] (state, {food}) {
    // vuex 和 vue 一样有响应式属性和非响应式属性
    if (food.count > 0) { // 有count直接加
      food.count++
    } else { // 没有count，设置默认值为1
      Vue.set(food, 'count', 1)
    }
  },
  [DEL_FOOD_COUNT] (state, {food}) {
    if (food.count > 0) {
      food.count--
    } else {
      // food.count = 1
      // Vue.set(food, 'count', 1)
      // alert("不能再减少了")
    }
  },
  
}

const actions = {
  async getShopDatasAction ({commit}) {
    let result = await reqShopDatas()
    if (result.code === 0) {
      commit(RECEIVE_SHOPDATAS, result.data)
    }
  },

  async changeFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, {food})
    } else {
      commit(DEL_FOOD_COUNT, {food})
    }
  }
}

const getters = {
  
}


export default {
  state,
  mutations,
  actions,
  getters
}