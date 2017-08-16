<template>
  <transition name="slide-up">
  <div class="login">
    <div id="header">
      <div id="back" @click="back"></div>
      <!--此处插入APP图标或者名字-->
    </div>
    <transition name="slide-fade">
      <div class="main" v-show="show === 0">
        <form class="login-wrapper">
          <div class="login-input li-user">
            <input type="text" data-valid="none" placeholder="请输入用户名/手机号" v-model="signinPhone"/>
          </div>
          <div class="login-input li-pass">
            <input type="password" date-valid="none" placeholder="请输入密码" v-model="signinPassword"/>
            <div class="forget-password"></div>
          </div>
          <button id="login-submit" type="submit" @click.prevent="signin">登&nbsp;&nbsp;录</button>
        </form>
        <div class="register">
          <div class="re-1" @click="show = 1">手机快速注册</div>
          <div class="re-2" @click="show = 2">忘记密码？</div>
        </div>
        <div class="other">
          <div class="o-header">
            <hr />
            <span>其它登录方式</span>
          </div>
          <div class="o-body">
            <div class="o-option">
              <div class="o-icon oi-wx" id="weixin"></div>
              <span class="o-tag">微信</span>
            </div>
            <div class="o-option">
              <div class="o-icon oi-qq" id="qq"></div>
              <span class="o-tag">QQ</span>
            </div>
            <div class="o-option">
              <div class="o-icon oi-wb" id="weibo"></div>
              <span class="o-tag">新浪微博</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="main" v-show="show === 1">
        <form class="login-wrapper">
          <div class="login-input li-user">
            <input type="text" data-valid="none" placeholder="请输入手机号" v-model="signupPhone"/>
            <div class="get-captcha" v-show="!captchaSent" @click="getCaptcha">获取验证码</div>
            <div class="get-captcha" v-show="captchaSent">{{curCaptchaCool}}s后重发</div>
          </div>
          <div class="login-input li-captcha">
            <input date-valid="none" placeholder="请输入短信中的验证码" />
          </div>
          <div class="login-input li-pass">
            <input type="password" date-valid="none" placeholder="请输入密码(6-16字符)" v-model="signupPassword" />
          </div>
          <button id="login-submit" type="submit" @click.prevent="signup">注&nbsp;&nbsp;册</button>
        </form>
        <div class="register">
          <div class="re-1" @click="show = 0">已注册？前往登录</div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="main" v-show="show === 2">
        <form class="login-wrapper">
          <div class="login-input li-user">
            <input type="text" data-valid="none" placeholder="请输入手机号" />
            <div class="get-captcha" v-show="!captchaSent" @click="getCaptcha">获取验证码</div>
            <div class="get-captcha" v-show="captchaSent">{{curCaptchaCool}}s后重发</div>
          </div>
          <div class="login-input li-captcha">
            <input date-valid="none" placeholder="请输入短信中的验证码" />
          </div>
          <div class="login-input li-pass">
            <input type="password" date-valid="none" placeholder="请输入密码(6-16字符)" />
          </div>
          <button id="login-submit" type="submit">设置新密码</button>
        </form>
        <div class="register">
          <div class="re-1" @click="show = 0">返回登录界面</div>
        </div>
      </div>
    </transition>
  </div>
  </transition>
</template>

<script>

