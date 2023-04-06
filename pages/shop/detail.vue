<template>
	<view v-show="!isLoading" class="container">
		<!-- 商品图片轮播 -->
		<!-- <SlideImage v-if="!isLoading" :video="goods.video" :videoCover="goods.videoCover" :images="goods.goods_images" /> -->
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval">
			<swiper-item>
				<image :src="s" v-for="s in banner"></image>
			</swiper-item>
		</swiper>

		<view class="content">
			<view class="area-price">
				<view class="area1">
					<text class="ren">￥</text>
					<text class="price">{{goods.product.price}}</text>
					<text class="youmi">{{goods.hash_coin}} 优米豆</text>
				</view>
				<view class="good-name">{{goods.name}}</view>
			</view>

		</view>

		<view class="detail">
			<view class="detail-title">商品详情</view>
			<view class="contents">
				<mp-html :content="goods.product.content" container-style="text-align: center;"></mp-html>
			</view>
		</view>

		<view class="buy-button">
			<view class="exchange" @click="exchange">优米豆兑换</view>
			<view class="buy" @click="buyNow">立即购买</view>
		</view>


		<!-- 选择商品规格 -->
		<view v-if="showSku" class="goods-choice m-top20 b-f">
			<view class="spec-list">
				<view class="sku-title">
					<view class="sku-left">
						<image :src="goods.product.thumb"></image>
					</view>
					<view class="sku-right">
						<image class="close" src="../../static/images/close.png" @click="hideSku"></image>
						<view>{{goods.name}}</view>
						<view v-if="tradeType == 'exchange'"><text>{{goods.hash_coin}}</text><text>优米豆</text></view>
						<view class="prices" v-else><text>￥</text><text>{{goods.product.price}}</text></view>
					</view>
				</view>
				<view v-if="goods.product.sku.length > 0">
					<view class="sku-view" v-for="s,k in goods.product.sku">
						<view>{{s.name}}</view>
						<view>
							<text v-for="v,k1 in s.value" @click="getAttributes(k,k1)">
								{{v}}
							</text>
						</view>
					</view>
				</view>

				<view class="number">
					<text>数量</text>
					<view>
						<text @click="changeNum('minus')">-</text>
						<input v-model="num"/>
						<!--<input v-model="num" :value="num" @input="getInput" />-->
						<text @click="changeNum('plus')">+</text>
					</view>
				</view>

				<view class="exchangeNow" @click="tradeNow"></view>
			</view>
		</view>

	</view>
</template>

