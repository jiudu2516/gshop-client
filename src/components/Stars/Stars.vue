<template>
    <div class="star" :class="'star-' + size">
      <span class="star-item" :class="item" v-for="(item, index) in starClasses" :key="index"></span>
      <!-- <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item half"></span>
      <span class="star-item off"></span> -->
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Stars',
    props: {
      score: {
        required: true,  // 使用required选项来声明这个参数是否必须传入
        type: Number, // 可以使用type来声明这个参数可以接受的数据的类型，
        default: 5  // 使用default选项来指定当父组件未传入参数时props变量的默认值：
      }
    },

    computed: {
      starClasses () {
        let starArr = []
        let {score} = this

        // 1.全星 0-5
        const onClasses = Math.floor(score)
        for (let i = 0; i < onClasses; i++) {
          starArr.push('on')
        }

        // 2.半星 1 || 0  看评分是否有小数点
        (score - onClasses) > 0 && starArr.push('half')

        // 3.灰星 0-5
        while (starArr.length < 5) {
          starArr.push('off')
        }

        return starArr
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('../../pages/MSite/images/stars/star48_on')
        &.half
          bg-image('../../pages/MSite/images/stars/star48_half')
        &.off
          bg-image('../../pages/MSite/images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('../../pages/MSite/images/stars/star36_on')
        &.half
          bg-image('../../pages/MSite/images/stars/star36_half')
        &.off
          bg-image('../../pages/MSite/images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('../../pages/MSite/images/stars/star24_on')
        &.half
          bg-image('../../pages/MSite/images/stars/star24_half')
        &.off
          bg-image('../../pages/MSite/images/stars/star24_off')
 
</style>
