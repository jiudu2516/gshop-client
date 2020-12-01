<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isShowSms}" @click="isShowSms=true">短信登录</a>
          <a href="javascript:;" :class="{on: !isShowSms}" @click="isShowSms=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isShowSms}">
            <section class="login_message">
              <input name="phone" v-model="phone" v-validate="'required|phone'" type="tel" maxlength="11" placeholder="手机号">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button :disabled="!isRightPhone || countDownTime > 0" 
                      class="get_verification"
                      :class="{right_phone_number: isRightPhone}" 
                      @click.prevent="getCode">{{countDownTime > 0 ? `${countDownTime}s重新获取验证码` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input name="code" v-model="code" v-validate="'required|code'" type="tel" maxlength="8" placeholder="验证码">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isShowSms}">
            <section>
              <section class="login_message">
                <input name="username" v-model="username" v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input name="password" v-model="password" v-validate="'required'" :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码">
                <span style="color: red;" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input name="captcha" v-model="captcha" v-validate="'required'" type="text" maxlength="11" placeholder="验证码">
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img class="get_verification" :src="`http://localhost:4000/captcha`" ref="captcha" @click="updateCaptcha" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.push('./profile')">
        <i class="iconfont icon-fanhui3"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'login',
    data () {
      return {
        isShowSms: false,  // true：显示短信登录界面   false：显示密码登录界面 
        phone: '', // 手机号
        code: '',  // 短信验证码
        username: '', // 用户名
        password: '', // 密码
        captcha: '', // 图形验证码
        countDownTime: 0, // 倒计时
        isShowPwd: false,  // 密码默认是false 不可见
      }
    },

    computed: {
      isRightPhone () {
        // 验证是不是一个正确的手机号  
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
      }
    },

    methods: {
      async getCode () {
        // 进行倒计时时间显示效果
        this.countDownTime = 5
        // 开启倒计时
        let intervalId = setInterval(() => {
          this.countDownTime--
          this.countDownTime === 0 && clearInterval(intervalId)  // 关闭定时器
        }, 1000)

        // 发送请求请求后台给手机发送验证码
        let result = await this.$API.reqSendCode({phone: this.phone})
        // console.log(result)
        if (result.code === 0) {
          alert('验证码已发送')
        } else {
          alert(result.msg)
        }
      },

      // 表单登录验证
      async login () {
        // 1 前端验证
        let names
        if (this.isShowSms) {
          names = ['phone', 'code']
        } else {
          names = ['username', 'password', 'captcha']
        }
        const success = await this.$validator.validateAll(names)  // 对指定的所有表单项进行验证
        // console.log(success)

        let result
        if (success) {
          // 前端验证成功
          const {isShowSms, phone, code, username, password, captcha} = this
         
         // 2 后端验证
          //  1）收集表单项的数据
          // 2) 发送请求  
          // 判断用户登录方式
          if (isShowSms) {
            // 短信登录
            result = await this.$API.reqLoginSms({phone, code})
            if (result.code === 1) {
              // 登陆失败
              alert("验证码错误")
              this.code = ''
            }
          } else {
            // 用户名密码登录
            result = await this.$API.reqLoginPwd({username, password, captcha})
            if (result.code === 1) {
              // 登陆失败
              alert("用户名/密码/验证码错误")
              this.updateCaptcha()
              this.captcha = ''
            }
          }

          // 统一处理登陆成功
          if (result.code === 0) {
            // 登陆成功，跳转到profile
            alert('登陆成功')

            // 将user保存到vuex的state中
            const user = result.data
            console.log(user)
            this.$store.dispatch('saveUser', user)

            this.$router.push({path: '/profile'})
          }/*  else {
            alert('result.msg')
          } */

        } else {
          // 前端验证失败
          alert('前端验证失败')
        }
      
      },

      // 切换一次性图片验证码
      async updateCaptcha () {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time' + Date.now()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
    
</style>
