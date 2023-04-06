<template>
	<view class="container">
		<view class="logout-head">
			<image src="/../../static/images/no-notice.png"></image>
		</view>
		
		<view class="logout-content">
			<view class="header">账号注销后将视为已放弃一下权利:</view>

			<view class="tips">
				<view>1、账号信息、身份信息、联系人信息等将全部被清空且无法回复</view>
				<view>2、邀请明细、交易记录等将被清空且无法恢复 
					<view class="child">·请确保所有交易已完结且无纠纷 </view>
					<view class="child">·账号注销后仓库中遗留的商品和盲盒等资产将视作自动放弃</view>
				</view>
				<view>3、注销后,账户中的虚拟资产都将作废无法恢复</view>
				<view>4、被注销的账号将不可重新登录,需要重新注册盲盒优品才可登录APP</view>
			</view>
		</view>
		
		<view class="submit">
			<label class="item-radio1" @click="agreement">
				<radio class="radio" color="rgb(47,35,41)" :checked="hasAgree"></radio>
			</label>
			<view>我已知晓注销行为不可恢复,且自愿放弃账户所有资产</view>
		</view>
		
		<view class="submit-button" @click="logout">确定注销</view>
	</view>
</template>

<script>
	import * as UserApi from '@/api/user'

	export default {
		data() {
			return {
				hasAgree: false,
			}
		},
		methods: {
			logout(){
				if(!this.hasAgree){
					uni.showToast({
						title:'请先同意协议',
						icon:'none'
					})
					return false
				}
				UserApi.logoff().then(result => {
					if(result.status == 200){
						uni.showToast({
							title: '注销成功',
							icon: 'none'
						})
						setTimeout(function () {
							uni.switchTab({
								url: '/pages/index/index'
							})
						},2000)
					}else{
						uni.showToast({
							title: '注销失败',
							icon: 'none'
						})
					}

				})
			},
			agreement(){
				this.hasAgree = !this.hasAgree
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;
	}

	.container{
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;

		.logout-head{
			height: 450rpx;
			width: 100%;
			background: url('@/static/images/logout-bg.png') no-repeat;
			background-size: 100% 100%;
		}
		
		.logout-head image{
			width: 260rpx;
			height: 260rpx;
			margin-left: 32%;
		}

		.logout-content{
			margin-top: -200rpx;
		}
		
		.header{
			width: 94%;
			margin-left: 3%;
			font-size: 32rpx;
			font-weight: 700;
		}
		
		.tips{
			margin-top: 3%;
			margin-left: 3%;
		}
		
		.tips view{
			line-height: 50rpx;
			font-size: 24rpx;
		}
		
		.child{
			margin-left: 40rpx;
		}

		.submit{
			width: 94%;
			margin-left: 3%;
			display: flex;
			font-size: 24rpx;
			margin-top: 60rpx;
		}

		.item-radio1 {
			font-size: 24rpx;
			width: 30px;
			margin-top: -3px;
			.radio {
				width: 20px;
				height: 20px;
				vertical-align: middle;
				transform: scale(0.76)
			}
		}

		.submit-button{
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			color: #fff;
			font-size: 34rpx;
			text-align: center;
			margin-left: 25%;
			margin-top: 40rpx;
			background: url('@/static/images/shop-buy.png') no-repeat;
			background-size: 100% 100%;
		}

		
	}
</style>
