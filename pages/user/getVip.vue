<template>
	<view class="container">
		<view class="header">
			<image src="../../static/images/crown.png"></image>
			<view>
				<text>Hi，17777777777</text>
				<text>开通会员，享受四大权益</text>
			</view>
			<image class="rule" src="../../static/images/icon_gz.png" @click="vipRule"></image>
		</view>

		<view class="vip-benefits">
			<view class="benefits">
				<image src="../../static/images/line.png"></image><text>会员福利</text>
				<image src="../../static/images/line1.png"></image>
			</view>
			<view class="vip-list">
				<view>
					<image src="../../static/images/icon_qcby.png"></image><text>全场包邮</text>
				</view>
				<view>
					<image src="../../static/images/icon_lzzsz.png"></image><text>连轴折上折</text>
				</view>
				<view>
					<image src="../../static/images/icon_mrlhb.png"></image><text>每日领红包</text>
				</view>
				<view>
					<image src="../../static/images/icon_mdfb.png"></image><text>每单返币</text>
				</view>
			</view>
		</view>

		<view class="free-post">
			<view class="free-title">全场包邮</view>
			<view class="first">. 会员每单都可享受免邮权益，全年365天，天天免运费。</view>
		</view>

		<view class="continuous-discount">
			<view class="free-title" style="margin-top: 35rpx;">连轴折上折</view>
			<view class="first view">. 会员购买盲盒时，连抽可享受折上折优惠</view>
			<view class="view">. 折上折折扣会随着会员等级的提升变化，低至折上95折</view>
			<view class="view">. 该权益适用于大部分盲盒，部分特殊盲盒如每日限购盲盒、新人必买盲盒等不享受连抽</view>

		</view>

		<view class="daily-red">
			<view class="free-title">每日领红包</view>
			<view class="first view">. 会员每天可在（每日必领-会员专享）处领取一张无门槛优惠券</view>
			<view class="view">. 优惠券额度会随着会员等级的提升变化，最高每日可领10元无门槛券 </view>
		</view>

		<view class="daily-coin">
			<view class="free-title">每单返豆</view>
			<view class="first view">. 会员每单支付成功后会根据实际消费金额赠送一定数量的优米豆</view>
			<view class="view">. 赠送优米豆比例会随着会员等级的提升变化，最高每单可返2500豆</view>
		</view>

		<view class="button">
			<view class="submit" @click="getVip">
				<view>￥<text>{{vip}}/月</text></view>
				<view>立即开通会员</view>
			</view>
			<view class="item" @click="selectRule">
				<radio class="radio" color="rgb(47,35,41)" :checked="checked"></radio><text>请阅读《会员服务协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vip: 14.9,
				checked: false
			}
		},
		methods: {
			getVip() {
				if(!this.checked){
					uni.showToast({
						title: '请先同意会员服务协议',
						icon: 'none'
					})
					return false;
				}
			},
			selectRule(){
				this.checked = !this.checked
			},
			vipRule(){
				this.$navTo('pages/user/rule')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
	}

	.container {
		width: 100%;
		min-height: 100vh;
		padding-top: 120rpx;
		background-color: rgb(17, 17, 17);
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;

		.header {
			width: 90%;
			margin: 0 auto;
			height: 220rpx;
			background: url('@/static/images/vip-header.png') no-repeat;
			background-size: 100% 100%;
			border: 2px solid;
			border-image: radial-gradient(circle, rgba(191.00000381469727, 170.0000050663948, 134.00000721216202, 1), rgba(190.99500328302383, 169.99761879444122, 134.00208950042725, 0)) 2 2;
		}

		.header image:nth-child(1) {
			width: 180px;
			height: 340rpx;
			position: absolute;
			right: 0%;
			top: -60rpx;
		}

		.rule {
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			top: 20rpx;
			right: 40rpx;
			z-index: 666;
		}

		.header view text:nth-child(2) {
			font-size: 36rpx;
			margin-top: 30rpx;
			background: radial-gradient(26deg, #D0B9A8 0%, #F2E9DF 100%);
			font-weight: bolder;

		}

		.header view {
			color: #F8D7C4;
			display: grid;
			padding-left: 40rpx;
			padding-top: 60rpx;
		}

		.benefits {
			width: 90%;
			margin: 60rpx auto 40rpx;
			display: flex;
			color: #D3BDAD;
		}

		.benefits text {
			padding: 0 5%;
		}

		.benefits image {
			width: 36%;
			height: 20rpx;
			float: left;
			margin-top: 10rpx;
		}

		.vip-list {
			width: 90%;
			margin: 40rpx auto;
			height: 160rpx;
			color: #D3BDAD;
		}

		.vip-list view image {
			width: 100rpx;
			margin: 0 auto 20rpx;
			height: 100rpx;
		}

		.vip-list view {
			width: 25%;
			float: left;
			display: grid;
			text-align: center;
		}

		.free-post {
			width: 90%;
			height: 200rpx;
			margin: 10rpx auto;
			background: url("@/static/images/free-post.png") no-repeat;
			background-size: 100% 100%;
			display: grid;
			color: #D3CCC8;
		}

		.free-title {
			background: linear-gradient(283deg, #FACEAE 0%, #FFF2D4 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin-left: 50rpx;
			position: absolute;
			margin-top: 34rpx;
			font-family: Source Han Sans CN-Bold;
			font-weight: bold;
		}
		
		.first {
			padding-top: 100rpx;
		}

		.continuous-discount {
			width: 90%;
			height: 360rpx;
			margin: 10rpx auto;
			background: url("@/static/images/continue-discount.png") no-repeat;
			background-size: 100% 100%;
			color: #D3CCC8;
		}

		.view {
			margin-bottom: 20rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
		}

		.daily-red {
			width: 90%;
			height: 300rpx;
			margin: 10rpx auto;
			background: url("@/static/images/daily-red-package.png") no-repeat;
			background-size: 100% 100%;
			color: #D3CCC8;
		}

		.daily-coin {
			width: 90%;
			height: 300rpx;
			margin: 10rpx auto;
			background: url("@/static/images/daily-coin.png") no-repeat;
			background-size: 100% 100%;
			color: #D3CCC8;
		}

		.button {
			height: 200rpx;
		}

		.submit view:nth-child(1) text {
			font-size: 36rpx;
		}

		.submit view:nth-child(1) {
			color: #F33D17;
		}

		.submit view:nth-child(2) {
			color: #fff;
			font-size: 30rpx;
		}

		.submit view {
			width: 50%;
			float: left;
			font-weight: bold;
		}

		.submit {
			width: 80%;
			margin: 40rpx auto 20rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: url("@/static/images/buy-vip.png") no-repeat;
			background-size: 100% 100%;
			text-align: center;
		}

		.item radio {
			width: 30rpx;
			height: 30rpx;
		}

		.item {
			width: 80%;
			margin: 0rpx auto;
			text-align: center;
			color: #767676;
		}

		.radio {
			vertical-align: middle;
			transform: scale(0.5);
			margin-right: 10rpx;
			margin-top: -10rpx;
		}







	}
</style>