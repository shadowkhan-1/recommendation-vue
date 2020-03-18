<template>
  <div class="home">
    <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
    <div style="float:right">
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="addbook()" round>添加图书</el-button>
    </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%">
      <el-table-column
        label="ISBN"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span style="margin-left: 10px">{{scope.row.isbn}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图书标题"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <p>图书标题: {{scope.row.bookTitle}}</p>
            <div slot="reference">
              <i class="el-icon-document"></i>
              <span style="margin-left: 10px">{{scope.row.bookTitle | ellipsis}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="图书作者"
        width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <p>图书作者: {{scope.row.bookAuthor}}</p>
            <div slot="reference">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.bookAuthor | ellipsis}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="出版社"
        width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>出版社: {{ scope.row.publisher }}</p>
            <p>出版日期: {{ scope.row.yearOfPublication }}</p>
            <p>图片地址: {{ scope.row.imageUrlS }}</p>
            <p>图片地址: {{ scope.row.imageUrlM }}</p>
            <p>图片地址: {{ scope.row.imageUrlL }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.publisher | ellipsis}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">{{scope.row.isDeleted == '0' ? '删除' : '还原' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="图书信息" :visible.sync="dialogFormVisible" >
      <el-form :model="form" ref="bookform" label-position="left">
        <el-form-item prop="bookTitle" label="图书标题" :label-width="formLabelWidth">
          <el-input v-model="form.bookTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="bookAuthor" label="图书作者" :label-width="formLabelWidth">
          <el-input v-model="form.bookAuthor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="publisher" label="出版社" :label-width="formLabelWidth">
          <el-input v-model="form.publisher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="yearOfPublication" label="出版日期" :label-width="formLabelWidth">
          <el-input v-model="form.yearOfPublication" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="imageUrlS" label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.imageUrlS" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="imageUrlM" label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.imageUrlM" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="imageUrlL" label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.imageUrlL" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('bookform')">取 消</el-button>
        <el-button type="primary" @click="handleEditChangeSend(todo,form)">{{loading ? '提交中...' : '确 定'}}</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
import SearchBar from '../SearchBar'
import {formatDate} from '../../util/formatDate'
export default {
  name: 'UserAdmin',
  components: {SearchBar},
  filters: {
    // 方法一: yyyy-MM-dd hh:mm
    formatDate (time) {
      if (time.toString().length === 10) {
        time = time * 1000
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 11) {
        return value.slice(0, 11) + '...'
      }
      return value
    }
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 50,
      dialogFormVisible: false,
      dialogTableVisible: false,
      formLabelWidth: '100px',
      todo: 'editbook',
      form: [],
      // eslint-disable-next-line vue/no-reserved-keys
      _form: [],
      loading: false
    }
  },
  mounted: function () {
    this.getbooks()
  },
  methods: {
    getbooks () {
      var _this = this
      this.$axios
        .get('/bxBooks/getbooks', {
          params: {
            rule: this.$store.state.user.rule,
            currentPage: this.currentPage - 1,
            userId: this.$store.state.user.userid,
            pagesize: this.pagesize * 100
          }
        }).then(resp => {
          if (resp && resp.data.code === 'SUCCESS') {}
          _this.tableData = resp.data.data
        }).catch(failResponse => {

        })
    },
    searchResult () {
      var _this = this
      this.$axios
        .post('/bxBooks/search', {
          keywords: this.$refs.searchBar.keywords
        }).then(resp => {
          if (resp && resp.data.code === 'SUCCESS') {
            _this.tableData = resp.data.data
          }
        })
    },
    addbook () {
      this.dialogFormVisible = true
      this.todo = 'addbook'
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    handleEdit (row) {
      this.dialogFormVisible = true
      this.form = row
      // 传值防止引传递变化数值会跟着变化,数组、对象、值都适用
      this._form = JSON.parse(JSON.stringify(this.form))
    },
    handleEditChangeSend (todo, form) {
      if (todo === 'editbook') {
        if (form === this._form) {
          this.$alert('没有更改的内容!', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.loading = true
          this.$axios
            .post('/bxBooks/editbooks', {
              isbn: form.isbn,
              bookTitle: form.bookTitle,
              bookAuthor: form.bookAuthor,
              modifyBy: this.$store.state.user.username,
              publisher: form.publisher,
              yearOfPublication: form.yearOfPublication,
              imageUrlS: form.imageUrlS,
              imageUrlM: form.imageUrlM,
              imageUrlL: form.imageUrlL
            }).then(resp => {
              if (resp.data.code === 'SUCCESS') {
                this.dialogFormVisible = false
                this.loading = false
                this.form = []
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            }).catch(failure => {
            })
        }
      } else if (todo === 'addbook') {
        this.todo = 'editbook'
        this.loading = true
        this.$axios
          .post('/bxBooks/addbook', {
            isbn: form.isbn,
            bookTitle: form.bookTitle,
            bookAuthor: form.bookAuthor,
            createBy: this.$store.state.user.username,
            publisher: form.publisher,
            yearOfPublication: form.yearOfPublication,
            imageUrlS: form.imageUrlS,
            imageUrlM: form.imageUrlM,
            imageUrlL: form.imageUrlL
          }).then(resp => {
            if (resp.data.code === 'SUCCESS') {
              this.dialogFormVisible = false
              this.loading = false
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
              this.form = []
            } else {
              this.dialogFormVisible = false
              this.loading = false
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(failure => {
          })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
      this._form = []
    },
    handleDelete (row) {
      var modifyBy = this.$store.state.user.username
      if (row.isDeleted === '0') {
        this.$axios
          .get('/bxBooks/delete/todelete/' + modifyBy + '/' + row.isbn, {
          }).then(resp => {
            if (resp.data.code === 'SUCCESS') {
              row.isDeleted = '1'
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(failresp => {
          })
      } else if (row.isDeleted === '1') {
        this.$axios
          .get('/bxBooks/delete/rollback/' + modifyBy + '/' + row.isbn, {
          }).then(resp => {
            if (resp.data.code === 'SUCCESS') {
              row.isDeleted = '0'
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(failresp => {
          })
      }
    }
  }
}
</script>

<style>
  .home {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
  }

</style>
