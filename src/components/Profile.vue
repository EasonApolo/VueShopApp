<template>
  <div class="profile">
    <!--顶部栏-->
    <transition name="slide-left">
      <setting v-show="settingShow" :loginOk="user.loginOk"></setting>
    </transition>
    <div class="user_center">
        <span id="user">个人中心</span>
        <div class="setting-entry" @click="showSetting"></div>
    </div>

    <!--登陆栏-->
    <div class="login">
        <div class="user_head"><div id="img" :style="{backgroundImage:'url('+user.avatar+')'}"></div></div>
        <div class="login_box" v-show="!user.loginOk">
            <div class="login_prompt1" @click="linkTo('lo')">登录 / 注册</div>
            <div class="login_prompt2">点击登陆享受更多优惠！</div>
        </div>
        <div class="login_box" v-show="user.loginOk">
            <div class="login_prompt1">{{user.username}}</div>
            <div class="user_level">{{user.userlevel}}</div>
        </div>
    </div>

    <!--记录栏-->
    <div class="record">
        <div class="row">
            <div class="col">
                <div id="title1" @click="linkTo('brr')">浏览记录</div>
            </div>
            <div class="col">
                <div id="title2" @click="lightShow = true">推荐人</div>
            </div>
            <div class="col">
                <div id="title3">返利记录</div>
            </div>
        </div>
    </div>

    <div class="scrollbar">
      <!--几个选项-->
      <div class="useritem">
          <div class="item" @click="linkTo('bur')"><span class="text">购买记录</span></div>
          <div class="item" @click="linkTo('mr')"><span class="text">我的收藏</span></div>
          <div class="item" @click="linkTo('pp')"><span class="text">积分管理</span> </div>
          <div class="item" @click="linkTo('pr')"><span class="text">支付管理</span></div>
          <div class="item" @click="linkTo('md')"><span class="text">个人资料</span></div>
          <div class="item" ><span class="text">敬请期待</span></div>
      </div>

      <!--消息提示栏-->
      <div class="message-box">
          <div class="row">
            <div v-for="(item, index) in messageBut" :key="item" class="tab-but" :class="{active: show === index}" @click="show = index">
              <div class="title">{{ item }}</div>
            </div>
          </div>
      </div>
      <div class="message">
        <transition name="slide-up" mode="out-in">
          <div v-bind:key="show" class="tab">
            {{ message }}
          </div>
        </transition>
      </div>

    </div>

    <div id="light" class="white_content" :class="{lightShow: lightShow}">
      <div class="wodetj">
        <div id="content1">我的推荐:</div>
        <ul id="content2">
          <li id="li1">姓名1</li>
          <li id="li2">姓名2</li>
          <li id="li3">姓名2</li>
        </ul>
      </div>
      <div class="tjwode">
        <div id="content3">推荐我的:</div>
        <div id="content4">推荐人姓名</div>
      </div>
      <div id="close" @click="lightShow = false"><img width="60px" height="80px" :src="backSrc2"> </div>
    </div>

  </div>
</template>

<script>
import Setting from './Setting'

export default {
  name: 'profile',
  data () {
    return {
      avatar: require('./assets/user_center_default_head.png'),
      settingIcon: require('./assets/设置.png'),
      backSrc: require('./assets/close.png'),
      backSrc2: require('./assets/close 2.png'),
      messageBut: ['系统消息', '我的消息', '收到的评论', '发出的评论'],
      settingShow: false,
      show: 0,
      lightShow: false,
      user: {
        loginOk: false,
        username: '二阶堂天宇',
        userlevel: 2,
        userphone: '',
        avatar: require('./assets/user_center_default_head.png'),
        sex: 0,
        birthday: ''
      }
    }
  },
  components: {
    'setting': Setting
  },
  computed: {
    message: function () {
      switch (this.show) {
        case 0: return '此处显示系统消息'
        case 1: return '此处显示我的消息'
        case 2: return '此处显示我收到的评论'
        case 3: return '此处显示我发出的评论'
      }
    }
  },
  methods: {
    updateUserStatus: function () {
      if (localStorage.userInfo !== undefined && localStorage.userInfo !== null) {
        let objUser = JSON.parse(localStorage.userInfo)
        this.user.loginOk = true
        this.user.username = objUser.name
        this.user.userphone = objUser.phone
        this.user.userlevel = objUser.point
        if (objUser.avatar !== '') {
          this.user.avatar = objUser.avatar
        }
        this.user.sex = objUser.sex
        this.user.birthday = objUser.birthday
      } else {
        this.user.loginOk = false
        this.user.avatar = require('./assets/user_center_default_head.png')
      }
    },
    showSetting: function () {
      this.settingShow = true
    },
    closeSetting: function () {
      this.settingShow = false
    },
    linkTo: function (tar) {
      let eh = this.$root.eventHub
      if (!this.user.loginOk && tar !== 'st') {
        eh.$emit('pushToLogin')
        return
      }
      switch (tar) {
        case 'brr':
          eh.$emit('pushToBrowseRecords')
          break
        case 'st':
          eh.$emit('pushToSetting')
          break
        case 'lo':
          eh.$emit('pushToLogin')
          break
        case 'pp':
          eh.$emit('pushToPointPage', this.user)
          break
        case 'pr':
          eh.$emit('pushToPayRecords')
          break
        case 'bur':
          eh.$emit('pushToBuyRecords')
          break
        case 'mr':
          eh.$emit('pushToMarkRecords')
          break
        case 'md':
          eh.$emit('pushToMyData', this.user)
          break
      }
    }
  },
  watch: {
    '$route': 'updateUserStatus'
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.updateUserStatus()
    })
  },
  mounted () {
    this.$root.eventHub.$on('closeSetting', this.closeSetting)
    this.$root.eventHub.$on('updateUserInfo', this.updateUserStatus)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}

