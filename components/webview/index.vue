<template>
	<view class="invite-box">
		<img src="http://d2fe1554.heziyoupin.com/static/api/images/xishi.png" class="invite-box-grade" alt="" sizes="" srcset="">
		<img src="http://d2fe1554.heziyoupin.com/uploads/1dc0/d94a6f8501138ff2fb33b34ab7c7.png" class="invite-box-img" alt="" sizes="" srcset="">
		<!-- <view class="close" src="/static/close.png" v-on:click="$closeInvite">×</view> -->
		{{_specia}}
	</view>
</template>

<script>
	export default {
		name: 'invite',

		props: {
			_specia: String
		},

		data() {
			return {}
		},

		mounted() {
			console.log('组件内推送的消息', this._specia);
		}
	}
</script>

<style scoped lang='scss'>
	.invite-box {
		position: fixed;
		top: 81rpx;
		left: 81rpx;
		width: 650rpx;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 74rpx;
		color: #fff;
		font-size: 28rpx;
		z-index: 9999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background: url("@/static/images/view-bg.png") no-repeat;
		background-size: 100% 100%;
		.invite-box-grade{
			width: 58rpx;
			height: 44rpx;
			position: absolute;
			left: -19rpx;
			bottom: 0;
			z-index: 1;
		}
		.invite-box-img{
			
				width: 80rpx;
				height: 80rpx;
				position: absolute;
				left: -19rpx;
				bottom: 9rpx;
				z-index: 0;
		}
	}
</style>