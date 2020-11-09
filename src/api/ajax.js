/*
  对axios进行2次封装， 一个能发ajax请求的函数
  1. 统一处理请求异常
  2. 异步请求成功的数据不是response, 而是response.data
  3. 对请求体参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
  4. 配置请求超时的时间
  5. 通过请求头携带token数据
*/

import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  // 4. 配置请求超时的时间
  timeout: 20000
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  console.log('req interceptor')
  // 3. 对请求体参数进行ulencode处理, 而不使用默认的jso
  const data = config.data
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }
  
  return config
})

// 添加响应拦截器
instance.interceptors.response.use((config) => {
  response => {
    console.log('res interceptor')

    // return response
    // 2. 异步请求成功的数据不是response, 而是response.da
    return response.data
  },
  error => {
    // return Promise.reject(error)
    // 1. 统一处理请求异常
    alert('请求出错：'  + error.message)
    return new Promise(() => {})   //  返回一个pending状态
  }
})

export default instance