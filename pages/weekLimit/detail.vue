<template>
	<view class="container">
		<!-- 商品图片轮播 -->
		<!--<SlideImage :images="good.banner" />-->

		<view class="images-swiper">
			<swiper class="swiper-box" :autoplay="autoplay" :duration="duration"
					:interval="interval" @change="setCurrent">
				<!-- 轮播图片 -->
				<swiper-item v-for="(item, index) in good.banner" :key="index" @click="onPreviewImages(index)">
					<view class="slide-image">
						<image class="image" :draggable="false" :src="item"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="swiper-count">
				<text>{{ currentIndex }}</text>
				<text>/</text>
				<text>{{ total }}</text>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="good-info m-top20">
			<!-- 价格、销量 -->
			<view class="info-item info-item__top">
				<view class="block-left dis-flex flex-y-center">
					<!-- 商品售价 -->
					<text class="floor-price__samll">￥</text>
					<text class="floor-price">{{ good.product.price }}</text>
				</view>

			</view>

			<view class="good-name">
				{{good.name}}
			</view>
		</view>

		<!-- 商品描述 -->
		<view class="good-content m-top20">
			<view class="item-title b-f">
				<text>商品详情</text>
			</view>
			<block v-if="good.product.content != ''">
				<view class="good-content__detail b-f">
					<mp-html :content="good.product.content" />
				</view>
			</block>
			<empty v-else tips="亲，暂无商品描述" />
		</view>

	</view>
</template>

<script>
	import * as GoodApi from '@/api/goods'
	import SlideImage from '../goods/components/SlideImage'
	import SkuPopup from '../goods/components/SkuPopup'

	export default {
		components: {
			SlideImage,
			SkuPopup
		},
		data() {
			return {
				// 正在加载
				isLoading: false,
				// 当前商品ID
				goodId: null,
				// 商品详情
				good: {},
				// 显示/隐藏SKU弹窗
				showSkuPopup: false,
				// 模式 1:都显示 2:只显示购物车 3:只显示立即购买
				skuMode: 1,
				total: 0,

				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 4000, // 自动切换时间间隔
				duration: 800, // 滑动动画时长
				currentIndex: 1, // 轮播图指针
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			// 记录商品ID
			this.goodId = parseInt(options.id)
			// 加载页面数据
			this.onRefreshPage()
		},

		methods: {

			// 刷新页面数据
			onRefreshPage() {
				const app = this
				app.isLoading = true
				app.getgoodDetail()

			},

			// 获取商品信息
			getgoodDetail() {
				const app = this
				GoodApi.blind({id:app.goodId})
						.then(result => {
							app.good = result.data.good
							app.total = result.data.good.banner.length
						})
			},
			// 设置轮播图当前指针 数字
			setCurrent({ detail }) {
				const app = this
				app.currentIndex = detail.current + 1
			},

			// 浏览商品图片
			onPreviewImages(index) {
				const app = this
				const imageUrls = []
				app.good.banner.forEach(item => {
					imageUrls.push(item);
				});
				uni.previewImage({
					current: imageUrls[index],
					urls: imageUrls
				})
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
		src: url("@/static/font/YouSheBiao.TTF");
	}

	.container{
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;

		.images-swiper{
			padding: 60rpx auto !important;
			position: relative;
		}

		.swiper-box {
			width: 100%;
			height: 750rpx;
		background-image: url("@/static/images/detail-bg.png");
		background-size: 100% 100%;
			/* #ifdef H5 */
			// max-width: 480px;
			max-height: 480px;
			// margin: 0 auto 80rpx;
			/* #endif */

			// 图片轮播
			.slide-image {
				position: relative;
				width: 100%;
				// margin: 60rpx auto;
				height: 100%;

				.image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}

		// swiper计数
		.swiper-count {
			width: 80rpx;
			// float: right;
			padding: 2rpx 18rpx;
			// margin-right: 60rpx;
			// margin-top: -60rpx;
			background: rgba(0, 0, 0, 0.363);
			border-radius: 50rpx;
			color: #fff;
			font-size: 26rpx;
			position: absolute;
			bottom: 40rpx;
			right: 30rpx;
		}

		.good-info{
			margin-top: 0;
			padding: 20rpx;
			background-color: #FFFFFF;
		}

		.good-name{
			margin:20rpx 0px;
		}

		.floor-price{
			font-size: 40rpx;
		}

		.item-title text{
			padding-left: 40rpx;
			text-align: center;
			font-size: 30rpx;
		}

		.good-content{
			background: #FFFFFF;
		}

		.good-content__detail{
			width: 100%;
			margin-top: 40rpx;
			text-align: center;
		}

		.item-title{
			font-family: Source Han Sans CN-Bold, Source Han Sans CN;
			font-weight: 700;
			padding: 20rpx 0px;
		}
	}

</style>
