<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
export default {
  name: 'CollectionIndex',
  components: {SideMenu}
}
</script>

<style scoped>
  .home {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
  }

</style>
