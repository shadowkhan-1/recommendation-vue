<template>
  <div style="margin-top: 40px">
    <side-menu id="side-menu"></side-menu>
    <div class="home">
      <div id="header-div">
        <div style="height: 200px;width:80%"></div>
        <carousel></carousel>
<!--        <quick-nav style="float: right;margin-top: -100px;margin-right: 480px"></quick-nav>-->
      </div>
      <about id="about"></about>
    </div>
  </div>
</template>

<script>
import About from '@/components/common/About'
import SideMenu from './SideMenu'
import Carousel from './Carousel'
export default {
  name: 'AppIndex',
  components: {SideMenu, About, Carousel}
}
</script>

<style scoped>
  .home {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;

  }

  #header-div {
    padding-bottom: 20px;
    padding-left: 5px;
    background-color: white;
    background: url("../../assets/img/home/timg.jpg");
  }

  #side-menu {
    position: fixed;
    margin-left: 50%;
    left: -680px;
    top: 100px;
  }
  #about {
    padding-bottom: 10px;
    width: 70%;
  }
</style>
