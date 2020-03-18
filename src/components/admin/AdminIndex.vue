<template>
<div style="margin-top: 40px">
  <div class="home">
    <router-view/>
    <side-menu></side-menu>
<!--    <user-index></user-index>-->
<!--    <about id="about"></about>-->
  </div>
</div>
</template>

<script>
import SideMenu from './SideMenu'
import BookAdminIndex from './book/BookAdminIndex'
import UserAdminIndex from './user/UserAdminIndex'
// import About from '../common/About'
export default {
  name: 'AdminIndex',
  // eslint-disable-next-line no-undef
  components: {SideMenu, UserAdminIndex, BookAdminIndex}
}
</script>

<style scoped>
  .home {
    width: 88%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
  }
  #about {
    position: fixed;
    padding-bottom: 0px;
    width: 70%;
  }

</style>
