<template>
  <view v-if="!isFirstload" class="container">
    <!-- 页面头部 -->
    <view class="header">
      <image class="bg-image" src="../../static/images/chat.png" @click="myMessage"></image>
      <image class="setting" src="../../static/images/setting.png" @click="goSetting"></image>
    </view>
    <view class="main-header" >
      <!-- 用户信息 -->
      <view v-if="isLogin" class="user-info">
        <view class="user-content">
          <!-- 会员昵称 -->
          <view class="nick-name oneline-hide" @click="handlePersonal()">{{ userInfo.phone }}</view>
          <view class="mobile">ID:{{ userInfo.id }}</view>
        </view>

        <view class="user-avatar">
          <!-- <avatar-image url="https://pics0.baidu.com/feed/dbb44aed2e738bd4a475731bef4e3fdd267ff991.jpeg@f_auto?token=d85ac8d92117ac26feaa3100bcbe7565" :width="110" /> -->
        </view>
      </view>
      <!-- 未登录 -->
      <view v-else class="user-info" @click="handleLogin">
        <view class="user-avatar">
          <avatar-image :width="100" />
        </view>
        <view class="user-content">
          <view class="nick-name">未登录</view>
          <view class="login-tips">点击登录账号</view>
        </view>
      </view>
    </view>

    <!-- <view class="vip">
      <view class="vip-view1">
        <view class="open-vip">VIP盲盒优品会员</view>
        <view class="open-start" @click="toVip"><text>立即开通</text></view>
      </view>
      <view class="vip-tips">全场包邮丨折上95折丨每日领红包丨每单返币</view>
    </view>

    <view class="youmidou" v-if="isLogin">
      <view></view>
      <text class="number">5000</text>
      <text class="unit">优米豆</text>
    </view> -->

    <!-- 我的订单 -->
    <view class="my-service">
      <view class="service-title"><text>我的订单</text><text @click="more()">MORE</text><image class="arrow-right" src="../../static/images/arrow-right1.png" @click="more()"></image></view>
      <view class="service-content service-view clearfix">
        <view class="order-list ready-pay" @click="onTargetOrder">
          <image src="../../static/images/ready-pay-icon.png"></image>
          <view class="right-text">{{paying}}</view>
          <view>待付款(订单)</view>
        </view>
        <view class="order-list ready-receive" @click="readyReceive">
          <image src="../../static/images/ready-receive-icon.png"></image>
          <view class="right-text1">{{get}}</view>
          <view class="ordering">待收货(订单)</view>
        </view>
      </view>
    </view>

    <view class="my-service">
      <view class="service-title">常用功能</view>
      <view class="common-content">
        <view class="common-list" @click="boxRecord()">
          <image src="../../static/images/open-box1.png"></image>
          <view>开盒记录</view>
        </view>
        <view class="common-list" @click="onTargetMyCoupon">
          <image src="../../static/images/coupon.png"></image>
          <view>优惠券</view>
        </view>
        <!-- <view class="common-list" @click="onInvite">
          <image src="../../static/images/gift.png"></image>
          <view>邀请有奖</view>
        </view> -->
        <view class="common-list" @click="onCompayWechat">
          <image src="../../static/images/wechat.png"></image>
          <view>企业微信</view>
        </view>
      </view>
    </view>

    <!-- 我的服务 -->
    <view class="my-service">
      <view class="service-title">更多服务</view>
      <view class="more-service">
        <!--<view class="more-list">
          <image class="more-icon" src="../../static/images/exchange1.png"></image>
          <text>兑换礼品</text>
          <image class="arrow-right1" src="../../static/images/arrow-right1.png"></image>
        </view>-->

        <view class="more-list" @click="address()">
          <image class="more-icon" src="../../static/images/address1.png"></image>
          <text>地址管理</text>
          <image class="arrow-right1" src="../../static/images/arrow-right1.png"></image>
        </view>

        <view class="more-list" @click="cooperation()">
          <image class="more-icon" src="../../static/images/co-operation.png"></image>
          <text>商务合作</text>
          <image class="arrow-right1" src="../../static/images/arrow-right1.png"></image>
        </view>

        <view class="more-list" @click="services()">
          <image class="more-icon" src="../../static/images/contact.png"></image>
          <text>联系客服</text>
          <image class="arrow-right1" src="../../static/images/arrow-right1.png"></image>
        </view>

        <view class="more-list" @click="question()">
          <image class="more-icon" src="../../static/images/question.png"></image>
          <text>问题反馈</text>
          <image class="arrow-right1" src="../../static/images/arrow-right1.png"></image>
        </view>

        <view class="more-list" @click="complain()">
          <image class="more-icon" src="../../static/images/complain.png"></image>
          <text>未成年人投诉</text>
          <image class="arrow-right1" src="../../static/images/arrow-right1.png"></image>
        </view>

      </view>
    </view>

  </view>
