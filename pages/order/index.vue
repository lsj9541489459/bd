<template>
  <view class="container">
    <!--<mescroll-body ref="mescrollRef" :sticky="true" :down="{ native: true }" @down="downCallback" :up="upOption" @up="upCallback">-->

      <!-- tab栏 -->
      <u-tabs :list="tabs" :is-scroll="false" :current="curTab" active-color="#FA2209" :duration="0.2" @change="onChangeTab" />

      <!-- 订单列表 -->
      <view class="order-list">
        <view class="order-item">
          <!-- 商品列表 -->
		  <!-- @click="handleTargetDetail(goods.id)" -->
          <view class="goods-list" v-for="(goods, idx) in datum" :key="idx">
            <view class="order-title">
              <text class="order-number">订单编号：{{goods.order_number}}</text>
              <text class="order-cancel" v-if="goods.status == -1">已取消</text>
              <text class="order-pay" v-if="goods.status == 0">待付款</text>
              <text class="order-get" v-if="goods.status == 1">待收货</text>
              <text class="order-give" v-if="goods.status == 2">已收货</text>
            </view>
            <view class="goods-item">
              <!-- 商品图片 -->
              <view class="goods-image">
                <image class="image" :src="goods.thumb" mode="scaleToFill"></image>
              </view>
              <!-- 商品信息 -->
              <view class="goods-content">
                <view class="goods-title"><text class="twoline-hide">{{ goods.name }}</text></view>
              </view>
              <!-- 交易信息 -->
              <view class="goods-trade">
                <view class="goods-num">
				  <text class="unit">￥{{ goods.price }}</text>
                  <text class="good-number">×{{ goods.numbers }}</text>
                </view>
              </view>
            </view>
			
			<view class="order-total">
			  <text class="money">需支付￥{{ goods.total_money }}</text>
			  <view class="pay-button" v-if="goods.status == 0" @click="onPay(goods.id)">继续付款</view>
			  <view class="cancel-button" v-if="goods.status == 0" @click="onCancel(goods.id)">取消订单</view>
			  <view class="ensure-button" v-if="goods.status == 1" @click="onReceipt(goods.id)">确认收货</view>
			</view>
          </view>
         <!-- &lt;!&ndash; 订单合计 &ndash;&gt;
          <view class="order-total">
            <text>共{{ item.total_number }}件商品，总金额</text>
            <text class="unit">￥</text>
            <text class="money">{{ item.pay_price }}</text>
          </view>-->
          <!-- 订单操作 -->
          <!--<view v-if="item.status != -1" class="order-handle">
            <view class="btn-group clearfix">
              &lt;!&ndash; 未支付取消订单 &ndash;&gt;
              <block v-if="item.pay_status == PayStatusEnum.PENDING.value">
                <view class="btn-item" @click="onCancel(item.order_id)">取消</view>
              </block>
              &lt;!&ndash; 已支付进行中的订单 &ndash;&gt;
              <block v-if="item.status = 1">
                  <view class="btn-item" @click="onCancel(item.id)">申请取消</view>
              </block>
              &lt;!&ndash; 已申请取消 &ndash;&gt;
              <view v-if="item.status = -1" class="f-28 col-8">取消申请中</view>
              &lt;!&ndash; 未支付的订单 &ndash;&gt;
              <block v-if="item.pay_status == 0">
                <view class="btn-item active" @click="onPay(item.order_id)">去支付</view>
              </block>
              &lt;!&ndash; 确认收货 &ndash;&gt;
              <block v-if="item.status == 2">&lt;!&ndash;@click="onReceipt(item.order_id)"&ndash;&gt;
                <view class="btn-item active">确认收货</view>
              </block>
            </view>
          </view>-->

        </view>
      </view>
    <!--</mescroll-body>-->

    <!-- 支付方式弹窗 -->
    <u-popup v-model="showPayPopup" mode="bottom" border-radius="26" :closeable="true">
      <view class="pay-popup">
        <view class="title">请选择支付方式</view>
        <view class="pop-content">
          <!-- 微信支付 -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="pay-item dis-flex flex-x-between" @click="onSelectPayType(PayTypeEnum.WECHAT.value)">
            <view class="item-left dis-flex flex-y-center">
              <view class="item-left_icon wechat">
                <text class="iconfont icon-wechat-pay"></text>
              </view>
              <view class="item-left_text">
                <text>{{ PayTypeEnum.WECHAT.name }}</text>
              </view>
            </view>
          </view>
          <!-- #endif -->
          <!-- 余额支付 -->
          <!--<view class="pay-item dis-flex flex-x-between" @click="onSelectPayType(PayTypeEnum.BALANCE.value)">
            <view class="item-left dis-flex flex-y-center">
              <view class="item-left_icon balance">
                <text class="iconfont icon-balance-pay"></text>
              </view>
              <view class="item-left_text">
                <text>{{ PayTypeEnum.BALANCE.name }}</text>
              </view>
            </view>
          </view>-->
        </view>
      </view>
    </u-popup>

  </view>

</template>

