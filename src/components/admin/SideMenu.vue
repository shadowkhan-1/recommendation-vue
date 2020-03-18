<template>
  <el-menu
    :default-active="path"
    router
    class="categories"
    active-text-color="red">
    <el-menu-item v-show="item.show" v-for="(item,i) in navList" :key="i" :index="item.name">
      <i :class="item.classname"></i>
      {{ item.navItem }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      navList: [],
      toshow1: false,
      toshow2: false,
      path: ''
    }
  },
  created: function () {
    // 判断是否为admin
    // eslint-disable-next-line camelcase
    var show_x = this.$store.state.user.rule
    // eslint-disable-next-line camelcase
    if (show_x === '1' || show_x === '3') {
      this.toshow1 = true
      // eslint-disable-next-line camelcase
    }
    // eslint-disable-next-line camelcase
    if (show_x === '3') {
      this.toshow2 = true
    }
    var _navList = [
      {name: '/admin/useradmin', navItem: '用户管理', show: this.toshow1, classname: 'el-icon-user-solid'},
      {name: '/admin/bookadmin', navItem: '图书管理', show: this.toshow1, classname: 'el-icon-s-management'},
      {name: '/admin/ruleadmin', navItem: '角色管理', show: this.toshow2, classname: 'el-icon-s-tools'}
    ]
    this.navList = _navList
  },
  mounted: function () {
    // 获得第一级路由，以设置导航栏高亮
    this.path = this.$route.path
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleSelect (key, keyPath) {
    //   this.cid = key
    //   this.$emit('indexSelect')
    // }
  }
}
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    left: -600px;
    top: 100px;
    width: 150px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
