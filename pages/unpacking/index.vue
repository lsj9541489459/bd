<template>
	<view class="unpacking">
		<image :src="'../../static/images/unpacking-box1.gif'" class="unpacking-bg" v-if="showGif==1"> </image>
		<image :src="'../../static/images/unpacking-box2.png'" class="unpacking-bg" v-else-if="showGif==2"> </image>
		<image :src="'../../static/images/unpacking-box3.gif'" class="unpacking-bg" v-else-if="showGif==3"> </image>
		<image :src="'../../static/images/unpacking-box4.png'" class="unpacking-bg" v-else-if="showGif==4"> </image>
		<!-- <image :src="'/../../static/images/unpacking-box.png'" class="unpacking-box"> </image> -->
		<view class="unpacking-btn" @click="unpacking">
			立即开盒
		</view>
		<view class="unpacking-sf">
			{{count}}
			<text></text>
		</view>
		<view class="unpackingPop-bg" v-if="showUnpacking">
			<view class="unpackingPop">
				<image :src="'../../static/images/unpacking-image.png'" class="unpacking-image-bg"> </image>
				<view class="unpackingPop-title"></view>
				<view class="unpackingPop-image">
					<image :src="'../../static/images/grade-box'+product.type+'.png'" class="unpackingPop-image-type">
					</image>
					<image :src="product.thumb" class="unpackingPop-image-thumb"> </image>
					<view class="unpackingPop-image-title">{{product.name}}</view>
					<view class="unpackingPop-image-price">￥{{product.price}}</view>
				</view>
				<view class="unpackingPop-btn">
					<text @click="goTo()">去仓库查收</text>
					<text @click="more()">再玩一次</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as BlindApi from '@/api/blind'
	export default {

		data() {
			return {
				count: 0,
				timer: null,
				showGif: 1,
				options: {},
				showUnpacking: false,
				product: {},
				open_type: 1
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad(options) {
			this.options = options
		},

		onShow() {
			this.countTime();
			setTimeout(() => {
				this.showGif = 2
			}, 880)
		},

		onUnload: function() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			goTo() {
				BlindApi.getGood({
						id: this.product.id,
						box_id: this.options.id,
					})
					.then(result => {
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/store/index'
							})
						}, 1000)

					})
			},
			more() {
				this.open_type = 2
				this.showGif = 2
				this.showUnpacking = false
			},
			unpacking() {
				this.showGif = 3
				let parm = {
					type: this.open_type,
					box_id: this.options.id,
					b_id: this.options.b_id,
					time: ((new Date()).getTime()) * 1000
				}

				BlindApi.getBonus(parm)
					.then(result => {
						console.log(parm);
						console.log(result);
						if (!result) {
							this.$toast("没有可用的盒子")
							setTimeout(() => {
								// this.$navTo('pages/weekLimit/index?id=' + this.options.id)
							}, 1000)
							return
						}
						setTimeout(() => {
							this.showGif = 4
							this.product = result.product
							this.showUnpacking = true
						}, 1000)
					})
			},
			countTime() {
				// 取二十万到三百万的随机数
				const app = this
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					this.count = this.getRandom(200000, 3000000)
				}, 100)
			},
			getRandom(istart, iend) {
				var iChoice = iend - istart + 1
				return Math.floor(Math.random() * iChoice + istart)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unpacking {
		min-height: 100vh;
		// background: url("@/static/images/unpacking-bg.png") no-repeat;
		background-size: 100%;
		background-color: #E4EEF5;
		text-align: center;
		position: relative;
		padding-top: 625rpx;

		.unpacking-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 625rpx;
			z-index: 0;
		}

		.unpacking-box {
			width: 388rpx;
			height: 137rpx;
			margin: 395rpx 40rpx 98rpx auto;
		}

		.unpacking-btn {
			width: 580rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: url("@/static/images/unpacking-btn.png") no-repeat;
			background-size: 100% 100%;
			margin: 0 auto;
			font-size: 36rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		.unpacking-sf {
			width: 341rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: url("@/static/images/unpacking-sf.png") no-repeat;
			background-size: 100% 100%;
			margin: 31rpx auto 0;
			font-size: 26rpx;
			font-weight: 400;
			color: #3D3D3D;
			text-align: right;
			padding-right: 59rpx;
			position: relative;

			text {
				position: absolute;
				right: 24rpx;
				top: 21rpx;
				width: 0;
				height: 0;
				border-width: 0 4px 4px;
				border-style: solid;
				border-color: transparent transparent #6572A8;
			}
		}

		.unpackingPop-bg {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.65);
			z-index: 999;

			.unpacking-image-bg {
				width: 100%;
				height: 930rpx;
				animation: fadenum 5s linear infinite;
				position: absolute;
				left: 0;
				top: 200rpx;
				z-index: -1;
				opacity: 0.8;
			}

			@keyframes fadenum {
				100% {
					transform: rotate(360deg);
				}
			}

			.unpackingPop-title {
				width: 100%;
				height: 69rpx;
				line-height: 69rpx;
				background: url("@/static/images/unpacking-gxhd.png") no-repeat;
				background-size: 100% 100%;
				margin-top: 234rpx;

			}

			.unpackingPop-image {
				text-align: center;
				width: 401rpx;
				height: 560rpx;
				margin: 30rpx auto 47rpx;
				// background-image: url("@/static/images/grade-box1.png");
				// background-repeat: no-repeat;
				// background-size: 100% 100%;
				animation: bounce-down 0.5s linear 1;
				position: relative;

				.unpackingPop-image-type {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: -1;
				}

				.unpackingPop-image-thumb {
					width: 284rpx;
					height: 284rpx;
					margin-top: 26rpx;
					margin-bottom: 4rpx;
				}

				.unpackingPop-image-title {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					line-height: 28rpx;
					color: #FFFFFF;
					font-weight: 400;
					font-size: 20rpx;
					margin-bottom: 18rpx;
					padding: 0 85rpx;
				}

				.unpackingPop-image-price {
					font-size: 30rpx;
					font-weight: 700;
					color: #FFFFFF;
					line-height: 28rpx;
				}
			}

			@keyframes bounce-down {
				0% {
					transform: translateY(-400px);
				}

				100% {
					transform: translateY(0);
				}
			}

			.unpackingPop-btn {
				font-size: 36rpx;
				font-weight: 700;
				color: #000000;

				text {
					display: inline-block;
					width: 274rpx;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					background-image: url("@/static/images/unpacking-btn2.png");
					background-repeat: no-repeat;
					background-size: 100% 100%;

					&:nth-child(2) {
						background-image: url("@/static/images/unpacking-btn1.png");
					}
				}
			}
		}
	}
</style>