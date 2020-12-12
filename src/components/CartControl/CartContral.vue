<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-jian4" v-show="food.count>0" @click="changeFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-jia5" @click="changeFoodCount(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: { // 是通过vuex中映射而来的，所以还是要到vuex中去修改mutation
        required: true,
        type: Object
      }
    },
    methods: {
      changeFoodCount(isAdd) {
        this.$store.dispatch('changeFoodCount', {isAdd, food: this.food})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .icon-jian4
      display: inline-block
      padding 2px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave
        transfrom: translateX(20px) rotate(180deg)
        opacity 0
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 2px
      line-height: 24px
      text-align: center
      font-size: 16px
      color: rgb(147, 153, 159)
    .icon-jia5
      display: inline-block
      padding: 2px
      line-height: 24px
      font-size: 24px
      color $green
 
</style>