<script>
	import * as GoodsApi from '@/api/goods'
	import SlideImage from '../goods/components/SlideImage'
	import Service from '../goods/components/Service'

	export default {
		components: {
			SlideImage,
			Service
		},
		data() {
			return {
				// 正在加载
				isLoading: false,
				// 当前商品ID
				goodsId: null,
				// 商品详情
				goods: {},
				// 购物车总数量
				cartTotal: 0,
				// 显示/隐藏SKU弹窗
				showSkuPopup: false,
				// 模式 1:都显示 2:只显示购物车 3:只显示立即购买
				skuMode: 1,

				showSku: false,
				banner: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				skus: [],
				num: 0,
				tradeType: null,
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			// 记录商品ID
			this.goodsId = parseInt(options.id)
			// 加载页面数据
			this.onRefreshPage()
		},

		methods: {
			// 刷新页面数据
			onRefreshPage() {
				const app = this
				GoodsApi.detail({
						id: this.goodsId
					})
					.then(result => {
						app.goods = result.data.product
						app.banner = result.data.product.product.banner
						if (result.data.product.product.sku.length > 0) {
							app.skus.push(-1)
						}
					})
			},
			exchange() {
				this.showSku = true
				this.tradeType = 'exchange'
				this.num = 0
			},
			buyNow() {
				this.showSku = true
				this.tradeType = 'pay'
				this.num = 1
			},
			changeNum(type) {
				if (type == 'minus') {
					if (this.num > 0) {
						this.num--
					}
				} else {
					this.num++
				}
			},
			getAttributes(p, p1) {
				console.log(p, p1)
			},
			tradeNow() {
				if (this.num < 1) {
					uni.showToast({
						title: '购买数量不能小于1',
						icon: 'none'
					})
					return false
				}
				this.showSku = false
				if (this.tradeType == 'exchange') {

				} else {
					this.$navTo('pages/shop/order?id=' + this.goods.id + '&sku=黑色&num=' + this.num)
				}
			},
			getInput(e) {
				if (e.detail.value != '') {
					this.num = e.detail.value
				}
			},
			hideSku() {
				this.showSku = false
			}
		},
	}
</script>

<style>
	page {
		background: #fafafa;
	}
</style>
<style lang="scss" scoped>
	@font-face {
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
	}

	.container {
		background-color: #F5F6F7;
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;

		.content {
			background-color: #fff;
			padding-bottom: 20px;
			margin-bottom: 20px;
		}

		.swiper {
			width: 90%;
			height: 300rpx;
			margin: 0 auto;
		}

		.area-price {
			width: 90%;
			margin-left: 5%;
			margin-top: 20px;
		}

		.ren {
			font-weight: 700;
		}

		.price {
			font-weight: 700;
			font-size: 20px;
		}

		.youmi {
			margin-left: 5%;
			color: #D99147;
			font-weight: 700;
		}

		.good-name {
			font-size: 16px;
			margin-top: 15px;
		}


		.detail {
			background-color: #fff;
		}

		.contents {
			width: 90%;
			margin: 40rpx auto;
			text-align: center;
		}

		.detail-title {
			font-size: 16px;
			padding: 15px 0px 20px 15px;
			font-weight: 700;
		}

		.buy-button {
			width: 80%;
			height: 40px;
			line-height: 40px;
			margin-left: 10%;
			position: fixed;
			font-size: 16px;
			font-weight: 700;
			display: flex;
			bottom: 30px;
			text-align: center;
			color: #fff;
			font-weight: 700;
		}

		.buy-button view {
			width: 45%;
		}

		.exchange {
			background: url("/static/images/exchange.png") no-repeat;
			background-size: 100% 100%;
		}

		.buy {
			margin-left: 10%;
			background: url("/static/images/shop-buy.png") no-repeat;
			background-size: 100% 100%;
		}

		.scroll-view-box {
			flex: 1;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}

		.info {
			padding: 15px;
			color: #666;
		}

		.info-text {
			font-size: 14px;
			color: #666;
		}

		.info-content {
			padding: 5px 15px;
		}

		.close {
			padding: 10px;
		}

		.prices text {
			font-size: 26rpx !important;
			color: #000000;
		}

		.prices text:nth-child(2) {
			margin-left: -10rpx;
			font-size: 34rpx !important;
		}

		.goods-choice {
			width: 100%;
			height: 100%;
			position: absolute;
			background: rgba(0, 0, 0, 0.6);
			top: 0rpx;
		}

		.spec-list {
			width: 100%;
			margin: 40% auto 0rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			position: absolute;
			bottom: 0rpx;
			padding: 40rpx;
		}

		.sku-title {
			height: 200rpx;
			display: flex;

		}

		.sku-left image {
			width: 160rpx;
			height: 160rpx;
		}

		.sku-right {
			margin-top: 10rpx;
		}

		.sku-right view:nth-child(2) {
			font-size: 36rpx;
		}

		.sku-right view:nth-child(3) {
			margin-top: 20rpx;
			color: #D99147;
		}

		.sku-right view:nth-child(3) text:nth-child(1) {
			font-size: 36rpx;
			margin-right: 10rpx;
		}

		.sku-view {
			min-height: 110rpx;
		}

		.sku-view view:nth-child(1) {
			height: 60rpx;
		}

		.sku-view text {
			background-color: #F9F9F9;
			padding: 20rpx 30rpx;
		}

		.close {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			right: 10rpx;
			margin-top: -50rpx;
		}

		.number {
			margin-top: 20rpx;
			display: flex;
		}

		.number view {
			width: 200rpx;
			position: absolute;
			right: 40rpx;
			display: flex;
			text-align: center;
		}

		.number view text {
			font-weight: 700;
			font-size: 40rpx;
			padding: 10rpx 20rpx;
			margin-top: -20rpx;
		}

		.number view input {
			width: 160rpx;
			font-size: 26rpx;
		}

		.exchangeNow {
			width: 80%;
			height: 80rpx;
			margin: 60rpx auto;
			background: url('@/static/images/exchange-button.png');
			background-size: 100% 100%;
		}









	}
</style>
