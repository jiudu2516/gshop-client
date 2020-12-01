/* 
  mutations 是包含 n 个 用于间接更新状态数据的方法的对象
  可以包含异步和逻辑处理代码
*/
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '@/api'
import { reqAutoLogin } from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOGOUT
} from './mutation-types'

export default {
  // 1 获取当前地址信息对象的异步action
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

  // 2 获取商品分类的异步action
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

  // 3 获取商家数组的异步action
  async getShops ({commit, state}) {
    const {longtitude, latitude} = state
    // 发异步请求
    const result = await reqShops({longtitude, latitude})
    // 请求成功后，提交给mutation
    if (result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
  
  // 4 保存用户信息的异步action
  saveUser ({commit}, user) {
    console.log(user)
    const token = user.token
    // 将token存入本地localStorage  (七天内免登录)
    localStorage.setItem('token_key', token)

    commit(RECEIVE_TOKEN, {token}) // 将token保存到state
    delete user.token // 删除user内部的token
    commit(RECEIVE_USER, {user}) // 将user保存到state
    // console.log(user)
  },

  // 5 自动登录用户
  async autoLogin ({commit, state}) {
    console.log(state)
    if (state.token && !state.user._id) { // 有token没有user._id
      // 发送自动请求
      const result = await reqAutoLogin()
      if (result.code === 0) {
        const user = result.data // 没有token
        commit(RECEIVE_USER, {user})
      }
    }
  },
  
  // 6、退出登陆
  logout ({commit}) {
    // 清除local中的token
      localStorage.removeItem('token_key')
      // 清除state中user/token
      commit(LOGOUT)
  },
}
