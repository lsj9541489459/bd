<template>
  <view v-show="!isLoading" class="container">
    <view class="address" @click="selectAddress">
      <view class="address-left">
        <image src="../../static/images/address-icon.png"></image>
      </view>
      <view class="address-right">
          <view class="address-text">
            <text class="username">{{address.receive_name}}</text>
            <text class="phone">{{address.receive_tel}}</text>
          </view>
        <view class="address-view">
          <text class="address-detail">{{address.address}}</text>
          <image class="right-arrow" src="../../static/images/arrow-right1.png"></image>
        </view>
      </view>
    </view>

    <view class="good-area">
      <view class="good-left">
        <image :src="good.product.thumb"></image>
      </view>
      <view class="good-right">
        <view class="good-title">{{good.name}}</view>
        <view class="sku">{{sku}}</view>
        <view class="buy-area">
          <text class="ren">￥</text>
          <text class="price2">{{good.product.price}}</text>
          <text class="minus" @click="changeNum('minus')">-</text>
          <text class="buy-number">{{num}}</text>
          <text class="plus" @click="changeNum('plus')">+</text>
        </view>
      </view>

    </view>

    <view class="good-info">
      <view class="total-price">
        <text>商品总价</text>
        <text class="text-right">￥{{good.product.price * num}}</text>
      </view>
      <view class="send-fee">
        <text>运费</text>
        <text class="text-right">￥{{fee}}</text>
      </view>
      <view class="real-price">
        <text>实付金额</text>
        <text class="text-right">￥{{good.product.price * num}}</text>
      </view>
    </view>

    <view class="pay-list">
      <view class="pay" v-for="p,k in pays">
        <image :src="p.icon"></image>
        <text>{{p.name}}</text>
        <radio class="pay-radio selected-radio" :color="color" :checked="k === current"/>
      </view>

    </view>

    <view class="tips">
      <view>若完成交易代表您已同意以下约定:</view>
      <view>1、港澳台地区及部分偏远地区会无法配送。</view>
      <view>2、受疫情等因素影响,多地物流公司接单和派送受影响,物流时效性有所延长,还请谅解,如有疑问请随时联系在线客服咨询。</view>
      <view>3、商品的实时价格会因为市场波动而产生变化,具体成交价以平台为准。</view>
      <view>4、由于显示器,拍照和做图的过程中,产品可能发生颜色偏差,具体请以实物为准!</view>
      <view>5、因春节假期影响,1月8日后起下单的部分产品将于1月28日后进行配送,还请谅解,如有疑问请随时联系在线客服咨询。</view>
    </view>

    <view class="buy-button">
      <view class="price3">
        <text>共{{num}}件</text>
        <text>￥{{good.product.price * num}}</text>
      </view>
      <view class="buy" @click="buyNow">立即支付</view>
    </view>

  </view>
</template>