</template>

<script>
  import store from '@/store'
  import AvatarImage from '@/components/avatar-image'
  import { setCartTabBadge } from '@/core/app'
  import SettingKeyEnum from '@/common/enum/setting/Key'
  import SettingModel from '@/common/model/Setting'
  import * as UserApi from '@/api/user'
  import * as OrderApi from '@/api/order'
  import { checkLogin } from '@/core/app'
  import Images from "../../components/page/image/index";

  // 订单操作
  const orderNavbar = [
    { id: 'all', name: '全部订单', icon: 'qpdingdan' },
    { id: 'payment', name: '待支付', icon: 'daifukuan', count: 0 },
    { id: 'delivery', name: '待发货', icon: 'daifahuo', count: 0 },
    { id: 'received', name: '待收货', icon: 'daishouhuo', count: 0 },
  ]

  /**
   * 我的服务
   * id: 标识; name: 标题名称; icon: 图标; type 类型(link和button); url: 跳转的链接
   */
  const service = [
    { id: 'address', name: '收货地址', icon: 'shouhuodizhi', type: 'link', url: 'pages/address/index' },
    /* { id: 'coupon', name: '领券中心', icon: 'lingquan', type: 'link', url: 'pages/coupon/index' }, */
    { id: 'boxRecord', name: '开盒记录', icon: 'lingquan', type: 'link', url: 'pages/user/boxRecord' },
    { id: 'myCoupon', name: '优惠券', icon: 'youhuiquan', type: 'link', url: 'pages/my-coupon/index' },
    { id: 'help', name: '反馈问题', icon: 'bangzhu', type: 'link', url: 'pages/help/question' },
    { id: 'contact', name: '在线客服', icon: 'kefu', type: 'button', openType: 'contact' },
    { id: 'points', name: '我的积分', icon: 'jifen', type: 'link', url: 'pages/points/log' },
    { id: 'refund', name: '退换/售后', icon: 'shouhou', type: 'link', url: 'pages/refund/index', count: 0 },
    { id: 'upload', name: '进件', icon: 'shouhou', type: 'link', url: 'pages/cooperation/index' },
  ]

  export default {
    components: {
      Images,
      AvatarImage
    },
    data() {
      return {
        // 枚举类
        SettingKeyEnum,
        // 正在加载
        isLoading: true,
        // 首次加载
        isFirstload: false,
        //isFirstload: true,
        // 是否已登录
        islogin: false,
        // 系统设置
        setting: {},
        // 当前用户信息
        userInfo: {},
        get: 0,
        paying: 0,
        // 账户资产
        assets: { balance: '--', points: '--', coupon: '--' },
        // 我的服务
        service,
        // 订单操作
        orderNavbar,
        // 当前用户待处理的订单数量
        todoCounts: { payment: 0, deliver: 0, received: 0 }
      }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(options) {
		this.isLogin=this.global.Sign;
		if(this.global.Sign){
			this.userInfo = uni.getStorageSync('user')
			this.onRefreshPage();
		}else{
			this.$navTo('pages/login/mobileLogin')
		}
    },

    methods: {
      // 刷新页面
		onRefreshPage() {
        // 判断是否已登录
        //this.isLogin = checkLogin()
        // 获取页面数据
        this.getPageData()
      },

      // 获取页面数据
      getPageData(callback) {
        const app = this
        app.isLoading = true
        Promise.all([/*app.getSetting(), */app.getUserInfo()/*, app.getUserAssets(), app.getTodoCounts()*/])
                .then(result => {
                  app.isFirstload = false
                  // 初始化我的服务数据
                  app.initService()
                  // 执行回调函数
                  callback && callback()
                })
                .catch()
                .finally(() => app.isLoading = false)
      },

      // 初始化我的服务数据
      initService() {
        const app = this
        const newService = []
        service.forEach(item => {
          /*if (item.id === 'points') {
            item.name = '我的' + app.setting[SettingKeyEnum.POINTS.value].points_name
          }*/
          // 数据角标
          if (item.count != undefined) {
            item.count = app.todoCounts[item.id]
          }
          newService.push(item)
        })
        app.service = newService
      },

      // 初始化订单操作数据
      initOrderTabbar() {
        const app = this
        const newOrderNavbar = []
        orderNavbar.forEach(item => {
          if (item.count != undefined) {
            item.count = app.todoCounts[item.id]
          }
          newOrderNavbar.push(item)
        })
        app.orderNavbar = newOrderNavbar
      },

      // 获取商城设置
      getSetting() {
        const app = this
        return new Promise((resolve, reject) => {
          SettingModel.data()
                  .then(setting => {
                    app.setting = setting
                    resolve(setting)
                  }).catch(reject)
        })
      },

      //开盒子记录
      boxRecord(){
        this.$navTo('pages/user/boxRecord');
      },

      //地址管理
      address(){
        this.$navTo('pages/address/index');
      },
      //商务合作
      cooperation(){
        this.$navTo('pages/cooperation/index');
      },
      //问题反馈
      question(){
        this.$navTo('pages/help/list');
      },
      //我的消息
      myMessage(){
        this.$navTo('pages/user/message')
      },
      //跳转设置
      goSetting(){
        this.$navTo('pages/user/setting');
      },
      //开通会员
      getVip(){
        this.$navTo('pages/user/vip');
      },
      //开通会员
      complain(){
        this.$navTo('pages/help/question');
      },

      // 获取当前用户信息
      getUserInfo() {
        const app = this
        return new Promise((resolve, reject) => {
           UserApi.info({}, { load: app.isFirstload })
          //!app.isLogin ? resolve(null) : UserApi.info({}, { load: app.isFirstload })
                  .then(result => {
                    // app.userInfo = result.data.userInfo
                    app.paying = result.data.paying
                    app.get = result.data.get
                    resolve(app.userInfo)
                  })
                  .catch(err => {
                    if (err.result && err.result.status == 401) {
                      app.isLogin = false
                      resolve(null)
                    } else {
                      reject(err)
                    }
                  })
        })
      },

      // 获取账户资产
      getUserAssets() {
        const app = this
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : UserApi.assets({}, { load: app.isFirstload })
                  .then(result => {
                    app.assets = result.data.assets
                    resolve(app.assets)
                  })
                  .catch(err => {
                    if (err.result && err.result.status == 401) {
                      app.isLogin = false
                      resolve(null)
                    } else {
                      reject(err)
                    }
                  })
        })
      },

      // 获取当前用户待处理的订单数量
      getTodoCounts() {
        const app = this
        return new Promise((resolve, reject) => {
          !app.isLogin ? resolve(null) : OrderApi.todoCounts({}, { load: app.isFirstload })
                  .then(result => {
                    app.todoCounts = result.data.counts
                    resolve(app.todoCounts)
                  })
                  .catch(err => {
                    if (err.result && err.result.status == 401) {
                      app.isLogin = false
                      resolve(null)
                    } else {
                      reject(err)
                    }
                  })
        })
      },

      // 跳转到登录页
      handleLogin() {
        // !this.isLogin && this.$navTo('pages/login/index')
        !this.isLogin && this.$navTo('pages/login/mobileLogin')
      },

      // 跳转到修改个人信息页
      handlePersonal() {
        this.$navTo('pages/user/personal/index')
      },

      // 退出登录
      handleLogout() {
        const app = this
        uni.showModal({
          title: '友情提示',
          content: '您确定要退出登录吗?',
          success(res) {
            if (res.confirm) {
              store.dispatch('Logout', {})
                      .then(result => app.onRefreshPage())
            }
          }
        })
      },

      // 跳转到设置页面
      onSetting() {
        this.$navTo('pages/user/setting')
      },

      // 跳转到订单页
      onTargetOrder() {
        this.$navTo('pages/order/index?dataType=payment')
      },

      // 跳转到我的积分页面
      onTargetPoints() {
        this.$navTo('pages/points/log')
      },

      // 跳转到我的优惠券页
      onTargetMyCoupon() {
        this.$navTo('pages/my-coupon/index')
      },
      //邀请有奖
      onInvite(){
        this.$navTo('pages/user/invite')
      },
      //企业微信
      onCompayWechat(){
        this.$navTo('pages/help/wechat')
      },

      // 跳转到服务页面
      handleService({ url }) {
        this.$navTo(url)
      },
      //更多
      more(){
        this.$navTo('pages/order/index?dataType=all')
      },
      //待收货
      readyReceive(){
        this.$navTo('pages/order/index?dataType=received')
      },
      //在线客服
      services(){
        this.$navTo('pages/help/online')
      },
      //开通会员
      toVip(){
        this.$navTo('pages/user/getVip')
      }

    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
      // 获取首页数据
      this.getPageData(() => {
        uni.stopPullDownRefresh()
      })
    },


  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    src: url("@/static/font/SourceHanSansCN-Bold.otf");
  }

	.container{
		background-color: #fff;
	}
	.header{
		width: 100%;
		height: 120rpx;
		padding-top: 20rpx;
	}

	.bg-image{
	  position: absolute;
	  margin-top: 30rpx;
	  right: 12%;
	  width: 40rpx;
	  height: 40rpx;
	}

	.setting {
	  position: absolute;
	  margin-top: 30rpx;
	  right: 5%;
	  width: 40rpx;
	  height: 40rpx;
	}
  // 页面头部
  .main-header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 30rpx;
	margin-bottom: 30rpx;

	.avatar-image{
		position:absolute;
		right: 5%;
	}

    .user-info {
      display: flex;
      height: 100rpx;
      z-index: 1;

      .user-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 30rpx;

        .nick-name {
          font-size: 34rpx;
          font-weight: bold;
          max-width: 270rpx;
        }

        .mobile {
          margin-top: 15rpx;
          font-size: 20rpx;
		  color: #999999;
        }

        .login-tips {
          margin-top: 12rpx;
          font-size: 30rpx;
        }

      }
    }
  }

  .vip{
	width: 96%;
	height: 160rpx;
	margin-left: 2%;
	margin-top: 50rpx;
	background: url('@/static/images/vip.png') no-repeat;
	background-size: 100% 100%;
  }

  .vip-view1{
	  display: flex;
	  color: #fff;
	  padding: 40rpx 0px 30rpx 50rpx;
  }

  .open-vip{
	  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
	  font-weight: 700;
	  font-size: 32rpx;
	  background: linear-gradient(135deg, #FFCCA3 0%, #FFF6F0 100%);
	  -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
  }

  .open-start{
	  position: absolute;
	  right: 10%;
	  background: url('@/static/images/open-vip.png') no-repeat;
	  background-size: 100% 100%;
	  padding: 10rpx 20rpx;
  }

  .open-start text{
	  background: linear-gradient(180deg, #8F4B30 0%, #51210D 100%);
	  -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
  }

  .vip-tips{
	  background: linear-gradient(135deg, #FFCCA3 0%, #FFF6F0 100%);
	  -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
	  padding-left: 50rpx;
  }

  .youmidou{
	  width: 94%;
	  height: 130rpx;
	  margin: 30rpx 2%;
	  background: url('@/static/images/youmi-bg.png') no-repeat;
	  background-size: 100% 100%;
	  display: flex;
  }

  .youmidou view{
	  width: 100rpx;
	  height: 80rpx;
	  margin-top: 25rpx;
	  margin-left: 25rpx;
	  background: url('/static/images/coin.png') no-repeat;
	  background-size: 100% 100%;
  }

  .number{
	  color: #8F4B30;
	  font-weight: bold;
	  font-size: 54rpx;
	  padding-top: 30rpx;
	  padding-left: 25rpx;
  }

  .unit{
	  color: #8F4B30;
	  font-weight: bold;
	  font-size: 34rpx;
	  padding-top: 55rpx;
	  padding-left: 20rpx;
  }

  .common-content{
	  margin-bottom: 40rpx;
	  height: 80rpx;
  }

  .common-list{
	  width: 20%;
	  margin: 20rpx 2.5%;
	  float: left;
	  text-align: center;
  }

  .more-service{
	  width: 94%;
	  margin: 10rpx 3%;
  }

  .common-list image{
	  width: 80rpx;
	  height: 80rpx;
  }

  .more-list{
	  height: 100rpx;
	  line-height: 100rpx;
	  display:flex;
	  box-shadow: inset 0px -1px 0px 0px #E5E6EB;
  }

  .more-icon{
	  width: 50rpx;
	  height: 50rpx;
	  margin-top: 30rpx;
	  margin-right: 10rpx;
  }





  // 角标组件
  .item-badge {
    position: absolute;
    top: 0;
    right: 55rpx;
    background: #fa2209;
    color: #fff;
    border-radius: 100%;
    min-width: 38rpx;
    height: 38rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rpx;
    font-size: 24rpx;
  }

  // 我的钱包
  .my-asset {
    display: flex;
    background: #fff;
    padding: 40rpx 0;

    .asset-right {
      width: 200rpx;
      border-left: 1rpx solid #eee;
    }

    .asset-right-item {
      text-align: center;
      color: #545454;

      .item-icon {
        font-size: 44rpx;
      }

      .item-name {
        margin-top: 14rpx;
        font-size: 28rpx;
      }

    }

    .asset-left-item {
      max-width: 183rpx;
      text-align: center;
      color: #666;
      padding: 0 16rpx;

      .item-value {
        font-size: 34rpx;
        color: red;
      }

      .item-name {
        margin-top: 6rpx;
      }

      .item-name {
        margin-top: 14rpx;
        font-size: 28rpx;
      }
    }

  }

  // 订单操作
  .order-navbar {
    display: flex;
    margin: 20rpx auto 20rpx auto;
    padding: 20rpx 0;
    width: 94%;
    box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
    font-size: 30rpx;
    border-radius: 5rpx;
    background: #fff;

    &-item {
      position: relative;
      width: 25%;

      .item-icon {
        text-align: center;
        margin: 0 auto;
        padding: 10rpx 0;
        color: #545454;
        font-size: 44rpx;
      }

      .item-name {
        font-size: 28rpx;
        color: #545454;
        text-align: center;
        margin-right: 10rpx;
      }

    }
  }

  // 我的服务
  .my-service {
    margin: 22rpx auto 22rpx auto;
    padding: 22rpx 0;
    width: 94%;
    box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 5rpx;
    background: #fff;

    .service-title {
      padding-left: 24rpx;
      margin-bottom: 20rpx;
      font-size: 34rpx;
	  font-weight: bold;
    }

	.service-title text:nth-child(2){
		float: right;
		margin-right: 7%;
		font-weight: 400;
		font-size: 26rpx;
		margin-top: 4rpx;
	}

	.arrow-right{
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		right: 4%;
	}

	.arrow-right1{
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		right: 4%;
		margin-top: 30rpx;
	}

	.order-list image{
		width: 60rpx;
		height: 60rpx;
		padding-left: 15%;
		margin-top: 20rpx;
	}

	.order-list view{
		margin-left:  30rpx;
	}

	.order-list view:nth-child(2){
		position: absolute;
		margin-left: 32%;
		margin-top: 60rpx;
		font-size: 40rpx;
	}

	.ordering{
		margin-left: 50rpx !important;
	}

	.service-view{
		display: flex;
	}

	.ready-pay{
		background: url('@/static/images/ready-pay.png') no-repeat;
		background-size: 100% 100%;
	}

	.order-list{
		width: 48%;
		height: 150rpx;
		display: grid;
	}

	.ready-receive{
		background: url('@/static/images/ready-receive.png') no-repeat;
		background-size: 100% 100%;
		margin-left: 2%;
	}

	.right-text{
		position: absolute;
	}

	.right-text1{
		position: absolute;
		margin-left: 33% !important;
	}



    .service-content {
      margin-bottom: -20rpx;

      .service-item {
        position: relative;
        width: 25%;
        float: left;
        margin-bottom: 30rpx;

        .item-icon {
          text-align: center;
          margin: 0 auto;
          padding: 14rpx 0;
          color: #ff3800;
          font-size: 44rpx;
        }

        .item-name {
          font-size: 28rpx;
          color: #545454;
          text-align: center;
          margin-right: 10rpx;
        }

      }
    }
  }

  // 退出登录
  .my-logout {
    display: flex;
    justify-content: center;
    margin-top: 50rpx;

    .logout-btn {
      width: 60%;
      margin: 0 auto;
      font-size: 28rpx;
      color: #616161;
      border-radius: 20rpx;
      border: 1px solid #dcdcdc;
      padding: 16rpx 0;
      text-align: center;
    }
  }
</style>
