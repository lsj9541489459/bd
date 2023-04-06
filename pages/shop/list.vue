<template>
  <view class="page-items">
    <view class="goods">
      <view :class="k % 2 == 0 ? 'good-detail' : 'good-detail1'" @click="goDetail(g.id)" v-for="g,k in goods">
        <view><image :src="g.product.thumb"></image></view>
        <view class="price1">￥{{g.product.price}}</view>
        <view class="youmi">{{g.hash_coin}} 优米豆</view>
      </view>

    </view>
  </view>
</template>

<script>
  import Index from "../../components/page/blank/index"
  import * as GoodApi from '@/api/goods'

  export default {
    data(){
      return {
         id: 0,
         goods:[]
      }
    },
    components: {
      Index
    },
    onLoad(options){
      this.id = options.id
    },
    onShow(){
      this.loadData()
    },
    methods:{
      loadData() {
        const app = this
        GoodApi.category({id: this.id})
          .then(result => {
            // 设置页面数据
            app.goods = result.data.goods
          })
      },
      goDetail(id){
        uni.navigateTo({
          url: '/pages/shop/detail?id='+id
        })
      }
    }
  }
</script>
<style lang="scss">
  @font-face {
    font-family: YouSheBiaoTiHei-Bold;
    src: url("/static/font/YouSheBiao.TTF");
  }
  // 组件样式
  .page-items{
    background: linear-gradient(180deg, #F6F6F6 0%, #F1F1F1 100%);
    height: 100%;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;

    .icons{
      margin-top: 20px;
      height: 200px;
    }

    .icon{
      width: 22%;
      float: left;
      text-align: center;
      margin: 15px 1.5%;
      height: 60px;
      display: grid;
    }

    .icon image{
      width: 40%;
      height: 40px;
      margin-left: 30%;
    }

    .icon text{
      margin-top: 10px;
    }

    .hot-view{
      width: 90%;
      height: 220px;
      margin-left: 5%;
      background: url("/static/images/xrxd_bg.png") no-repeat;
      background-size: 100% 100%;
    }

    .hot-text{
      width: 100px;
      height: 34px;
      margin-left: 10px;
      background: url("/static/images/hot-rank.png") no-repeat;
      background-size: 100% 22px;
      background-position-y: 10px;
      color: #fff;
    }

    .hot-text text{
      position: absolute;
      right: 16%;
      margin-top: 10px;
      height: 16px;
    }

    .hot-text image{
      position: absolute;
      right: 8%;
      margin-top: 12px;
      width: 30px;
      height: 16px;
    }

    .goods{
      height: 100%;
      margin-left: 5%;
      margin-top: 10px;
      padding-bottom: 30px;
    }

    .good-detail,.good-detail1{
      height: 190px;
      width: 45%;
      background-color: #fff;
      border-radius: 15px;
      color: #3D3D3D;
      display: inline-grid;
    }

    .good-detail{
      margin: 40rpx 5% 0rpx 0px;
    }

    .good-detail1{
      margin: 40rpx 5% 0px 0px;
    }

    .good-detail image,.good-detail1 image{
      width: 80%;
      height: 100px;
      margin: 20px 10% 0px;
    }

    .price1{
      font-family: Roboto-Regular, Roboto;
      font-size: 20px;
      margin-left: 10px;
    }

    .youmi{
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #D99147;
      margin-left: 10px;
      font-weight: 700;
    }

  }
</style>
