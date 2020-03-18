<template>
  <div style="margin-top: 40px">
    <recommend></recommend>
  </div>
</template>

<script>
import Recommend from './Recommend'
export default {
  name: 'RecommendIndex',
  components: {Recommend},
  methods: {
    listByCategory () {
      var _this = this
      var cid = this.$refs.sideMenu.cid
      var url = 'categories/' + cid + '/books'
      this.$axios.get(url).then(resp => {
        if (resp && resp.status === 'SUCCESS') {
          _this.$refs.booksArea.books = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