<script>
  import Service from '../goods/components/Service'
  import Images from "../../components/page/image/index";
  import * as GoodApi from "../../api/goods"

  export default {
    components: {
      Images,
      Service
    },
    data() {
      return {
        current: 0,
        color: 'rgb(47,35,41)',
        // 正在加载
        isLoading: false,
        // 当前商品ID
        goodsId: null,
        number: 0,
        sku: '',
        address: [],
        good: [],
        pays: [],
        fee: 0,
        num: 0,
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // 记录商品ID
      this.goodsId = parseInt(options.id)
      this.num = parseInt(options.num)
      this.sku = options.sku
      // 加载页面数据
      this.onRefreshPage()
    },
	onShow(){
		this.onRefreshPage()
	},
    methods: {
      selectAddress(){
		this.$navTo('pages/address/index')
		
      },
      // 刷新页面数据
      onRefreshPage() {
        const app = this
        GoodApi.order({id:this.goodsId})
                .then(result=>{
                   app.address = result.data.address
                   app.good = result.data.good
                   app.pays = result.data.pays
                })
      },
      changeNum(type){
        if(type == 'minus'){
          if(this.num > 1){
            this.num--
          }
        }else{
          this.num++
        }
      },
      buyNow(id){
        uni.showToast({title:""+id})
      }
    },
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: YouSheBiaoTiHei-Bold;
    src: url("/static/font/YouSheBiao.TTF");
  }

  .container{
    background-color: #F5F6F7;

    .address{
      width: 95%;
      margin-left: 2.5%;
      margin-top: 20px;
      height: 120px;
      background:url("../../static/images/border.png") no-repeat;
      background-size: 100% 3px;
	  background-position-y: 117px;
	  background-color: #fff;
      display: flex;
    }

    .address-left{
      width: 15%;
    }

    .address-left image{
      width: 30px;
      height: 30px;
      margin: 40px 30px 0px 10px;
    }

    .address-right{
      width: 78%;
      margin-top: 20px;
    }

    .username{
      font-size: 18px;
      font-weight: 600;
      margin-right: 10px;
    }

    .phone{
      color: #999999;
    }

    .address-detail{
      width: 80%;
      margin-top: 10px;
    }

    .good-area {
      width: 95%;
      margin-left: 2.5%;
      margin-top: 20px;
      height: 150px;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
    }

    .good-left{
      width: 30%;
    }

    .good-left image{
      width: 100%;
      height: 80px;
      margin: 35px 0px 35px 20px;
    }

    .good-right{
      width: 70%;
      margin-left: 10%;
    }

    .good-title{
      font-size: 16px;
      margin-top: 15px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    }

    .sku{
      color: #999999;
      margin: 5px 0px;
    }

    .buy-area{
      display: flex;
      margin-top: 15px;
    }

    .ren{
      margin-top: 5px;
      font-weight: 700;
    }

    .price{
      font-weight: 700;
      font-size: 20px;
    }

    .minus,.plus{
      width: 20%;
      text-align: center;
      font-size: 22px;
      padding: 5px;
      margin-top: -5px;
      float: right;
    }

    .minus{
      margin-left: 10%;
    }

    .price2{
      margin-left: 5%;
      margin-right: 5%;
    }

    .buy-number{
      margin: 7px 10px 0px;
    }


    .good-name{
      font-size: 16px;
      margin-top: 15px;
    }

    .address-view{
	  background-color: #fff;
      width: 85%;
	  margin-top: 10px;
    }

    .right-arrow{
      position: absolute;
      right: 8%;
      height: 20px;
	  width: 16px;
      top: 55px;
	  background: url('../../static/images/arrow-right1.png');
	  background-size: 100% 100%;
    }

    .pay-list{
      width: 95%;
      margin-left: 2.5%;
      margin-top: 20px;
      padding-bottom: 5px;
      background-color: #fff;
      border-radius: 10px;
    }

    .pay{
      display: flex;
      height: 50px;
      line-height: 60px;
      padding-left: 15px;
    }

    .pay image{
      width: 30px;
      height: 30px;
      margin-top: 15px;
    }

    .pay text{
      margin-left: 10px;
    }

    .pay-radio{
      float: right;
    }

    .detail{
      background-color: #fff;
    }

    .detail-title{
      font-size: 16px;
      padding: 15px 0px 20px 15px;
      font-weight: 700;
    }

    .address-detail{
      width: 80%;
    }

    .good-info{
      width: 95%;
      margin-left: 2.5%;
      margin-top: 20px;
      height: 140px;
      background-color: #fff;
      padding: 15px 5%;
      border-radius: 10px;
    }

    .text-right{
      float: right;
    }

    .total-price,.send-fee,.real-price{
      height: 40px;
      line-height: 40px;
    }

    .total-price,.send-fee{
      border-bottom: 1px solid #EEEEEE;
    }

    .total-price text:nth-child(2),.send-fee text:nth-child(2){
      font-weight: 700;
      font-size: 16px;
    }

    .real-price text:nth-child(2){
      font-weight: 700;
      font-size: 20px;
    }

    .pay-radio{
      position: absolute;
      right: 15px;
    }


    .buy-button{
      width: 80%;
      height: 40px;
      line-height: 40px;
      margin-left: 10%;
      position: fixed;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      bottom: 30px;
      text-align: center;
      color: #fff;
	  background: url("/static/images/pay-bg.png") no-repeat;
	  background-size: 100% 100%;
    }
	
	.tips{
		width: 90%;
		margin-left: 5%;
		margin-top: 20px;
		padding-bottom: 90px;
		color: #3D3D3D;
	}
	
	.tips view{
		line-height: 45rpx;
	}
	
	.price3,.buy{
		width: 50%;
	}
	
	.price3{
		display: grid;
	}
	
	.price3 text:nth-child(1){
		color: rgba(61,61,61,0.5);
		font-size: 12px;
		margin-top: -6px;
		margin-left: 15%;
	}
	
	.price3 text:nth-child(1){
		color: rgba(61,61,61,0.5);
		font-size: 12px;
		margin-top: -10px;
		margin-left: 15%;
		height: 18px;
	}
	
	.price3 text:nth-child(2){
		color: #F33D17;
		font-size: 18px;
		margin-left: 0px;
	}


    .buy{
		font-weight: 700;
		text-align: center;
		margin-left: -2%;
	}

  }
</style>
