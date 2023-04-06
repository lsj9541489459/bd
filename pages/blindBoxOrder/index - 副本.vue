<template>
	<view class="blindBoxOrder-bg">
		<view class="blindBoxOrder">
			<view class="blindBoxOrder-countDown">剩{{min}}分{{second}}秒自动关闭</view>
			<view class="blindBoxOrder-address">
				<view class="address-bg"></view>
				<view class="address">
					<view class="address-name">
						<text>卢浩玲</text>
						<text>13988887963</text>
					</view>
					<view class="address-site">浙江省宁波市镇海区招宝山街道975号206室</view>
				</view>
				<view class="address-right"></view>
				<view class="blindBoxOrder-address-bottom"></view>
			</view>
			<view style="height: 20rpx;"></view>
			<view class="blindBoxOrder-goods">
				<image src="/../../static/images/tz.png" mode=""></image>
				<view class="goods">
					<view class="goods-title">苹果（Apple） ipad2021/2022款10.2英寸平板电脑</view>
					<view class="goods-specifications">EU36 ; 米白</view>
					<view class="goods-priceNumber">
						<view class="goods-price">
							￥<text>{{detail.price}}</text>
						</view>
						<view class="goods-number">x{{detail.number}}</view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			<view class="blindBoxOrder-list-bg">
				<view class="blindBoxOrder-list">
					<view>商品总价</view>
					<view><text class="fs24">￥</text><text class="fs30 fw700">{{detail.total_money}}</text></view>
				</view>
				<view class="blindBoxOrder-list">
					<view>运费</view>
					<view><text class="fs24">￥</text><text class="fs30 fw700">{{detail.order_number}}</text></view>
				</view>
				<view class="blindBoxOrder-list">
					<view>实付金额</view>
					<view><text class="fs24">￥</text><text class="fs30 fw700">{{detail.total_money}}</text></view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			<view class="blindBoxOrder-list-bg">
				<view class="blindBoxOrder-list">
					<view>订单编号</view>
					<view><text class="fs24 c999">{{detail.order_number}}&nbsp;&nbsp;|&nbsp;&nbsp;</text><text
							class="ml10 fs24">复制</text></view>
				</view>
				<view class="blindBoxOrder-list">
					<view>创建时间</view>
					<view class="fs24 c999">{{detail.create_time}}</view>
				</view>
				<view class="blindBoxOrder-list">
					<view>支付方式</view>
					<view class="fs24 c999">{{detail.pay_type}}</view>
				</view>
			</view>
		</view>
		<view style="height: 20rpx;"></view>
		<view style="height: 100rpx;"></view>
		<view class="windowPop">
			<view class="pop-btn">
				修改地址
			</view>
			<view class="pop-btn pop-btn-buy">
				继续付款
			</view>
		</view>

	</view>
</template>

