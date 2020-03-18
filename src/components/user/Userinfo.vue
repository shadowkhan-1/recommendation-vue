<template>
  <div class="home">
  用户名:<el-sl-panel>{{tableData.username}}</el-sl-panel>
    上次登录时间:<el-sl-panel>{{tableData.lastestTime}}</el-sl-panel>
  </div>
</template>

<style>
  .home {
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
  }
</style>

<script>
export default {
  data () {
    return {
      tableData:
        {
          lastestTime: this.$store.state.user.lastestTime,
          username: this.$store.state.user.username,
          name: this.$store.state.user.name
        }
    }
  }
}
</script>
