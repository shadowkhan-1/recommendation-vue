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
      path: ''
    }
  },
  created: function () {
    // 判断是否为admin
    // eslint-disable-next-line camelcase
    var _navList = [
      {name: '/collection/favorite', navItem: '收藏中心', show: true, classname: 'el-icon-user-solid'},
      {name: '/collection/recommend', navItem: '系统推荐', show: true, classname: 'el-icon-s-tools'}
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
