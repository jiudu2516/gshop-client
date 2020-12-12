import Mock from 'mockjs'
import shopDatas from './data.json'

// 测试接口
Mock.mock('/api/test', 123)

// 商家数据接口
Mock.mock('/api/shopDatas', {code: 0, data: shopDatas})
