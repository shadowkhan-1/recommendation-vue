<template>
  <div style="margin-top: 40px">
      <favorite class="books-area" ref="booksArea"></favorite>
  </div>
</template>

<script>
import Favorite from './Favorite'

export default {
  name: 'FavoriteIndex',
  components: {Favorite},
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
  /*.home {*/
  /*  width: 80%;*/
  /*  margin-left: auto;*/
  /*  margin-right: auto;*/
  /*  margin-top: -20px;*/
  /*}*/
  /*.books-area {*/
  /*  width: 60%;*/
  /*  margin-left: auto;*/
  /*  margin-right: auto;*/
  /*}*/
</style>
