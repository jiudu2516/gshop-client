/* 
  mutations 是包含 n 个 用于直接更新状态数据的方法的对象
  不可以包含异步和逻辑处理代码
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  [RECEIVE_TOKEN] (state, token) {
    state.token = token
  }
}