export default {
  name: 'login',
  props: [''],
  components: {
  },
  data () {
    return {
      show: 0,
      captchaSent: false,
      getCaptchaCool: 30,
      curCaptchaCool: 0,
      signinPhone: '',
      signinPassword: '',
      signupPhone: '',
      signupPassword: '',
      submitDisabled: false
    }
  },
  computed: {
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    getCaptcha: function () {
      this.captchaSent = true
      this.curCaptchaCool = this.getCaptchaCool
      let i = setInterval(() => {
        this.curCaptchaCool -= 1
        if (this.curCaptchaCool === 0) {
          clearInterval(i)
          this.captchaSent = false
        }
      }, 1000)
    },
    signup: function () {
      if (this.submitDisabled) return
      this.submitDisabled = true
      setTimeout(() => {
        this.submitDisabled = false
      }, 3000)
      let formData = new FormData()
      formData.append('phone', this.signupPhone)
      formData.append('password', this.signupPassword)
      fetch('http://forvera.me/signup.php', {
        method: 'POST',
        headers: {},
        body: formData
      }).then((response) => {
        if (response.ok) {
          return response.json()
        }
      }).then((json) => {
        if (json.status === 'ok') {
          localStorage.userInfo = JSON.stringify(json)
          this.$root.eventHub.$emit('pushToProfile', json)
        } else if (json.status.indexOf('Duplicate') !== -1) {
          this.$root.eventHub.$emit('showNotification', '手机号已绑定')
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    signin: function () {
      console.log('signin!')
      if (this.submitDisabled) return
      this.submitDisabled = true
      setTimeout(() => {
        this.submitDisabled = false
      }, 3000)
      let formData = new FormData()
      formData.append('phone', this.signinPhone)
      formData.append('password', this.signinPassword)
      fetch('http://forvera.me/signin.php', {
        method: 'POST',
        headers: {},
        body: formData
      }).then((response) => {
        if (response.ok) {
          return response.json()
        }
      }).then((json) => {
        if (json.status === 'ok') {
          localStorage.userInfo = JSON.stringify(json)
          this.$root.eventHub.$emit('pushToProfile', json)
        } else if (json.status.indexOf('Bad password') !== -1) {
          this.$root.eventHub.$emit('showNotification', '密码错误')
        } else if (json.status.indexOf('Phone not signup') !== -1) {
          this.$root.eventHub.$emit('showNotification', '手机号尚未注册')
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a{
  color:#FB5876;
  text-decoration: none;
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform .2s;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
}

.login {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  background-color: white;
  z-index: 1;
}

#header{
  height: 8rem;
  background-color:#FA5876 ;

  #back{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 1rem;
    top: .75rem;
    z-index: 1;
    background-image: url(./assets/close3.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter {
  transform: translateX(100%);
}
.slide-fade-leave-to {
  transform: translateX(-100%);
}

.main {
  position: absolute;
  width: 100%;
}

.login-wrapper {
  margin: 0 1rem;
  border-color:#E5EAE4;
  text-align: center;

  .login-input {
    position: relative;
    margin-top: 1rem;
    height: 2.5rem;
    border-bottom: 1px solid #EEE;
    padding-left: 2.5rem;
    text-align: left;

    &:before {
      content: '';
      position: absolute;
      top: .625rem;
      left: .625rem;
      width: 1.25rem;
      height: 1.25rem;
      background-repeat: no-repeat;
      background-size: cover;
    }

    & > input {
      height: 2.5rem;
      padding: 0;
      border: 0;
      font-size: 1rem;
      outline: none;  
    }

    .get-captcha {
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 2.5rem;
      font-size: 0.875rem;
      color: #8E8E8E;
    }
  }

  .li-user:before {
    background-image: url(./assets/user.png);
  }

  .li-pass:before {
    background-image: url(./assets/pass.png);
  }
  .li-captcha:before {
    background-image: url(./assets/captcha.png);
  }

  #login-submit {
    margin-top: 1rem;
    width: 80%;
    height: 2rem;
    background-color: #FA5875;
    color: white;
    border-radius: 1rem;
    outline: none;
    border:none;
    font-size: 1rem;
  }
}

.register {
  margin: 2rem auto 0 auto;
  width: 80%;
  font-size:0.875rem;
  color:#FB5876;
  height:1rem;

  .re-1, .re-2{
    height: 1rem;
  }

  .re-1 {
    float:left;
  }
  .re-2 {
    float:right;
  }
}

.other {
  margin-top: 4rem;
  font-size: 0.875rem;

  .o-header {
    position: relative;
    margin: 0 auto;
    width: 80%;
    height: 1rem;

    & > hr {
      position: absolute;
      margin: 7.5px 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border: 0;
      background-color: #FB5876;
    }

    & > span {
      position: relative;
      display: inline-block;
      width: 6rem;
      line-height: 1rem;
      font-size: 0.875rem;
      color: #FB5876;
      background-color: white;
      z-index: 1;
    }
  }

  .o-body {
    margin: 1rem auto 0 auto;
    width: 80%;
    display: flex;
    flex-flow: row;

    .o-option {
      display: inline-block;
      width: 33.3%;

      .o-icon {
        margin: 0 auto 0.5rem auto;
        width: 2.5rem;
        height: 2.5rem;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .oi-qq {
        background-image: url(./assets/qq.png);
      }

      .oi-wx {
        background-image: url(./assets/wx.png);
      }

      .oi-wb {
        background-image: url(./assets/wb.png);
      }

      .o-tag {
        font-size: 0.75rem;
        color: #FA5876;
      }
    }
  }
}
</style>
