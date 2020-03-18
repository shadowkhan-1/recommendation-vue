<template>
  <el-card class="card-carousel">
  <el-carousel  type="card" class="push" :interval="4000" arrow="always">
    <el-carousel-item v-for="item in items" :key="item.id">
      <a :href=item.link target="_blank">
        <img :src=item.img alt="" class="carousel_img">
      </a>
      <h3>{{item.title}}</h3>
    </el-carousel-item>
  </el-carousel>
  </el-card>
</template>

<style>
  .el-carousel__item h3 {
    color: black;
    font-size: 15px;
    /*line-height: 300px;*/
    bottom: 43px;
    float: left;
    position: relative;
  }

  .card-carousel {
    /*margin: 0 auto;*/
    margin-left: 20px;
    width: 90%;
    height: 320px;
  }

  .push {
    /*margin-left: -15px;*/
  }

  .el-carousel__item:nth-child(2n) {
    background: white;
  }

  .el-carousel__item:nth-child(2n+1) {
    background: white;
  }

  .carousel_img {
    height: 100%;
    width: 100%;
    text-align: center;
  }
</style>

<script>
export default {
  name: 'Carousel',
  data: function () {
    return {
      items: [{
        id: 1,
        title: 'springboot - Pivotal团队提供的全新框架',
        img: require('../../assets/img/home/springboot.png'),
        link: 'https://spring.io/projects/spring-boot/'},
      {
        id: 2,
        title: 'Vue.js - 渐进式 JavaScript 框架',
        img: require('../../assets/img/home/vue.png'),
        link: 'https://cn.vuejs.org/'
      },
      {
        id: 3,
        title: 'element-ui - 网站快速成型工具',
        img: require('../../assets/img/home/element.png'),
        link: 'http://element-cn.eleme.io/#/zh-CN'
      },
      {
        id: 4,
        title: 'spark - 大规模数据处理引擎',
        img: require('../../assets/img/home/spark.png'),
        link: 'http://spark.apache.org/'
      }
      ]
    }
  }
}
</script>
