<template>
	<view class="container">
		<view class="message-bg" v-if="showNotice">
			<text>收不到系统消息?点我前往设置页打开吧~</text><image src="../../static/images/close.png" @click="hideNotice"></image>
		</view>
		<view class="time">02月15日 下午14:35</view>
		<view class="list">
			亲~欢迎来到盲盒优品,我们为你准备了【新人福利礼包】,包含150元盲盒超值优惠券和500优米豆,点击【优惠券】速来查收吧~
		</view>
	</view>
</template>

<script>
	import Images from "../../components/page/image/index";
	export default {
		components: {Images},
		data() {
			return {
				showNotice: true
			}
		},
		methods: {
			hideNotice(){
				this.showNotice = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("@/static/font/YouSheBiao.TTF");
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
		font-family: YouSheBiaoTiHei;
	}

	.container {
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;


		.message-bg{
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			color: #fff;
			background: url('@/static/images/message-bg.png') no-repeat;
			background-size: 100% 100%;
			padding-left: 30rpx;
		}

		.message-bg image{
			width: 50rpx;
			height: 50rpx;
			float: right;
			margin-top: 15rpx;
			margin-right: 30rpx;
		}

		.time {
			margin-top: 30rpx;
			text-align: center;
			color: #666666;
		}

		.list {
			width: 92%;
			margin: 30rpx 3%;
			background-color: #FFFFFF;
			padding: 30rpx;
			border-radius: 10rpx;
		}

	}
</style>
