<template>
  <div>
    <el-menu
      :default-active="path"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      style="min-width: 1300px">
      <el-menu-item v-show="item.show" v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 15px;right: 50%;font-size: 20px;font-weight: bold">图书推荐系统</span>
      <el-input
        placeholder="快速搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px;position:absolute;margin-top: 12px;right: 18%"
        v-model="keywords">
      </el-input>
      <el-dropdown style="width: 100px;position:absolute;margin-top: 15px;right: 0%" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
          {{loginForm.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">注销</el-dropdown-item>
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item >{{loginForm.rule === '1' ? '管理员' : loginForm.rule === '3' ? '超级管理员' : '普通用户'}}</el-dropdown-item>
<!--            <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      // navList: [
      //   {name: '/index', navItem: '首页', show: true},
      //   {name: '/jotter', navItem: '笔记本', show: true},
      //   {name: '/library', navItem: '图书馆', show: true},
      //   // eslint-disable-next-line eqeqeq
      //   {name: '/admin/dashboard', navItem: '管理中心', show: this.toshow}
      // ],
      navList: [],
      loginForm: {
        username: this.$store.state.user.username,
        lasttestTime: this.$store.state.user.lasttestTime,
        rule: this.$store.state.user.rule
      },
      keywords: '',
      path: '',
      drawer: false
    }
  },
  created: function () {
    // 判断是否为admin
    // eslint-disable-next-line camelcase
    var show_x = this.$store.state.user.rule
    // eslint-disable-next-line camelcase
    if (show_x === '1' || show_x === '3') {
      this.toshow = true
    } else this.toshow = false
    var _navList = [{name: '/index', navItem: '首页', show: true},
      {name: '/collection', navItem: '我的收藏', show: true},
      {name: '/library', navItem: '图书馆', show: true},
      {name: '/admin', navItem: '管理中心', show: this.toshow}]
    this.navList = _navList
  },
  mounted: function () {
    // 判断是否为admin
    // eslint-disable-next-line camelcase
    var show_x = this.$store.state.user.rule
    // eslint-disable-next-line camelcase
    if (show_x === '1' || show_x === '3') {
      this.toshow = true
    }
    // 获得第一级路由，以设置导航栏高亮
    var x = this.$route.path.indexOf('/', 1)
    if (x !== -1) {
      this.path = this.$route.path.substring(0, x)
    } else {
      this.path = this.$route.path
    }
  },
  computed: {
    // username () {
    //   let username = this.$store.state.user.username
    //   return username || this.name
    // },
    hoverBackground () {
      return '#ffd04b'
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      // eslint-disable-next-line eqeqeq
      if (command == 'loginout') {
        // this.$common.removeSessionStorage('token')
        this.$store.commit('logout')
        this.$router.push('/login')
        // eslint-disable-next-line eqeqe,eqeqeq
      } else if (command == 'changeZh') {
        this.$i18n.locale = 'zh_CN'
        // eslint-disable-next-line eqeqeq
      } else if (command == 'changeEn') {
        this.$i18n.locale = 'en_US'
        // eslint-disable-next-line eqeqeq
      } else if (command == 'userinfo') {
        this.$router.push('/userindex')
      }
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  /*span {*/
  /*  pointer-events: none;*/
  /*}*/
  .el-dropdown-link{
    color: #c54eff;
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
