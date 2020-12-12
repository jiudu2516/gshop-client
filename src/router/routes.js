/* 
  所有路由配置的数组
 */

import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Info from '../pages/Shop/Info/Info.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'

export default[
    // 路由
    // 自动重定向的路由
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite', // path最左边的/代表项目根路径
      component: MSite,
      meta: { 
        isShowFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: { 
        isShowFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: { 
        isShowFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: { 
        isShowFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: Goods
        },
        {
          path: 'info',
          component: Info
        },
        {
          path: 'ratings',
          component: Ratings
        }
      ]
    }
    
  ]
