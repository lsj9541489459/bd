<template>
	<view class="container">
		<view class="form-wrapper">
			<view class="input-view" v-for="r in record">
				<text>{{r.blind.name}}</text>
				<text class="text1">{{r.create_time}}</text>
			</view>

		</view>

	</view>
</template>

<script>
	import store from '@/store'
	import * as UserApi from '@/api/user'

	export default {
		data() {
			return {
				record: null,
				page: 1,
				pages: 1
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {

		},
		onShow() {
			this.getData()
		},
		onReachBottom() {
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData()
		},

		methods: {
			//获取数据
			getData() {
				const app = this
				UserApi.boxes()
					.then(result => {
						app.page = result.data.page
						app.pages = result.data.pages
						app.record = result.data.record
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
		margin: 0rpx auto 20rpx auto;
		padding: 0 40rpx;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		background: #fff;
	}

	.input-view {
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
	}

	.text1 {
		float: right;
		position: absolute;
		right: 5%;
		color: #86909C;
	}
</style>
