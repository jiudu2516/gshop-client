<template>
  <div id="goodsContainer">
    <div class="leftContainer">
      <ul class="navList" ref="leftUl">
        <li @click="changeNavIndex(index)" :class="{active: navIndex === index}" v-for="(good, index) in goods" :key="index">
          {{good.name}}
        </li>
      </ul>
    </div>
    <div class="rightContainer">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57"
                    :src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CartControl from '../../../components/CartControl/CartContral'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    components: {
      CartControl
    },
    data () {
      return {
        tops: [], // 用于放置每个点距离当前滑动顶部的距离
        scrollY: 0, // 页面滚动的距离
      }
    },

    async mounted () {
      // console.log(this.goods) // 第一次执行mounted，数据还未加载进来，执行computed后才有的goods

      if (this.goods) { // 如果有 goods执行_initScroll()
        this._initScroll()
        this._initTops()
      }
      // new BScroll('.leftContainer', {
      //   scrollY: true // 纵向滑动
      // })

      // new BScroll('.rightContainer', {
      //   scrollY: true // 纵向滑动
      // })

      // 商家信息获取  因为订单、评价等都涉及，所以直接写在shop组件
      // let result = await this.$API.getShopDatas()
      // console.log(result)
    },

    computed: {
      ...mapState ({
        goods: state => state.shop.shopDatas.goods
      }),

      // 通过计算属性获取下标
      navIndex () {
        let {tops, scrollY} = this
        let index = tops.findIndex((top, index) => scrollY >= tops[index] && scrollY < tops[index + 1])  // 找出左边li的top的下标
        // this.navIndex !== index  不要再计算属性内部获取计算属性本身的值，死循环
        // console.log(scrollY)
        if (this.leftScroll && index !== this.index) {
          // console.log("滚动了")
          // scrollToElement 滚动到指定的元素
          this.index = index
          this.leftScroll.scrollToElement(this.$refs.leftUl.children[index], 1000)
        }
        // this.navIndex  // 上一次的index
        return index
      }
    },

    methods: {
      _initScroll () { // 自定义的滑动方法前面加  _
        if (this.leftScroll || this.rightScroll) { // 之前生成过BScroll的实例
          this.leftScroll.refresh() // 重新刷新当前的实例
          this.rightScroll.refresh() 
        } else { // 之前没有生成过，newBScroll
          this.leftScroll = new BScroll('.leftContainer', {
            scrollY: true, // 纵向滑动
            click: true // 默认是false 作用：BetterScroll 默认会阻止浏览器的原生 click 事件
          })

          this.rightScroll = new BScroll('.rightContainer', {
            scrollY: true, // 纵向滑动
            // probeType: 1 // 非实时滑动   0 是默认值，为0时不派发scroll事件
            probeType: 2, // 实时滑动  惯性滑动不计算
            // probeType: 3 // 实时滑动  惯性滑动计算
            click: true // 这里如果加上click：true  再点击增加count上会成倍数增加，
                        // 如果不写就是单次增加，要写且要呈单数增加，那么就只给他加上条件
          })
        }

        // 绑定scroll事件
        this.rightScroll.on('scroll', ({x, y}) => {
          // console.log('scroll', y)
          this.scrollY = Math.abs(y)
        })

        this.rightScroll.on('scrollEnd', ({x, y}) => {
          // console.log('scroll', y)
          this.scrollY = Math.abs(y)
        })
      },

      _initTops () { // 动态计算所有li高度累加
        // let lis = this.$refs.rightUl.children // 得到的是伪数组 通过Array.from()将伪数组变为真数组
        let lis = Array.from(this.$refs.rightUl.children)
        // console.log(lis)
        let tops = []
        let top = 0
        tops.push(top)
        /* for (var i = 0; i < lis.length; i++) {
          top += lis[i].clientHeight;
          tops.push(top)
        }
        this.tops = tops
        console.log(tops) */

        // 数组中 reduce的用法
        /* let arr = [1,2,3,4,5]
        arr.reduce((pre, next) => {
          console.log(pre, next)
          pre = pre + next
          return pre
        }, 0) */

        lis.reduce((pre, liItem) => {
          // console.log(pre, liItem)
          pre += liItem.clientHeight
          tops.push(pre)
          return pre // 如果不return pre 会默认返回一个return undefind 
        }, top)

        // 这样做是因为只渲染一次，提高性能
        this.tops = tops
      },

      // 点击左侧里，右侧滑动到相应位置
      changeNavIndex (index) {
        // console.log(event)
        // console.log(this)
        // console.log('index', index)
        // console.log(this.tops[index]) 

        // this.navIndex = index   // 这是No setter
        this.scrollY = this.tops[index]
        // 右侧区域滑动到对应位置
        this.rightScroll.scrollTo(0, -this.scrollY, 1000)
      }
    },
 
    watch: {
      goods () {
        // console.log(this.goods)
        // this.$nextTick组件下一次渲染完毕  组件之间的切换（加载），goods没有发生改变
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl" 
  #goodsContainer
    display flex
    height calc(100vh - 224px)
    /* position absolute
    bottom 0
    top 224px */
    background: #fff;
    overflow hidden
    .leftContainer
      width 80px
      background #f3f5f7
      // calc 可以动态计算高度、宽度
      // height calc(100vh - 224px)
      // vh, vw 视口单位  1vh=1%视口
      // overflow hidden
      .navList
        li
          width 100%
          height 50px
          text-align center
          line-height 50px
          position relative
          &.active
            background #fff
            color $green
          &:after
            content: ''
            width 80%
            height 1px
            background rgba(7,17,27,0.1)
            position absolute 
            bottom 0
            left 10%
    .rightContainer
      flex 1
      // width 295px
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
