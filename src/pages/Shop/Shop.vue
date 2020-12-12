<template>
  <div id="shopContainer">
    <ShopHeader/>

    <div class="tabs">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>订餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家信息</router-link>
      </div>
    </div>
    <router-view>

    </router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  export default {
    components: {
      ShopHeader
    },

    async mounted () {
      await this.$store.dispatch('getShopDatasAction')
      // console.log(result)
    },

    computed: {
      ...mapState({
        // 当使用模块化的时候只能使用此种方式映射数据
        initTest: state => state.shop.initTest
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  #shopContainer
    .tabs
      display flex
      bottom-border-1px(#eee)
      .tab-item
        // width 33.3333%
        flex 1
        text-align center
        height 40px
        line-height 40px
        font-size 16px
        a
          display block
          color #333
          position relative
          &.router-link-active
            color $green
            &:after
              content: ''
              width 60px
              height 2px
              background $green
              transform scaleY(0.5)
              position absolute
              bottom 0
              left 50%
              margin-left -30px
</style>
