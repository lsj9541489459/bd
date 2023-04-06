<template>
	<view class="blindBoxOrder-bg">
		<view class="blindBoxOrder">
			<view class="blindBoxOrder-dd"> <text></text> 等待买家付款</view>
			<view class="blindBoxOrder-countDown">还剩{{min}}分{{second}}秒自动关闭</view>
			<view class="blindBoxOrder-goods">
				<view class="goods-imgs">
					<image :src="detail.product.gif" mode="" class="goods-imgs-gif"></image>
					<image :src="detail.product.thumb" mode="" class="goods-imgs-thumb"></image>
				</view>
				<!-- <image src="/../../static/images/tz.png" mode=""></image> -->
				<view class="goods">
					<view class="goods-title">{{detail.product.name}}</view>
					<view class="goods-priceNumber">
						<view class="goods-price">
							￥<text>{{detail.order.price}}</text>
						</view>
						<view class="goods-number">x{{detail.order.number}}</view>
					</view>
				</view>
			</view>
			<view class="blindBoxOrder-list-bg">
				<view class="blindBoxOrder-list">
					<view>商品总价</view>
					<view><text class="fs24">￥</text><text class="fs30 fw700">{{detail.order.total_money}}</text></view>
				</view>
				<view class="blindBoxOrder-list">
					<view>合计</view>
					<view><text class="fs24">￥</text><text class="fs30 fw700">{{detail.order.total_money}}</text></view>
				</view>
				<view class="blindBoxOrder-list-xian">
					<text></text>
					<text></text>
					<text></text>
				</view>
				<view class="blindBoxOrder-list">
					<view>订单编号</view>
					<view>
						<text class="fs24 c999">
							{{detail.order.order_number}}&nbsp;&nbsp;|&nbsp;&nbsp;</text>
						<text class="ml10 fs24">复制</text>
					</view>
				</view>
				<view class="blindBoxOrder-list">
					<view>创建时间</view>
					<view class="fs24 c999">{{detail.order.create_time}}</view>
				</view>
				<view class="blindBoxOrder-list">
					<view>支付方式</view>
					<view class="fs24 c999">{{detail.order.pay_type}}</view>
				</view>
			</view>
		</view>
		<view style="height: 20rpx;"></view>
		<view style="height: 100rpx;"></view>
		<view class="windowPop">
			<view class="pop-btn" @click="cancel">
				取消订单
			</view>
			<view class="pop-btn pop-btn-buy" @click="pay">
				立即付款
			</view>
			<view class="pop-btn-amount">
				<view class="fs24 c989898">
					合计
				</view>
				<view class="pop-btn-amount-price">
					<text class="fs30">￥</text>
					<text class="fs36 fw700">{{detail.order.total_money}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import * as BlindApi from '@/api/blind'
	import * as Order from '@/api/order'
	import * as Pay from '@/api/pay'
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
				detail: {
					order: {},
					product: {}
				},
				update_time: new Date().getTime(),
				timer: null
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad(options) {
			this.options = options
		},

		onShow() {

			this.countdown()
			this.init()
		},

		onUnload: function() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			cancel() {
				Order.cancel({
						order_no: this.options.order_no,
					})
					.then(result => {
						this.$toast("取消订单成功")
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000)
					})
			},
			pay() {
				let that = this
				Pay.getInfo({
						order_no: that.options.order_no,
					}, {
						type: 2, //订单类型 type 1商城商品购买 2盲盒购买  3快递费
					})
					.then(result => {
						console.log(result.data);
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: result.data,
							success: function(res) {
								setTimeout(() => {
									that.$navTo('pages/unpacking/index?id=' + that.detail.order.blind_category_id)
								}, 1000)
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						})
					})
			},
			init() {
				Order.findOrder({
						order_no: this.options.order_no,
					})
					.then(result => {
						this.detail = result[0]
					})
			},
			countdown() {
				var time = 1800; //30分钟换算成1800秒
				this.timer = setInterval(() => {
					time = time - 1;
					this.min = parseInt(time / 60);
					this.second = parseInt(time % 60);
					if (this.min == 0 && this.second == 0) {
						clearInterval(this.timer);
						return
					}
				}, 1000);
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
				if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this
						.second) ===
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
		background: url("@/static/images/blindBoxOrder-bg1.png") no-repeat;
		background-size: 100%;
		background-color: #F5F6F7;

		.blindBoxOrder {
			position: relative;
			padding: 62rpx 20rpx 0;

			.blindBoxOrder-dd {
				font-size: 38rpx;
				font-weight: 700;
				color: #0C2F63;
				line-height: 55rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				text {
					display: inline-block;
					width: 34rpx;
					height: 34rpx;
					background: url("@/static/images/time-icon.png") no-repeat;
					background-size: 100%;
					margin-right: 6rpx;
				}
			}

			.blindBoxOrder-countDown {
				line-height: 35rpx;
				color: #8D8D8D;
				font-weight: 400;
				font-size: 24rpx;
				text-align: center;
			}

			.blindBoxOrder-goods {
				display: flex;
				// align-items: center;
				justify-content: flex-start;
				background-color: #fff;
				border-radius: 15rpx 15rpx 0 0;
				padding: 30rpx 26rpx;
				margin-top: 35rpx;

				.goods-imgs {
					width: 200rpx;
					height: 200rpx;
					flex: 0 0 200rpx;
					margin-right: 37rpx;
					background: url("@/static/images/hot-good-bg.png") no-repeat;
					background-size: 100% 100%;
					position: relative;

					.goods-imgs-gif {
						width: 175rpx;
						height: 35rpx;
						position: absolute;
						top: 0;
						left: 0;
					}

					.goods-imgs-thumb {
						width: 100%;
						height: 100%;
					}
				}

				.goods {
					.goods-title {
						font-size: 36rpx;
						color: #3D3D3D;
						font-weight: 700;
						line-height: 52rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						margin-top: 18rpx;
					}

					.goods-priceNumber {
						font-weight: 700;
						line-height: 36rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 8rpx;

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

			.blindBoxOrder-list-bg {
				background-color: #fff;
				border-radius: 0 0 15rpx 15rpx;
				padding: 0 26rpx 24rpx;

				.blindBoxOrder-list {
					display: flex;
					align-items: center;
					justify-content: space-between;
					line-height: 36rpx;
					font-size: 28rpx;
					margin-bottom: 40rpx;
				}

				.blindBoxOrder-list-xian {
					position: relative;
					height: 15rpx;
					margin-bottom: 32rpx;
					margin-top: -14rpx;

					text {
						display: inline-block;
						width: 15rpx;
						height: 15rpx;
						position: absolute;
						top: 0;
						background: #F5F6F7;

						&:nth-child(1) {
							left: -33.5rpx;
							border-radius: 50%;
						}

						&:nth-child(2) {
							width: 630rpx;
							height: 1rpx;
							left: 0;
							top: 7.5rpx;
						}

						&:nth-child(3) {
							right: -33.5rpx;
							border-radius: 50%;
						}
					}
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

		.fs36 {
			font-size: 36rpx;
		}

		.fw700 {
			font-weight: 700;
		}

		.c999 {
			color: #999999;
		}

		.c989898 {
			color: #989898;
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

			.pop-btn-amount {
				position: absolute;
				left: 30rpx;

				.pop-btn-amount-price {
					color: #F33D17;
				}
			}
		}
	}
</style>