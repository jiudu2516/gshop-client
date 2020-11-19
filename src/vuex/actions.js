/* 
  mutations 是包含 n 个 用于间接更新状态数据的方法的对象
  可以包含异步和逻辑处理代码
*/
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '@/api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  // 获取当前地址信息对象的异步action
  async getAddress ({commit, state}) {
    const {longitude, latitude} = state
    // 发异步请求
    const result = await reqAddress(longitude, latitude)
    // 请求成功后，提交给mutation
    if (result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 获取商品分类的异步action
  async getCategorys ({commit}) {
  // async getCategorys ({commit}, callback) {
    // 发异步请求
    const result = await reqCategorys()
    // 请求成功后，提交给mutation
    if (result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)  // 内部同步调用
      // 在数据更新之后，调用回调函数  处理swiper的方式二
      // typeof callback === 'funct vcon' && callback()
    }
  },
  // 获取商家数组的异步action
  async getShops ({commit, state}) {
    const {longtitude, latitude} = state
    // 发异步请求
    const result = await reqShops({longtitude, latitude})
    // 请求成功后，提交给mutation
    if (result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  }
}
