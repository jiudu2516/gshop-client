/*
  对axios进行2次封装， 一个能发ajax请求的函数
  1. 统一处理请求异常
  2. 异步请求成功的数据不是response, 而是response.data
  3. 对请求体参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
  4. 配置请求超时的时间
  5. 通过请求头携带token数据
  6.请求loading
*/

import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui'

// 1 生成Axios的伪实例，instance不是真正的new Axios，但是拥有Axios实例的所有属性和方法
const instance = axios.create({
  // baseURL: 'http://localhost:4000',   //  会出现跨域问题
  baseURL: '/api',
  // 4）. 配置请求超时的时间
  timeout: 20000
})

// 2 添加请求拦截器，理解：即将要发送请求的时候，将请求拦截下来，对当前的请求批量处理，如：添加token，修改请求的参数
instance.interceptors.request.use((config) => {

  // 显示请求loading
  Indicator.open()

  // 2.1 config包含当前请求的所有请求信息：method，url，data

  // 2.2  修改post请求的请求参数格式：默认的参数格式是json对象格式{a：xxx, b: yyy}，当前服务器能处理的是url-encoding，如：a=xxx&b=yyy
  // console.log('req interceptor')

  // 3）. 对请求体参数进行ulencode处理, 而不使用默认的json
  const data = config.data
  if (data instanceof Object) {
    config.data = qs.stringify(data)   // json对象格式 --> url-encoding形式
  }

  /* 2.3 携带token的方式
        1  cookie
        2  请求参数
        3  请求头[authorization] 
  */
  let token = localStorage.getItem('token_key')
  // 判断当前的请求是否需要携带token  用户名密码首次登录时
  // if (config.headers.needToken) {
    if (token) {
      config.headers.authorization = token
    } else {
      // throw Error ('请先登录！')
    }
  // }
  
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // console.log('res interceptor')

    // 隐藏loading
    Indicator.close()

    // return response
    // 2）. 异步请求成功的数据不是response, 而是response.da
    return response.data
  },
  error => {

    // 隐藏loading
    Indicator.close()

    // return Promise.reject(error)
    // 1）. 统一处理请求异常
    alert('请求出错：'  + error.message)
    // 默认会返回一个成功的promise实例，但没有数据
    // 手动返回一个状态为初始化的promise
    return new Promise(() => {})   //  返回一个pending状态
  }
)

export default instance