.profile {
  height: 100%;
  height: 100%;
  text-align: left;
  background-color: #F8F8F8;
  font-size: 1rem;
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform .2s ease;
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(100%);
}

.user_center{
    position: relative;
    background-color:#FA5876;
    height:100px;
}
#user{
    position: absolute;
    display:block;
    width: 100%;
    line-height: 3rem;
    font-size:1.2rem;
    color: #FFFFFF;
    text-align: center;
}
.setting-entry {
    $height: 3rem;
    $width: 1.5rem;
    position: absolute;
    top: ($height - $width) / 2;
    right: ($height - $width) / 2;
    width: $width;
    height: $width;
    background-image: url(./assets/setting.png);
    background-repeat: no-repeat;
    background-size: contain;
}

/*登陆栏*/
.login{
    position: relative;
    background-color: white;
    height: 50px;
}

.user_head {
    position: absolute;
    left: 10px;
    top: -20px;
    width: 70px;
    height:70px;
    padding: 2px;
    background: #fff;
    border-radius: 50%;

    #img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }
}

.login_box{
    margin-left: 100px;

    .login_prompt1{
        padding-top:5px;
    }

    .login_prompt2 {
        margin-top: 5px;
        color: #0088cc;
        font-size: 12px;
    }

    .user_level {
        margin-top: 3px;
        position: relative;
        padding-left: 1.5rem;
        line-height: 1rem;
        font-size: 0.875rem;
        width: 1rem;
        background-color: #FD8298;
        border-radius: .5rem;
        color: white;

        &:before {
            content: '';
            position: absolute;
            top: 2px;
            left: 8px;
            width: .75rem;
            height: .75rem;
            background-image: url(./assets/lv.png);
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
}


.scrollbar{
    position: absolute;
    width: 100%;
    overflow-y: scroll;
    top: calc(150px + 3.5rem);
    bottom: 3rem;
}

/*记录信息*/
.row {
    display: -webkit-box;
    display: -webkit-flex;
    height: 3rem;
    background-color: white;
}
.col, .tab-but {
    position: relative;
    -webkit-box-flex:1;
    -webkit-flex:1;
    flex:1;
    text-align:center;

    &:after {
        content: '';
        position: absolute;
        top: 1rem;
        right: 0;
        width: 1px;
        height: 1rem;
        background-color: #EEE;
    }
}

.active {
   color: #42b983;
}

#title1,#title2,#title3,.title {
  margin-top: 14px;
}

/*各种选项*/
.useritem {
    background-color: white;
}
.useritem div {
    height: 2.75rem;
    padding-left: 15px;
    border-bottom: 1px solid #F4F4F4;
}
.useritem div:last-child {
  border: none;
}
.text{
    line-height: 50px;
    height: 100%;
}
.message-box {
    margin-top: 0.5rem;
}
.message{
  position: relative;
  background-color: white;
  padding: 0 1rem;
  height: 5rem;
  overflow: hidden;

  .tab {
    position: absolute;
    height: 100%;
  }

  .slide-up-enter-active, .slide-up-leave-active {
    transition: transform .3s;
  }

  .slide-up-leave-to {
    transform: translateY(-100%);
  }

  .slide-up-enter {
    transform: translateY(-100%);
  }
}

.white_content {
    display: none;
    position: absolute;
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index:1002;
    overflow: auto;
    text-align: center;
}
.lightShow {
  display: block;
}
.wodetj{
    margin: 0 auto;
    margin-top: 50px;
    height:200px;
    width:75%;
    border:7px solid #FA5876;
    border-radius: 7px;
}
.tjwode{
    margin: 0 auto;
    margin-top: 50px;
    height:200px;
    width:75%;
    border:7px solid #FA5876;
    border-radius: 7px;
}
#content1,#content3{
    padding-top: 50px;
    text-align: center;
}
#content2{
    width: 100%;
    text-align: center;
    list-style-type: none;
}
#content4{
    padding-top: 20px;
}
#close{
    margin-top: 50px;
}
</style>