<script>
	import * as BlindApi from '@/api/blind'
	import * as Order from '@/api/order'
	export default {

		data() {
			return {
				dynamicTitle: "等待买家付款",
				curStartTime: '2024-07-31 08:00:00',
				day: '0',
				hour: '00',
				min: '00',
				second: '00',
				options: {},
				detail:{}
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad(options) {
			this.options = options
		},

		onShow() {
			uni.setNavigationBarTitle({
				title: this.dynamicTitle,
				success: () => {
					console.log('修改标题成功')
				},
				fail: () => {
					console.log('修改标题失败')
				},
				complete: () => {
					console.log('修改标题结束')
				},
			})

			this.countTime()
			this.init()
		},

		onUnload: function() {},
		methods: {
			init() {
				Order.findOrder({
						order_no: this.options.order_no,
					})
					.then(result => {
						this.detail = result.data
					})
			},
			// 倒计时
			countTime() {
				// 获取当前时间
				let date = new Date()
				let now = date.getTime()
				// 设置截止时间
				let endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
				let end = endDate.getTime()
				// 时间差
				let leftTime = end - now
				// 定义变量 d,h,m,s保存倒计时的时间
				if (leftTime >= 0) {
					// 天
					this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
					// 时
					let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
					this.hour = h < 10 ? '0' + h : h
					// 分
					let m = Math.floor(leftTime / 1000 / 60 % 60)
					this.min = m < 10 ? '0' + m : m
					// 秒
					let s = Math.floor(leftTime / 1000 % 60)
					this.second = s < 10 ? '0' + s : s
				} else {
					this.day = 0
					this.hour = '00'
					this.min = '00'
					this.second = '00'
				}
				// 等于0的时候不调用
				if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) ===
					0) {
					return
				} else {
					// 递归每秒调用countTime方法，显示动态时间效果,
					setTimeout(this.countTime, 1000)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.blindBoxOrder-bg {
		color: #333333;
		min-height: 100vh;
		background: url("@/static/images/blindBoxOrder-bg.png") no-repeat;
		background-size: 100%;
		background-color: #F5F6F7;

		.blindBoxOrder {
			position: relative;
			padding: 160rpx 20rpx 0;

			.blindBoxOrder-countDown {
				line-height: 64rpx;
				color: #1A1A1A;
				font-weight: 400;
				font-size: 24rpx;
				position: absolute;
				left: 0;
				right: 0;
				top: 88rpx;
				margin: 0 auto;
				text-align: center;
			}

			.blindBoxOrder-address {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 215rpx;
				background-color: #fff;
				border-radius: 15rpx;
				padding: 0 26rpx;
				position: relative;

				.address-bg {
					width: 63rpx;
					height: 63rpx;
					flex: 0 0 63rpx;
					background: url("@/static/images/address.png") no-repeat;
					background-size: 100% 100%;
					margin-right: 30rpx;
				}

				.address {
					min-width: 382rpx;

					.address-name {
						margin-bottom: 20rpx;
						font-weight: 500;
						line-height: 45rpx;
						color: #999999;

						text {
							&:nth-child(1) {
								font-size: 36rpx;
								color: #333333;
							}

							&:nth-child(2) {
								font-size: 30rpx;
								margin-left: 15rpx;
							}
						}
					}

					.address-site {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						line-height: 45rpx;
					}
				}

				.address-right {
					width: 40rpx;
					height: 40rpx;
					flex: 0 0 40rpx;
					background: url("@/static/images/arrow-right1.png") no-repeat;
					background-size: 100% 100%;
					margin-left: 30rpx;
				}

				.blindBoxOrder-address-bottom {
					position: absolute;
					width: 672rpx;
					height: 6rpx;
					background: url("@/static/images/blindBoxOrder-address-bottom.png") no-repeat;
					background-size: 100% 100%;
					bottom: 0;
					left: 0;
					right: 0;
					margin: 0 auto;
				}
			}

			.blindBoxOrder-goods {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #fff;
				border-radius: 15rpx;
				padding: 30rpx 26rpx;

				image {
					width: 166rpx;
					height: 100rpx;
					flex: 0 0 166rpx;
					margin-right: 20rpx;
				}

				.goods {
					.goods-title {
						font-size: 30rpx;
						color: #3D3D3D;
						line-height: 43rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;

					}

					.goods-specifications {
						font-size: 24rpx;
						color: #999999;
						line-height: 36rpx;
						margin: 8rpx 0 24rpx;
					}

					.goods-priceNumber {
						font-weight: 700;
						line-height: 36rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.goods-price {
							color: #333333;
							font-size: 24rpx;

							text {
								font-size: 30rpx;
							}
						}

						.goods-number {
							font-size: 30rpx;
							color: #3D3D3D;
							font-weight: 400;
						}
					}
				}
			}
		}

		.blindBoxOrder-list-bg {
			background-color: #fff;
			border-radius: 15rpx;
			padding: 0 26rpx;

			.blindBoxOrder-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				border-bottom: 1px solid #EEEEEE;
				font-size: 28rpx;

				&:last-child {
					border-bottom: none;
				}
			}
		}

		.fs28 {
			font-size: 28rpx;
		}

		.fs24 {
			font-size: 24rpx;
		}

		.fs30 {
			font-size: 30rpx;
		}

		.fw700 {
			font-weight: 700;
		}

		.c999 {
			color: #999999;
		}

		.ml10 {
			margin-left: 10rpx;
		}

		.windowPop {
			width: 100%;
			height: 100rpx;
			position: fixed;
			background: #fff;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 0 20rpx;

			.pop-btn {
				width: 188rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 26rpx;
				text-align: center;
				color: #1F182A;
				flex: 0 0 188rpx;
				background: url("@/static/images/blindBoxOrder-btn.png") no-repeat;
				background-size: 100% 100%;
			}

			.pop-btn-buy {
				color: #fff;
				background: url("@/static/images/blindBoxOrder-btn1.png") no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>