<template>
  <div class="mydata">
    <div class="top">
      <div id="text">个人资料</div>
      <div id="back" @click="back"></div>
    </div>
    <form id="form">
      <div class="part">
      <div class="head head-avatar">
        <div class="t">头像</div>
        <div class="input-head-wrapper">
          <div id="input-img" :style="{backgroundImage:'url('+user.avatar+')'}"></div>
          <input type="file" class="input-head" @click="fileChange($event)"/>
        </div>
      </div>
      <div class="head">
        <div class="t">昵称</div>
        <input placeholder="在此输入昵称" type="text" v-model="user.name">
      </div>
      <div class="head">
        <div class="t">性别</div>
        <select v-model="user.sex">
          <option value="">空</option>
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </div>
      <div class="head">
        <div class="t">生日</div>
        <input type="date" v-model="user.birthday" min="1950-01-01" max="2017-12-31">
      </div>
      </div>
      <div class="part">
      <div class="head head-submit">
        <button id="submit" type="submit" @click.prevent="submit">保存</button>
      </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'mydata',
  props: [],
  components: {
  },
  data () {
    return {
      setnameshow: false,
      user: {
        name: '',
        sex: '',
        birthday: '',
        phone: '',
        avatar: require('./assets/user_center_default_head.png'),
        hasNewAvatar: false
      }
    }
  },
  methods: {
    back: function () {
      window.history.back(-1)
    },
    fetchData: function () {
      let from = this.$route.query.objUser
      this.user.name = from.username
      this.user.phone = from.userphone
      this.user.avatar = from.avatar
      this.user.birthday = from.birthday
      this.user.sex = from.sex
    },
    fileChange: function (e) {
      if (window.imagePicker !== undefined) {
        e.preventDefault()
        window.imagePicker.getPictures(
        results => {
          if (results[0] !== undefined && results[0] !== '') {
            this.user.avatar = results[0]
            this.hasNewAvatar = true
          }
        }, error => {
          console.log('Error: ' + error)
        }, {
          maximumImagesCount: 1
        })
      }
    },
    submit: function () {
      if (window.imagePicker !== undefined && this.hasNewAvatar) {
        var options = new window.Fuo()
        options.fileKey = 'file'
        options.fileName = this.user.avatar.substr(this.user.avatar.lastIndexOf('/') + 1)
        var params = {}
        params.phone = this.user.phone
        options.params = params
        var ft = new window.Ft()
        var SERVER = 'http://forvera.me/upload.php'
        ft.upload(this.user.avatar, encodeURI(SERVER), r => {
          let server = 'http://forvera.me/modify.php'
          let formData = new FormData()
          formData.append('phone', this.user.phone)
          formData.append('username', this.user.name)
          formData.append('sex', this.user.sex)
          formData.append('birthday', this.user.birthday)
          fetch(server, {
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
              this.$root.eventHub.$emit('showNotification', '修改成功')
              this.$root.eventHub.$emit('pushToProfile', json)
            }
          }).catch((error) => {
            console.error(error)
          })
          console.log('上传成功! Code = ' + r.responseCode)
        }, error => {
          alert('上传失败! Code = ' + error.code)
        }, options)
      } else if (window.imagePicker !== undefined && !this.hasNewAvatar) {
        let server = 'http://forvera.me/modify.php'
        let formData = new FormData()
        formData.append('phone', this.user.phone)
        formData.append('username', this.user.name)
        formData.append('sex', this.user.sex)
        formData.append('birthday', this.user.birthday)
        fetch(server, {
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
            this.$root.eventHub.$emit('showNotification', '修改成功')
            this.$root.eventHub.$emit('pushToProfile', json)
          }
        }).catch((error) => {
          console.error(error)
        })
      } else if (window.imagePicker === undefined) {
        this.$root.eventHub.$emit('showNotification', '啊哦~您的设备上不支持修改个人信息（￣ε￣*）')
      }
    }
  },
  mounted () {
    let date = new Date()
    let dstr = '' + date.getFullYear()
    dstr += '-'
    let m = (date.getMonth() + 1)
    dstr += m < 10 ? '0' + m : m
    dstr += '-'
    let d = date.getDate()
    dstr += d < 10 ? '0' + d : d
    this.user.birthday = dstr
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchData()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mydata {
  position: relative;
  height: 100%;
  background-color: #F4F4F4;
  text-align: left;
  z-index: 1;
}
.top{
  position: relative;
  background-color: #FA5876;
  height: 3rem;
}
#back{
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  left: 1rem;
  top: .75rem;
  z-index: 1;
  background-image: url(./assets/back.png);
  background-size: contain;
  background-repeat: no-repeat;
}
#text{
  position: absolute;
  width: 100%;
  line-height: 3rem;
  font-size:1.2rem;
  color: #FFFFFF;
  text-align: center;
}
.part {
  margin-bottom: 0.5rem;
  background-color: white;
}
.head{
  position: relative;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #F8F8F8;
  line-height: 3rem;
}
.head-avatar {
  height: 4rem;
  line-height: 4rem;
}
#input-img {
  width: 3rem;
  height: 3rem;
  background-size: cover;
  background-repeat: no-repeat;
}

input[type=date], input[type=text], select {
  margin-right: 1rem;
  padding: 0;
  height: 100%;
  float: right;
  color: #757575;
  border: 0;
  outline: none;
  font-size: .875rem;
  text-align: right;
}

select, input[type=date] {
  -webkit-appearance: none;
  -moz-appearance: none;
}
.t{
  float: left;
  margin-left: 1rem;
}
.input-head-wrapper {
  position: relative;
  margin-right: 1rem;
  margin-top: .5rem;
  width: 3rem;
  height: 3rem;
  float: right;
  color: #757575;
  font-size: .875rem;
  text-align: right;
  background-image: url(./assets/user_center_default_head.png);
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  overflow: hidden;
}
.input-head{
  position: absolute;
  left: 0;
  top: 0;
  width: 3rem;
  height: 3rem;
  opacity: 0;
}
.head-submit {
  margin-top: 1.75rem;
  height: 2.25rem;
}
#submit {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  background-color: #B8B8B8;
  font-size: 1rem;
  color: white;
  outline: none;
}
</style>