<script>
  import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
  import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
  import { getEmptyPaginateObj, getMoreListData } from '@/core/app'
  import * as OrderApi from '@/api/order'
  import { wxPayment } from '@/core/app'

  // 每页记录数量
  const pageSize = 10

  // tab栏数据
  const tabs = [{
    name: `全部`,
    value: 'all'
  }, {
    name: `待支付`,
    value: 'payment'
  }, {
    name: `待发货`,
    value: 'delivery'
  }, {
    name: `已完成`,
    value: 'received'
  }]

  export default {
    components: {
      MescrollBody
    },
    mixins: [MescrollMixin],
    data() {
      return {
        // 当前页面参数
        options: { dataType: 'all' },
        // tab栏数据
        tabs,
        // 当前标签索引
        curTab: 0,
        all: [],
        paying: [],
        get: [],
        finish: [],
        datum: [],
        // 订单列表数据
        list: getEmptyPaginateObj(),

        // 上拉加载配置
        upOption: {
          // 首次自动执行
          auto: true,
          // 每页数据的数量; 默认10
          page: { size: pageSize },
          // 数量要大于4条才显示无更多数据
          noMoreSize: 4,
          // 空布局
          empty: {
            tip: '亲，暂无订单记录'
          }
        },
        // 控制onShow事件是否刷新订单列表
        canReset: false,
        // 支付方式弹窗
        showPayPopup: false
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // 初始化当前选中的标签
      this.initCurTab(options)
      // 注册全局事件订阅: 是否刷新订单列表
      uni.$on('syncRefresh', canReset => {
        this.canReset = canReset
      })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.getOrderList()
      this.canReset && this.getOrderList()
      this.canReset = false
    },

    /**
     * 生命周期函数--监听页面的卸载
     */
    onUnload() {
      // 卸载全局事件订阅
      uni.$off('syncRefresh')
    },

    methods: {

      // 初始化当前选中的标签
      initCurTab(options) {
        const app = this
        if (options.dataType) {
          const index = app.tabs.findIndex(item => item.value == options.dataType)
          app.curTab = index > -1 ? index : 0
        }
      },

      /**
       * 上拉加载的回调 (页面初始化时也会执行一次)
       * 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10
       * @param {Object} page
       */
      upCallback(page) {
        const app = this
        // 设置列表数据
        app.getOrderList(page.num)
          .then(list => {
            const curPageLen = list.data.length
            const totalSize = list.data.total
            app.mescroll.endBySize(curPageLen, totalSize)
          })
          .catch(() => app.mescroll.endErr())
      },

      // 获取订单列表
      getOrderList(pageNo = 1) {
        const app = this
        return new Promise((resolve, reject) => {
          OrderApi.list({ dataType: app.getTabValue(), page: pageNo }, { load: false })
            .then(result => {
              app.all = result.data.all
              app.paying = result.data.paying
              app.get = result.data.get
              app.finish = result.data.finish

              if(app.curTab == 0){
                app.datum  = result.data.all
              }else if(app.curTab == 1){
                app.datum  = result.data.paying
              }
              else if(app.curTab == 2){
                app.datum  = result.data.get
              }
              else if(app.curTab == 3){
                app.datum  = result.data.finish
              }
            })
        })
      },

      // 初始化订单列表数据
      initList(newList) {
        newList.data.forEach(item => {
          item.total_num = 0
          item.goods.forEach(goods => {
            item.total_num += goods.total_num
          })
        })
        return newList
      },

      // 获取当前标签项的值
      getTabValue() {
        return this.tabs[this.curTab].value
      },

      // 切换标签项
      onChangeTab(index) {
        const app = this
        // 设置当前选中的标签
        app.curTab = index
        // 刷新订单列表
        app.getOrderList()
      },

      // 取消订单
      onCancel(orderId) {
        const app = this
        uni.showModal({
          title: '友情提示',
          content: '确认要取消该订单吗？',
          success(o) {
            if (o.confirm) {
              OrderApi.cancel(orderId)
                .then(result => {
                  // 显示成功信息
                  app.$toast(result.message)
                  // 刷新订单列表
                  app.getOrderList()
                })
            }
          }
        });
      },

      // 确认收货
      onReceipt(orderId) {
        const app = this
        uni.showModal({
          title: '友情提示',
          content: '确认收到商品了吗？',
          success(o) {
            if (o.confirm) {
              OrderApi.receipt(orderId)
                .then(result => {
                  // 显示成功信息
                  app.$success(result.message)
                  // 刷新订单列表
                  app.getOrderList()
                })
            }
          }
        });
      },

      // 点击去支付
      onPay(orderId) {
        // 记录订单id
        this.payOrderId = orderId
        // 显示支付方式弹窗
        this.showPayPopup = true
      },

      // 选择支付方式
      onSelectPayType(payType) {
        const app = this
        // 隐藏支付方式弹窗
        this.showPayPopup = false
        // 发起支付请求
        OrderApi.pay(app.payOrderId, payType)
          .then(result => app.onSubmitCallback(result))
      },

      // 订单提交成功后回调
      onSubmitCallback(result) {
        const app = this
        // 发起微信支付
        if (result.data.pay_type == 2) {
          wxPayment(result.data.payment)
            .then(() => {
              app.$success('支付成功')
              setTimeout(() => {
                app.getOrderList()
              }, 1500)
            })
            .catch(err => {
              app.$error('订单未支付')
            })
            .finally(() => {
              app.disabled = false
            })
        }
        // 余额支付
        if (result.data.pay_type == 1) {
          app.$success('支付成功')
          app.disabled = false
          setTimeout(() => {
            app.getOrderList()
          }, 1500)
        }
      },

      // 跳转到订单详情页
      handleTargetDetail(orderId) {
        this.$navTo('pages/order/detail', { orderId })
      },

    },

  }
</script>

<style lang="scss" scoped>
  // 项目内容
  .order-item {
    margin: 20rpx auto 20rpx auto;
    width: 94%;
    box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 16rpx;
  }

  // 项目顶部
  .item-top {
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    margin-bottom: 40rpx;

    .order-time {
      color: #777;
    }

    .state-text {
      color: $uni-text-color-active;
    }
  }

  // 商品列表
  .goods-list {
    margin-bottom: 20rpx;
    background-color: #fff;
    padding: 30rpx 30rpx;
    border-radius: 10rpx;

    .order-number{
      color: #767676 !important;
    }

    .order-title{
      margin-bottom: 30rpx;
    }

    .order-title text:nth-child(2){
      position: absolute;
      right: 8%;
    }

    .order-cancel{
      color: red;
    }

    // 商品项
    .goods-item {
      display: flex;
      margin-bottom: 40rpx;

      // 商品图片
      .goods-image {
        width: 140rpx;
        height: 140rpx;

        .image {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
      }

      // 商品内容
      .goods-content {
        flex: 1;
        padding-left: 30rpx;
        padding-top: 16rpx;
        margin-left: 20rpx;

        .goods-title {
          font-size: 26rpx;
          max-height: 76rpx;
        }

        .goods-props {
          margin-top: 14rpx;
          height: 40rpx;
          color: #ababab;
          font-size: 24rpx;
          overflow: hidden;

          .goods-props-item {
            display: inline-block;
            margin-right: 14rpx;
            padding: 4rpx 16rpx;
            border-radius: 12rpx;
            background-color: #F5F5F5;
            width: auto;
          }
        }


      }

      // 交易信息
      .goods-trade {
        width: 60%;
        margin-top: 80rpx;
        position: absolute;
        margin-left: 95px;

        .goods-price {
          vertical-align: bottom;
          margin-bottom: 16rpx;

          .unit {
            margin-right: -2rpx;
            font-size: 42rpx !important;
          }

        }

        .good-number{
          position: absolute;
          right: 0%;
          font-size: 26rpx;
          color: $uni-text-color-grey;
        }
      }



    }

  }

  // 订单合计
  .order-total {
    font-size: 26rpx;
    vertical-align: bottom;
    text-align: right;
    height: 40rpx;
    margin-bottom: 30rpx;

    .unit {
      margin-left: 8rpx;
      margin-right: -2rpx;
      font-size: 26rpx;
    }

    .money {
      font-size: 28rpx;
      position: absolute;
      left: 8%;
    }

    .cancel-button {
      width: 170rpx;
      height: 60rpx;
      line-height: 60rpx;
      float: right;
      font-size: 28rpx;
      text-align: center;
      left: 8%;
      background: url('@/static/images/order-button.png') no-repeat;
      background-size: 100% 100%;
    }

    .pay-button{
      width: 170rpx;
      height: 60rpx;
      line-height: 60rpx;
      float: right;
      font-size: 28rpx;
      text-align: center;
      left: 8%;
      color: #fff;
      background: url('@/static/images/pay-button.png') no-repeat;
      background-size: 100% 100%;
    }

    .ensure-button{
      width: 170rpx;
      height: 60rpx;
      line-height: 60rpx;
      float: right;
      text-align: center;
      background: url('@/static/images/order-button.png') no-repeat;
      background-size: 100% 100%;
    }

  }

  // 订单操作
  .order-handle {
    .btn-group {

      .btn-item {
        border-radius: 10rpx;
        padding: 6rpx 20rpx;
        margin-left: 15rpx;
        font-size: 28rpx;
        float: right;
        color: #383838;
        border: 1rpx solid #a8a8a8;

        &:last-child {
          margin-left: 0;
        }

        &.active {
          color: $uni-text-color-active;
          border: 1rpx solid $uni-text-color-active;
        }
      }

    }

  }

  // 弹出层-支付方式
  .pay-popup {
    padding: 24rpx;

    .title {
      font-size: 30rpx;
      margin-bottom: 40rpx;
      font-weight: bold;
      text-align: center;
    }

    .pop-content {
      min-height: 260rpx;
      padding: 0 10rpx;

      .pay-item {
        padding: 24rpx 35rpx;
        font-size: 28rpx;
        border-bottom: 1rpx solid #f1f1f1;

        &:last-child {
          border-bottom: none;
        }

        .item-left_icon {
          margin-right: 20rpx;
          font-size: 32rpx;

          &.wechat {
            color: #00c800;
          }

          &.balance {
            color: #ff9700;
          }
        }
      }
    }
  }
</style>
