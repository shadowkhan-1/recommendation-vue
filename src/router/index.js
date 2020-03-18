import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import Home from '../components/Home'
import Register from '../components/Register'
import Userinfo from '../components/user/Userinfo'
import UserIndex from '../components/user/UserIndex'
import Getpassword from '../components/Getpassword'
import LibraryIndex from '../components/library/LibraryIndex'
import AdminIndex from '../components/admin/AdminIndex'
import BookAdminIndex from '../components/admin/book/BookAdminIndex'
import UserAdminIndex from '../components/admin/user/UserAdminIndex'
import RuleAdminIndex from '../components/admin/rule/RuleAdminIndex'
import CollectionIndex from '../components/collection/CollectionIndex'
import FavoriteIndex from '../components/collection/favorite/FavoriteIndex'
import RecommendIndex from '../components/collection/recommend/RecommendIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            // 登录拦截
            requireAuth: true
          }
        },
        {
          path: '/userinfo',
          name: 'Userinfo',
          component: Userinfo,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userindex',
          name: 'UserIndex',
          component: UserIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'libraryindex',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/collection',
          name: 'collectionIndex',
          component: CollectionIndex,
          redirect: '/collection/favorite',
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: '/collection/favorite',
              name: 'FavoriteIndex',
              component: FavoriteIndex,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/collection/recommend',
              name: 'RecommendIndex',
              component: RecommendIndex,
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/admin',
          name: 'AdminIndex',
          component: AdminIndex,
          redirect: '/admin/useradmin',
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: '/admin/bookadmin',
              name: 'BookAdminIndex',
              component: BookAdminIndex,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/admin/useradmin',
              name: 'UserAdminIndex',
              component: UserAdminIndex,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/admin/ruleadmin',
              name: 'RuleAdminIndex',
              component: RuleAdminIndex,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      // eslint-disable-next-line no-undef
      component: Register
    },
    {
      path: '/getpassword',
      name: 'Getpassword',
      component: Getpassword
    }
  ]
})
