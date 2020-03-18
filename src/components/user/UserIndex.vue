<template>
  <div style="margin-top: 40px">
    <side-menu id="side-menu"></side-menu>
    <div class="home">
      <div id="header-div">
        <div style="height: 150px">
          <userinfo></userinfo>
        </div>
      </div>
      <about id="about"></about>
    </div>
  </div>
</template>

<script>
import About from '@/components/common/About'
import SideMenu from './SideMenu'
import Userinfo from './Userinfo'
export default {
  name: 'UserIndex',
  components: {About, Userinfo, SideMenu}
}
</script>

<style scoped>
  .home {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;

  }

  #header-div {
    padding-bottom: 20px;
    padding-left: 5px;
    background-color: white;
    /*background: url("../../assets/img/bg/bg3.jpg");*/
  }

  #side-menu {
    position: fixed;
    margin-left: 50%;
    left: -680px;
    top: 100px;
  }
  #about {
    padding-bottom: 10px;
  }
</style>
