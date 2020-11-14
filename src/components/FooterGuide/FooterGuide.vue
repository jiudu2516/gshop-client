<template>
  <footer class="footer_guide">
    <div class="guide_item" @click="goto('/msite')" :class="{on: $route.path === '/msite'}">
      <span>
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </div>
    <div class="guide_item"  @click="goto('/search')" :class="{on: $route.path === '/search'}">
      <span>
        <i class="iconfont icon-search4"></i>
      </span>
      <span>搜索</span>
    </div>
    <div class="guide_item"  @click="goto('/order')" :class="{on: $route.path === '/order'}">
      <span>
        <i class="iconfont icon-dingdan1"></i>
      </span>
      <span>订单</span>
    </div>
    <div class="guide_item"  @click="goto('/profile')" :class="{on: $route.path === '/profile'}">
      <span>
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </div>
  </footer>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'FooterGuide',

    methods: {
      // 编程式路由跳转
      goto(path) { 
        // 跳转至指定的路由路径
        /*   编程式导航： $router
         $route 和 $router 的区别
           1 、 $router  是路由器对象，里边包含路由跳转的方法
           2 、 $route  是路由对象，里边包含当前路径下所有路由信息（path、 params、 meta、 query）

        */
      //  解决重复点击当前路由报错
      //  方案一：点击当前页，没有任何效果
        // if (path !== this.$route.path) {
        //   this.$router.replace(path)
        // }

        // path !== this.$route.path && this.$router.replace(path)

        // 方案二：点击当前页，刷新界面
        if (path!==this.$route.path) {
          // 编程是路由跳转
          this.$router.replace(path)
        } else {
          window.location = path    //  发送一般的http请求   ==>  整个界面会刷新显示
        }
      
      },

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#ccc)
    z-index 100
    display flex
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px
    background-color #fff
    .guide_item
      width 25%
      display flex
      flex-direction column
      text-align center
      &.on
        color $green
      span
        font-size 12px
        margin-top 6px
      .iconfont
        font-size 22px
</style>
