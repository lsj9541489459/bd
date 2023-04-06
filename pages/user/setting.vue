<template>
	<view class="container">
		<view class="form-wrapper">
			<view class="input-view">
				<text>手机绑定</text>
				<text class="text1">{{phone}}</text>
			</view>
			<view class="input-view" @click="goNotice()">
				<text>消息通知</text>
				<text class="text">未开启，前往开启</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>
			<view class="input-view" @click="goAboutUs()">
				<text>关于我们</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>
			<view class="input-view" @click="checkUpdate">
				<text>检查更新</text>
				<text class="text">1.0.0</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>
			<view class="input-view" @click="logOff">
				<text>账号注销</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>

		</view>
		<!-- 操作按钮 -->
		<view class="footer">
			<view class="btn-wrapper">
				<view class="btn-item btn-item-main" @click="logout()">退出登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store'

	export default {
		data() {
			return {
				phone: '157****3631'
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {
			// 获取当前用户信息
			//this.getUserInfo()
		},

		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {

		},

		methods: {
			goNotice() {

			},
			goAboutUs() {
				this.$navTo('pages/user/about')
			},
			checkUpdate() {

			},
			logOff() {
				this.$navTo('pages/user/destory')
			},
			logout() {
				const app = this
				uni.showModal({
					title: '友情提示',
					content: '您确定要退出登录吗?',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							app.$navTo('pages/login/mobileLogin',{},'redirectTo')
							// store.dispatch('Logout', {})
							//         .then(result => app.onRefreshPage())
						}
					}
				})
			}

		}
	}
</script>

<style>
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	.container {}

	.page-title {
		width: 94%;
		margin: 0 auto;
		padding-top: 40rpx;
		font-size: 28rpx;
		color: rgba(69, 90, 100, 0.6);
	}

	.form-wrapper {
		margin: 20rpx auto 20rpx auto;
		padding: 0 40rpx;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		background: #fff;
	}

	.input-view {
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
		box-shadow: inset 0px -1px 0px 0px #E5E6EB;
	}

	.text {
		float: right;
		position: absolute;
		right: 9%;
		color: #86909C;
	}

	.text1 {
		float: right;
		position: absolute;
		right: 5%;
		color: #86909C;
	}

	.arrow-right {
		position: absolute;
		right: 10px;
		margin-top: 18rpx;
		width: 18px;
		height: 22px;
		padding: 5px;
	}

	/* 底部操作栏 */

	.footer {
		width: 100%;
		margin-top: 80rpx;

		.btn-wrapper {
			height: 100%;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 86rpx;
			color: #fff;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.btn-item-wechat {
			background: #0ba90b;
			margin-bottom: 26rpx;
		}

		.btn-item-main {
			background: #EAEAEA;
			border-radius: 15rpx;
			color: #1D2129;
			font-size: 32rpx;

			// 禁用按钮
			&.disabled {
				opacity: 0.6;
			}
		}

		.uni-input-input {
			text-align: right;
		}

	}
</style>