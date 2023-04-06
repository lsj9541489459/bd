<template>
  <view class="page-items">
    <!-- 首页头部组 -->
      <!-- 轮播图 -->
    <Banner :dataList="page.banner" />

  </view>
</template>

<script>

  import Images from './image'
  import Videos from './video'
  import Notice from './notice'
  import NavBar from './navBar'
  import Goods from './goods'
  import Service from './service'
  import Blank from './blank'
  import Guide from './guide'
  import RichText from './richText'
  import Index from "./blank/index";

  export default {
    name: "Page",
    components: {
      Index,
      Images,
      Videos,
      Notice,
      NavBar,
      Goods,
      Service,
      Blank,
      Guide,
      RichText
    },
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    props: {
      page: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>
<style lang="scss">
  // 组件样式
  .page-items{
    background: linear-gradient(180deg, #FFFFFF 0%, #F1F1F1 54%);
    height: 100%;
  }
</style>
