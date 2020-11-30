/*
  里面包含n个接口请求函数的模块
*/

import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`)

// 2、获取食品分类列表
export const reqCategorys = () => ajax('/index_category')

// 3、根据经纬度获取商铺列表
export const reqShops = ({longitude, latitude}) => ajax('/shops', {params: {longitude, latitude}})

// 4、发送短信验证码
export const reqSendCode = ({phone}) => ajax('/sendcode', {params: {phone}})

// 5、用户名密码登陆
// export const reqLoginPwd = ({username, password, captcha}) => ajax.post('/login_pwd',  {name:username, pwd:password, captcha})
export const reqLoginPwd = ({username, password, captcha}) => ajax({
  url: '/login_pwd',
  method: 'POST',
  data: {
    name: username,
    pwd: password,
    captcha
  }
})

// 6、手机号验证码登陆
export const reqLoginSms = ({phone, code}) => ajax.post('/login_sms', {phone, code})
