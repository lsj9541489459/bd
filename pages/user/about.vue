<template>
	<view class="container">
        <view class="logo">
            <view class="logo-image"><image src="/../../static/images/logo-icon.png"></image></view>
            <view class="logo-text">盲盒优品</view>
        </view>

		<view class="form-wrapper">
			<view class="input-view" @click="agreements('user')">
				<text>用户协议</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>
			<view class="input-view" @click="agreements('secret')">
				<text>隐私协议</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>
			<view class="input-view" @click="agreements('vip')">
				<text>会员服务协议</text>
				<image class="arrow-right" src="../../static/images/arrow-right1.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		methods: {
            agreements(type) {
				this.$navTo('pages/user/agreement?type='+type)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
        background-color: #F5F6F7;
    }

    .logo{
        width: 100%;
        height: 350rpx;
        background: url('@/static/images/about-bg.png') no-repeat;
        background-size: 100% 100%;
    }

    .logo-image image{
        width: 160rpx;
        height: 160rpx;
        margin-top: 80rpx;
        margin-bottom: 20rpx;
        margin-left: 40%;
    }

    .logo-text{
        text-align: center;
        font-size: 32rpx;
        font-weight: 700;
    }


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
	}

	.input-view{
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
		box-shadow: inset 0px -1px 0px 0px #E5E6EB;
	}

	.text{
		float: right;
		position: absolute;
		right: 9%;
		color: #86909C;
	}

	.text1{
		float: right;
		position: absolute;
		right: 5%;
		color: #86909C;
	}

	.arrow-right{
		position: absolute;
		right: 10px;
		margin-top: 18rpx;
		width:18px;
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

		.uni-input-input{
			text-align: right;
		}

	}
</style>
