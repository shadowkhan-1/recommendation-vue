<template>
  <div class="home">
    <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
    <div style="float:right">
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="adduser()" round>添加用户</el-button>
    </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%">
      <el-table-column
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上次登录日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.lastestTime==null ? 0 : scope.row.lastestTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>邮箱: {{ scope.row.email }}</p>
            <p>电话: {{ scope.row.phone }}</p>
            <p>角色: {{ scope.row.rule === '0' ? '普通用户' : '管理员'}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
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
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="form" ref="usertable" label-position="left">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="用户电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('usertable')">取 消</el-button>
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
    }
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 50,
      todo: 'edituser',
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: [],
      // eslint-disable-next-line vue/no-reserved-keys
      _form: [],
      loading: false
    }
  },
  mounted: function () {
    this.getusers()
  },
  methods: {
    getusers () {
      var _this = this
      this.$axios
        .get('/user/getusers', {
          params: {
            rule: this.$store.state.user.rule,
            currentPage: this.currentPage - 1,
            pagesize: this.pagesize * 250
          }
        }).then(resp => {
          if (resp && resp.data.code === 'SUCCESS') {
          }
          _this.tableData = resp.data.data
        }).catch(failResponse => {

        })
    },
    searchResult () {
      var _this = this
      this.$axios
        .post('/user/search', {
          keywords: this.$refs.searchBar.keywords
        }).then(resp => {
          if (resp && resp.data.code === 'SUCCESS') {
            _this.tableData = resp.data.data
          }
        })
    },
    adduser () {
      this.dialogFormVisible = true
      this.form = []
      this._form = []
      this.todo = 'adduser'
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    handleEdit (row) {
      var rule = this.$store.state.user.rule
      if (rule <= row.rule) {
        this.$alert('权限不够，无法编辑!', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.dialogFormVisible = true
        this.form = row
        // 传值防止引传递变化数值会跟着变化,数组、对象、值都适用
        this._form = JSON.parse(JSON.stringify(this.form))
      }
    },
    handleEditChangeSend (todo, form) {
      if (todo === 'edituser') {
        if (form.username === this._form.username && form.name === this._form.name && form.phone === this._form.phone && form.email === this._form.email) {
          this.$alert('没有更改的内容!', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.loading = true
          this.$axios
            .post('/user/editusers', {
              userId: form.userId,
              modifyBy: this.$store.state.user.username,
              username: form.username,
              name: form.name,
              phone: form.phone,
              email: form.email
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
      } else if (todo === 'adduser') {
        this.todo = 'edituser'
        this.$axios
          .post('/user/adduser', {
            username: form.username,
            createBy: this.$store.state.user.username,
            name: form.name,
            phone: form.phone,
            email: form.email
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
      // this.$nextTick(() => {
      //   this.$refs[formName].resetFields()
      // })
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
      this.form = []
      this._form = []
    },
    handleDelete (row) {
      var modifyBy = this.$store.state.user.username
      var rule = this.$store.state.user.rule
      if (rule <= row.rule) {
        this.$alert('权限不够，无法删除!', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        if (row.isDeleted === '0') {
          this.$axios
            .get('/user/delete/todelete/' + modifyBy + '/' + row.userId, {}).then(resp => {
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
            .get('/user/delete/rollback/' + modifyBy + '/' + row.userId, {}).then(resp => {
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
