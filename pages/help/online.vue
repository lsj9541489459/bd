<template>
	<view class="container">
		<!--<view class="common-question">
			<view class="common-title">猜你想问</view>
			<view class="question" @click="question(1)">抽到商品后怎么提货？</view>
		</view>-->

		<view class="chat">
			<mp-html :content="content"></mp-html>
			<!--<view class="system">
				<view class="system-message">
					<image class="system-image" src="/../../static/images/app.png"></image>
					<view>02-18 13:12:00</view>
					<view>
						您好，智能机器人在线解答您的疑问，向我发送关键词即可回复您的问题。
					</view>
				</view>

				<view class="custom-message">
					<image class="customer-image" src="/../../static/images/avatar.png"></image>
					<view>02-18 13:12:00</view>
					<view>
						您好，智能机器人在线解答您的疑问，向我发送关键词即可回复您的问题。
					</view>
				</view>

				<view class="system-message">
					<image class="system-image" src="/../../static/images/app.png"></image>
					<view>02-18 13:12:00</view>
					<view>
						您好，智能机器人在线解答您的疑问，向我发送关键词即可回复您的问题。
					</view>
				</view>

				<view class="custom-message">
					<image class="customer-image" src="/../../static/images/avatar.png"></image>
					<view>02-18 13:12:00</view>
					<view>
						您好，智能机器人在线解答您的疑问，向我发送关键词即可回复您的问题。
					</view>
				</view>

			</view>-->
		</view>
	</view>
</template>

<script>
	import MpHtml from "../../uni_modules/mp-html/components/mp-html/mp-html";
	export default {
		components: {MpHtml},
		data() {
			return {
				/*guess: {},
				robot: ""*/
				content: '<iframe src="https://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=1586218&configID=584670&jid=8266165353&s=1" style="width:100%;height:90vh;"></iframe>'
			}
		},
		methods: {
			/*question(id) {
				this.$navTo('pages/help/detail?id=' + id)
			}*/
		}
	}
</script>

<style lang="scss" scoped>
	.chat{
		width: 100%;
		height:100vh;
	}
	/*@font-face {
		src: url("@/static/font/YouSheBiao.TTF");
		font-family: YouSheBiaoTiHei-Bold;
	}

	.container {
		background-color: #F5F6F7;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;


		.common-question {
			width: 92%;
			margin-left: 3%;
			margin-top: 40rpx;
			height: 100%;
			background-color: #fff;
			border-radius: 10rpx;
		}

		.common-title,
		.question {
			font-weight: 700;
			border-bottom: 1px solid #EEEEEE;
			padding: 20rpx;
		}

		.question {
			color: #666666;
			border-bottom: 1px solid #EEEEEE;
			padding: 20rpx;
		}

		.system-image,
		.customer-image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 80rpx;
		}

		.chat {
			width: 92%;
			margin-left: 3%;
			margin-top: 60rpx;
			padding-bottom: 100rpx;
		}

		.system-message {
			padding: 20rpx 0px;
		}

		.system-message view:nth-child(2) {
			margin-left: 100rpx;
			margin-top: -80rpx;
			color: #999999;
		}

		.system-message view:nth-child(3) {
			width: 55%;
			margin-left: 100rpx;
			margin-top: 10rpx;
			color: #999999;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
		}

		.custom-message {
			margin-top: 20rpx;
			padding: 20rpx 0px;
		}

		.custom-message image{
			float: right;
		}

		.custom-message view:nth-child(2) {
			height: 40rpx;
			float: right;
			margin-right: 20rpx;
			color: #999999;
		}

		.custom-message view:nth-child(3) {
			width: 55%;
			color: #999999;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			margin-top: 50rpx;
			margin-left: 30%;
		}

		.input {
			position: fixed;
			z-index: 111;
			width: 100%;
			height: 80rpx;
			background-color: #F2F3F5;
			bottom: 0px;
		}

	}*/
</style>
