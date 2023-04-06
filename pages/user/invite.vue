<template>
	<view class="container">
		<view class="bg">
			<image src="/../../static/images/invite-bg.png"></image>
		</view>

		<view class="content">
			<view class="invite-view1"></view>

			<view class="invite-area1">
				<view class="activity">
					<view class="activity-view">
						<view>好友注册成功你可得</view>
						<image src="/../../static/images/coupon-nine.png"></image>
						<text>9元无门槛优惠券</text>
					</view>

					<view class="activity-view">
						<view>好友首次购买盲盒你可得</view>
						<image src="/../../static/images/jxlh.png"></image>
						<text>49元盲盒 x1</text>
					</view>
				</view>

				<view class="coin">
					<view class="coin-view">
						<view class="coin-head">
							<image src="/../../static/images/coin.png"></image><text>699</text>
						</view>
						<view>好友第二次 购买盲盒你可得</view>
					</view>
					<view class="coin-view">
						<view class="coin-head">
							<image src="/../../static/images/coin.png"></image><text>999</text>
						</view>
						<view>好友第三次 购买盲盒你可得</view>
					</view>
					<view class="coin-view">
						<view class="coin-head">
							<image src="/../../static/images/coin.png"></image><text>10000</text>
						</view>
						<view>好友累计购买 2999元盲盒你可得</view>
					</view>
				</view>
			</view>

			<view class="invite-view2"></view>

			<view class="invite-area2">
				<view class="invite-step invite-step1">
					<view>点击立即邀请按钮</view>
					<view>向好友发送链接</view>
				</view>
				<view class="invite-step invite-step2">
					<view>好友打开链接</view>
					<view>马上注册下载</view>
				</view>
				<view class="invite-step invite-step3">
					<view>回到本页</view>
					<view>确认邀请关系</view>
				</view>
			</view>

			<view class="invite-person">
				<view class="button-list">
					<view @click="changeTab(0)"
						:style="currentButtonIndex == 0 ? 'background:url(../../static/images/my-bonus-bg.png) no-repeat;backgroundSize:100% 24rpx;backgroundPositionY:28rpx;' : ''">
						{{currentButtonIndex == 1 ? '我的奖励' : ''}}
					</view>
					<view @click="changeTab(1)"
						:style="currentButtonIndex == 1 ? 'background:url(../../static/images/my-friend-bg.png) no-repeat;backgroundSize:100% 24rpx;backgroundPositionY:28rpx;' : ''">
						{{currentButtonIndex == 0 ? '我的朋友' : ''}}
					</view>
				</view>

				<view class="bonus" v-if="currentButtonIndex == 0">
					<scroll-view scroll-y="true" class="bonus-scroll">
						<view class="bonus-result">共获得{{bonusNum}}优米豆</view>
						<view class="bonus-list">
							<text>9元无门槛优惠券</text>
							<text>2023.02.22</text>
						</view>
					</scroll-view>
				</view>

				<view class="friends" v-else>
					<scroll-view scroll-y="true" class="friend-scroll">
						<view class="bonus-result">共邀请{{friendNum}}个好友</view>
						<view class="bonus-list1">
							<image src="/../../static/images/avatar.png"></image>
							<text>177****4348</text>
							<text>2023.02.22</text>
						</view>
					</scroll-view>
				</view>
			</view>

			<view class="invite-button" @click="inviteNow">立即邀请</view>
		</view>

		<view class="share" v-show="showWindow" @click="closeShare">
			<view class="share-view">
				<view class="share-title"><text>分享</text>
					<image src="/../../static/images/close.png" @click="closeShare"></image>
				</view>
				<view class="share-list">
					<view @click="shareWechat">
						<image src="/../../static/images/ico_wechat.png"></image>
						<text>微信</text>
					</view>
					<view @click="shareFriendArea">
						<image src="/../../static/images/ico_pyq.png"></image>
						<text>朋友圈</text>
					</view>
					<view @click="copyLink">
						<image src="/../../static/images/ico_lj.png"></image>
						<text>链接</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentButtonIndex: 0,
				bonus: [],
				fridens: [],
				list: [],
				bonusNum: 0,
				friendNum: 0,
				showWindow: false,
			}
		},
		methods: {
			inviteNow() {
				this.showWindow = true
			},
			shareWechat() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});

			},
			shareFriendArea() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneTimeline",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});

			},
			copyLink() {
				uni.setClipboardData({
					data: 'http://www.baidu.com',
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					}
				})
			},
			changeTab(e) {
				this.currentButtonIndex = e
			},
			closeShare(){
				this.showWindow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("@/static/font/YouSheBiao.TTF");
		font-family: YouSheBiaoTiHei-Bold;
	}

	.container {
		width: 100%;

		.content {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 66;
		}

		.bg image {
			width: 100%;
			min-height: 186vh;
		}

		.invite-view1 {
			width: 40%;
			height: 100rpx;
			margin: 53vh 30% 10rpx;
			background: url("@/static/images/invite-star.png") no-repeat;
			background-size: 100% 100%;
		}

		.invite-area1 {
			width: 100%;
			height: 41%;
			margin: 0 auto;
		}

		.activity {
			height: 300rpx;
		}

		.activity-view view:nth-child(1) {
			font-size: 12px;
			line-height: 60rpx;
			color: #000000;
		}

		.activity-view image {
			width: 50%;
			height: 150rpx;
			margin: 0rpx auto;
		}

		.activity-view text {
			text-align: center;
			color: #FFFFFF;
		}

		.activity-view {
			width: 47%;
			height: 300rpx;
			margin-left: 1.5%;
			float: left;
			display: grid;
			text-align: center;
			text-align: center;
			background: url('@/static/images/invite-view.png') no-repeat;
			background-size: 100% 100%;
		}

		.coin {
			width: 100%;
			height: 200rpx;
			margin: 20rpx 0rpx;
		}

		.coin-view {
			width: 30%;
			height: 200rpx;
			float: left;
			margin: 0 1.5%;
			background: url('@/static/images/coin-bg.png') no-repeat;
			background-size: 100% 100%;
		}

		.coin-head image {
			width: 60rpx;
			height: 50rpx;
			margin-top: 30rpx;
			margin-left: 20rpx;
			margin-right: 10rpx;
		}

		.coin-head text {
			background-image: linear-gradient(#4CFFF9, #54ACFF);
			font-size: 40rpx;
			font-weight: 500;
			margin-top: 30rpx;
			position: absolute;
			-webkit-background-clip: text;
			color: transparent;
		}

		.coin-view view:nth-child(2) {
			color: #fff;
			padding: 0 10rpx;
			font-size: 24rpx;
			text-align: center;
			margin-top: 40rpx;
		}

		.invite-view2 {
			width: 40%;
			height: 100rpx;
			margin: 40rpx 30% 10rpx;
			background: url("@/static/images/how-invite.png") no-repeat;
			background-size: 100% 100%;
		}

		.invite-area2 {
			width: 100%;
			height: 280rpx;
			margin: 0 auto;
		}

		.invite-step {
			width: 30%;
			height: 220rpx;
			margin: 0 1.5%;
			float: left;
		}

		.invite-step view:nth-child(2) {
			padding-bottom: 10rpx;
		}

		.invite-step view:nth-child(1) {
			margin-top: 130rpx;
			padding-top: 10rpx;
		}

		.invite-step view {
			width: 90%;
			margin: 0 auto;
			color: #FFFFFF;
			font-size: 24rpx;
			text-align: center;
			box-shadow: inset 0px 0px 29px 0px rgba(0, 0, 0, 0.302);
		}

		.invite-step1 {
			background: url("@/static/images/invite-step1.png") no-repeat;
			background-size: 100% 100%;
		}

		.invite-step2 {
			background: url("@/static/images/invite-step2.png") no-repeat;
			background-size: 100% 100%;
		}

		.invite-step3 {
			background: url("@/static/images/invite-step3.png") no-repeat;
			background-size: 100% 100%;
		}

		.button-list {
			width: 80%;
			margin: 0 10%;
			height: 80rpx;
			line-height: 80rpx;
		}

		.button-list view {
			width: 120rpx;
			margin: 0 15%;
			height: 80rpx;
			float: left;
			font-weight: 500;
			background-size: 100% 100%;
			color: #fff;
		}

		.active {
			background-image: linear-gradient(#4CFFF9, #54ACFF);
			text-align: center;
			-webkit-background-clip: text;
			color: transparent;
		}

		.bonus,
		.friends {
			width: 90%;
			height: 450rpx;
			margin: 0rpx auto 40rpx;
			background: url("@/static/images/invite-bonus-bg.png") no-repeat;
			background-size: 100% 100%;
			color: #FFFFFF;
		}

		.bonus-result {
			text-align: center;
			height: 120rpx;
			line-height: 120rpx;
			padding: 0 40rpx;
		}

		.bonus-list text:nth-child(1) {
			margin-left: 20rpx;
		}

		.bonus-list text:nth-child(2) {
			float: right;
			margin-right: 20rpx;
		}


		.bonus-list1 {
			display: flex;
			margin: 20rpx 0;
		}

		.bonus-list1 image {
			width: 50rpx;
			height: 50rpx;
			margin: 0 20rpx;
		}

		.bonus-list1 text:nth-child(3) {
			position: absolute;
			right: 20rpx;
		}

		.bonus-scroll,
		.friend-scroll {
			height: 440rpx;
		}

		.invite-button {
			width: 80%;
			height: 120rpx;
			line-height: 110rpx;
			margin: 40rpx auto;
			background: url("@/static/images/invite-now-button.png") no-repeat;
			background-size: 100% 100%;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			font-weight: 700;
		}

		.share {
			width: 100%;
			min-height: 186vh;
			background: rgb(102, 102, 102);
			opacity: 0.95;
			z-index: 99;
			position: absolute;
			top: 0px;
		}

		.share-view {
			background-color: #FFFFFF;
			width: 100%;
			height: 260rpx;
			position: absolute;
			bottom: 0px;
			opacity: 1;
			z-index: 100;
			border-radius: 20rpx 20rpx 0px 0px;
		}

		.share-title image {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			right: 20rpx;
			margin-top: 15rpx;
		}

		.share-title {
			text-align: center;
			line-height: 80rpx;
			font-size: 30rpx;
		}

		.share-list{
			margin-top: -20rpx;
		}

		.share-list view {
			width: 20%;
			float: left;
			margin: 40rpx 6.5%;
			display: grid;
			text-align: center;
		}

		.share-list view image{
			width: 80rpx;
			height: 80rpx;
			margin-left: 25%;
			margin-bottom: 15rpx;
		}



	}
</style>
