<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">忘记密码</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="新密码"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="text" v-model="loginForm.email"
                auto-complete="off" placeholder="E-Mail"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-col :span="12">
      <el-input type="text" v-model="loginForm.code"
                auto-complete="off" placeholder="请输入验证码"></el-input>
      </el-col>
      <el-col :span="12">
      <el-button :disabled="!loginForm.username || !loginForm.password || !loginForm.email" type="primary" style="width: 60%;background: #505458;border: none" v-on:click="send" v-show="show">{{loading1 ? '正在发送...' : '发送验证码'}}</el-button>
<!--        <span v-show="!show" class="count">{{count}} s</span>-->
        <el-tag v-show="!show" type="success">{{count}} s</el-tag>
      </el-col>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button :disabled="!loginForm.username || !loginForm.password || !loginForm.email || !loginForm.code" type="primary" style="width: 40%;background: #505458;border: none" v-on:click="getpassword" :loading="loading2">{{loading2 ? '提交中...' : '提交'}}</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
export default{
  data () {
    return {
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
        code: [{required: true, message: '验证码不能为空', trigger: 'blur'}]
      },
      checked: true,
      loginForm: {
        username: '',
        password: '',
        email: '',
        code: ''
      },
      loading1: false,
      loading2: false,
      show: true,
      count: '',
      timer: null
    }
  },
  methods: {
    getpassword () {
      this.loading2 = true
      var _this = this
      this.$axios
        .post('/user/getpassword', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          email: this.loginForm.email,
          name: this.loginForm.code
          // 用name暂时在验证码
        })
        .then(resp => {
          if (resp.data.code === 'SUCCESS') {
            this.loading2 = false
            this.$alert('更改密码成功', '提示', {
              confirmButtonText: '确定'
            })
            _this.$router.replace('/login')
          } else {
            this.loading2 = false
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
    },
    send () {
      this.loading1 = true
      this.$axios
        .post('/user/getcode', {
          username: this.loginForm.username,
          email: this.loginForm.email
        })
        .then(resp => {
          this.loading1 = false
          if (resp.data.code === 'SUCCESS') {
            if (!this.timer) {
              this.show = false
              // eslint-disable-next-line no-undef
              this.count = 60
              this.show = false
              this.timer = setInterval(() => {
                // eslint-disable-next-line no-undef
                if (this.count > 0 && this.count <= 60) {
                  this.count--
                } else {
                  this.show = true
                  clearInterval(this.timer) // 清除定时器
                  this.timer = null
                  this.show = true
                }
              }, 1000)
            }
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    }
  }
}
</script>
<style>
  #paper {
    /*background:url("../assets/img/bg/eva1.jpg") no-repeat;*/
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
