<template>
  <view class="container">
    <view class="addres-list">
      <view class="address-item" v-for="(item, index) in list" :key="index">
        <view class="contacts">
          <view class="default-address" v-if="item.is_default == 1">默认</view>

          <view class="event-item edit" @click="handleUpdate(item.id)">
			  <text class="address-detail">{{item.area_info}}{{item.address}}</text>
            <text class="iconfont icon-edit"></text>
          </view>
        </view>
        <!--<view class="address">
          <text class="region" v-for="(region, idx) in item.region" :key="idx">{{ region }}</text>
          <text class="detail">{{ item.detail }}</text>
        </view>-->
        <view class="line"></view>
        <view class="address-person">
          <text class="name">{{ item.receive_name }}</text>
          <text class="phone">{{ item.receive_tel }}</text>
        </view>
        <view class="item-option">
          <view class="_left">
            <label class="item-radio" @click.stop="handleSetDefault(item.id)">
              <radio class="radio" color="rgb(47,35,41)" :checked="item.is_default == 1"></radio>
              <text class="text">{{ item.is_default == 1 ? '' : '设为默认地址' }}</text>
            </label>
          </view>
          <view class="_right">
            <view class="events">
              <view class="event-item" @click="handleRemove(item.id)">
                <text class="iconfont icon-delete">删除</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <empty v-if="!list.length" :isLoading="isLoading" tips="亲，暂无收货地址" />
    <!-- 底部操作按钮 -->
    <view class="footer-fixed">
      <view class="btn-wrapper">
        <view class="btn-item btn-item-main" @click="handleCreate()">添加新地址</view>
      </view>
    </view>
  </view>
</template>

<script>
  import * as AddressApi from '@/api/address'
  import Empty from '@/components/empty'

  export default {
    components: {
      Empty
    },
    data() {
      return {
        //当前页面参数
        options: {},
        // 正在加载
        isLoading: false,
        // 收货地址列表
        list: [],
        // 默认收货地址
        defaultId: null
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // 当前页面参数
      this.options = options
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      // 获取页面数据
      this.getPageData()
    },

    methods: {
      // 获取页面数据
      getPageData() {
        const app = this
        app.isLoading = true
        Promise.all([/*app.getDefaultId(),*/ app.getAddressList()])
          .then(() => {
            // 列表排序把默认收货地址放到最前
            app.onReorder()
          })
          .finally(() => app.isLoading = false)
      },

      // 获取收货地址列表
      getAddressList() {
        const app = this
        return new Promise((resolve, reject) => {
          AddressApi.list()
            .then(result => {
              app.list = result.data.list
              resolve(result)
            })
            .catch(reject)
        })
      },

      // 获取默认的收货地址
      getDefaultId() {
        return new Promise((resolve, reject) => {
          const app = this
          AddressApi.defaultId()
            .then(result => {
              app.defaultId = result.data.defaultId
              resolve(result)
            })
            .catch(reject)
        })
      },

      // 列表排序把默认收货地址放到最前
      onReorder() {
        const app = this
        app.list.sort(item => {
          return item.address_id == app.defaultId ? -1 : 1
        })
      },

      /**
       * 添加新地址
       */
      handleCreate() {
        this.$navTo('pages/address/create')
      },

      /**
       * 编辑地址
       * @param {int} addressId 收货地址ID
       */
      handleUpdate(addressId) {
        this.$navTo('pages/address/update', { addressId })
      },

      /**
       * 删除收货地址
       * @param {int} addressId 收货地址ID
       */
      handleRemove(addressId) {
        const app = this
        uni.showModal({
          title: "提示",
          content: "您确定要删除当前收货地址吗?",
          success({ confirm }) {
            confirm && app.onRemove(addressId)
          }
        });
      },

      /**
       * 确认删除收货地址
       * @param {int} addressId 收货地址ID
       */
      onRemove(addressId) {
        const app = this
        AddressApi.remove(addressId)
          .then(result => {
            app.getPageData()
          })
      },

      /**
       * 设置为默认地址
       * @param {Object} addressId
       */
      handleSetDefault(addressId) {
        const app = this
        AddressApi.setDefault(addressId)
          .then(result => {
            app.defaultId = addressId
            app.options.from === 'checkout' && uni.navigateBack()
            app.list = []
            if(result.status == 200){
              app.getAddressList()
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    src: url("@/static/font/SourceHanSansCN-Bold.otf");
  }

  .addres-list {
    padding-top: 20rpx;
    // 设置ios刘海屏底部横线安全区域
    padding-bottom: calc(constant(safe-area-inset-bottom) + 140rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 140rpx);
  }

  .icon-delete{
    color: red;
  }

  // 项目内容
  .address-item {
    margin: 20rpx auto 20rpx auto;
    padding: 30rpx 40rpx;
    width: 94%;
    box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 16rpx;
    background: #fff;
  }

  .contacts {
    font-size: 30rpx;
    margin-bottom: 16rpx;
	display: flex;

    .name {
      margin-right: 16rpx;
    }

	.phone{
		margin-right: 20rpx;
	}

    .default-address{
	  width: 100rpx;
	  height: 40rpx;
	  line-height: 40rpx;
	  font-size: 20rpx;
	  text-align: center;
      background:url('../../static/images/default-address.png') no-repeat;
      background-size: 100% 100%;
      color: #fff;
	  margin-right: 20rpx;
    }
  }

  .address-detail{
    margin-right: 20rpx;
  }

  .address {
    font-size: 28rpx;

    .region {
      margin-right: 10rpx;
    }
  }

  .line {
    margin: 20rpx 0;
    border-bottom: 1rpx solid #f3f3f3;
  }

  .address-person{
    display: flex;
    color:#888888;
    margin-bottom: 20rpx;
  }

  .name{
    margin-right: 40rpx;
  }

  .item-option {
    display: flex;
    justify-content: space-between;
    height: 48rpx;

    // 单选框
    .item-radio {
      font-size: 28rpx;

      .radio {
        vertical-align: middle;
        transform: scale(0.76)
      }

      .text {
        vertical-align: middle;
      }
    }

    // 操作
    .events {
      display: flex;
      align-items: center;
      line-height: 48rpx;

      .event-item {
        font-size: 28rpx;
        color: #4c4c4c;

        &:last-child {
          margin-right: 0;
        }

        .title {
          margin-left: 8rpx;
        }
      }
    }

  }


  // 底部操作栏
  .footer-fixed {
    position: fixed;
    bottom: var(--window-bottom);
    left: 0;
    right: 0;
    min-height: 140rpx;
    z-index: 11;
    background: #fff;

    // 设置ios刘海屏底部横线安全区域
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .btn-wrapper {
      height: 120rpx;
      display: flex;
      align-items: center;
      padding: 0 40rpx;
    }

    .btn-item {
      flex: 1;
      font-size: 28rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #fff;
      border-radius: 50rpx;
    }

    .btn-item-main {
	  width: 80%;
	  min-height: 80rpx;
      background: url('../../static/images/shop-buy.png') no-repeat;
	  background-size: 80% 100%;
	  background-position-x: 20%;
	  margin-left: 10%;
	  padding-right: 10%;
	  font-weight: 600;
	  font-size: 30rpx;
    }

  }
</style>
