<template>
  <div class="profile">
    <!--顶部栏-->
    <div class="user_center">
        <span id="user">个人中心</span>
        <div class="setting" @click="linkTo('st')"></div>
    </div>

    <!--登陆栏-->
    <div class="login">
        <div class="user_head"><img id="img" :src="avatar"></div>
        <div class="login_box" v-show="!loginOk">
            <div class="login_prompt1" @click="linkTo('lo')">登录 / 注册</div>
            <div class="login_prompt2">点击登陆享受更多优惠！</div>
        </div>
        <div class="login_box" v-show="loginOk">
            <div class="login_prompt1">{{username}}</div>
            <div class="user_level">{{userlevel}}</div>
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
          <div class="item" @click="linkTo('pp')"><span class="text">积分管理</span> </div>
          <div class="item" @click="linkTo('pr')"><span class="text">支付管理</span></div>
          <div class="item" @click="linkTo('md')"><span class="text">个人资料</span></div>
          <div class="item" ><span class="text">敬请期待</span></div>
      </div>

      <!--消息提示栏-->
      <div class="message-box">
          <div class="row">
              <div id="bt1" @click="show = 0" :class="{active: show === 0}">
                  <div class="title">系统消息</div>
              </div>
              <div id="bt2" @click="show = 1" :class="{active: show === 1}">
                  <div class="title">我的消息</div>
              </div>
              <div id="bt3" @click="show = 2" :class="{active: show === 2}">
                  <div class="title">收到的评论</div>
              </div>
              <div id="bt4" @click="show = 3" :class="{active: show === 3}">
                  <div class="title">发出的评论</div>
              </div>
          </div>
      </div>
      <div class="message">
        <div v-show="show === 0" id="tab1">
            此处显示系统消息
        </div>
        <div v-show="show === 1" id="tab2">
            此处显示我的消息
        </div>
        <div v-show="show === 2" id="tab3">
            此处显示我收到的评论
        </div>
        <div v-show="show === 3" id="tab4">
            此处显示我发出的评论
        </div>
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

export default {
  name: 'profile',
  data () {
    return {
      avatar: require('./assets/user_center_default_head.png'),
      settingIcon: require('./assets/设置.png'),
      backSrc: require('./assets/close.png'),
      backSrc2: require('./assets/close 2.png'),
      show: 0,
      lightShow: false,
      loginOk: false,
      username: '二阶堂天宇',
      userlevel: 2
    }
  },
  methods: {
    linkTo: function (tar) {
      let eh = this.$root.eventHub
      if (!this.loginOK && tar !== 'st') {
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
          eh.$emit('pushToPointPage')
          break
        case 'pr':
          eh.$emit('pushToPayRecords')
          break
        case 'bur':
          eh.$emit('pushToBuyRecords')
          break
        case 'md':
          eh.$emit('pushToMyData')
          break
      }
    }
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
  font-size: 0.875rem;
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
.setting{
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
        width:100%;
        border-radius: 50%;
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
.col,#bt1,#bt2,#bt3,#bt4 {
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
    background-color: white;
    height: 5rem;
}
#tab1,#tab2,#tab3,#tab3{
    padding-left: 10px;
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
