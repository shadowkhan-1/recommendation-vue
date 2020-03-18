<template>
  <div class="home">
    <el-row>
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <view-switch class="switch"></view-switch>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.isbn">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.bookTitle}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.bookAuthor}}</span> /
          <span>{{item.publisher}}</span> /
          <span>{{item.yearOfPublication}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.isbn}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.imageUrlS" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.bookTitle | ellipsis}}</a>
            </div>
          </div>
          <div class="author">{{item.bookAuthor | ellipsis}}
            <div style="float: right"><i v-on:click="favorite(item.isbn)" :class= "[item.favoriteState ? 'el-icon-star-on' : 'el-icon-star-off']" :id=item.isbn></i></div>
          </div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import SearchBar from '../SearchBar'
import ViewSwitch from '../ViewSwitch'

export default {
  name: 'recommend',
  // 过滤器，超出用...显示
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 11) {
        return value.slice(0, 11) + '...'
      }
      return value
    }
  },
  components: {SearchBar, ViewSwitch},
  data () {
    return {
      books: [],
      currentPage: 1,
      pagesize: 18,
      classname: -1
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    loadBooks () {
      var _this = this
      this.$axios.get('/recommend/getrecommend', {
        params: {
          userId: this.$store.state.user.userid
        }
      }).then(resp => {
        if (resp && resp.data.code === 'SUCCESS') {
          _this.books = resp.data.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    searchResult () {
      var _this = this
      this.$axios
        .post('/bxBooks/search', {
          keywords: this.$refs.searchBar.keywords,
          userId: this.$store.state.user.userid
        }).then(resp => {
          if (resp && resp.data.code === 'SUCCESS') {
            _this.books = resp.data.data
          }
        })
    },
    favorite (isbn) {
      var className = document.getElementById(isbn).className
      if (className === 'el-icon-star-off') {
        this.$axios
          .post('/userFavorite/addfavorite', {
            userId: this.$store.state.user.userid,
            isbn: isbn,
            username: this.$store.state.user.username
          }).then(resp => {
            if (resp && resp.data.code === 'SUCCESS') {
              this.$message('收藏成功!')
              document.getElementById(isbn).className = 'el-icon-star-on'
            }
          })
      } else {
        this.$axios
          .post('/userFavorite/removefavorite', {
            userId: this.$store.state.user.userid,
            isbn: isbn,
            username: this.$store.state.user.username
          }).then(resp => {
            if (resp && resp.data.code === 'SUCCESS') {
              document.getElementById(isbn).className = 'el-icon-star-off'
              this.$message('取消收藏!')
            }
          })
      }
    }
  }
}
</script>
<style scoped>
  .home {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
  }

  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 800px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>
