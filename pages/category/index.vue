<template>
	<view class="page-items">
		<!-- 首页头部组 -->
		<Category />
		<!-- 轮播图 -->
		<Banner :dataList="banner" />

		<view class="icons">
			<view class="icon" @click="goList(c.id)" v-for="c in category">
				<image :src="c.icon"></image>
				<text>{{c.name}}</text>
			</view>

		</view>
		<view class="hot-view">
			<view class="hot-text" @click="shopList('hot')">
				<text>MORE</text>
				<image src="/../../../static/images/arrow-right1.png"></image>
			</view>

			<view class="hot-good">
				<view class="hot-list" v-for="h,k in hot" @click="goDetail(h.id)">
					<image class="top1" v-if="k == 0" src="/../../../static/images/top1.png"></image>
					<image class="top2" v-else src="/../../../static/images/top2.png"></image>
					<image class="hot-image" v-if="k == 0" :src="h.product.thumb"></image>
					<image class="hot-image hot-right" else :src="h.product.thumb"></image>
				</view>
			</view>
		</view>

		<view class="goods">
			<view class="good-detail" @click="goDetail(l.id)" v-for="l in list">
				<view>
					<image :src="l.product.thumb"></image>
				</view>
				<view class="price1">￥{{l.product.price}}</view>
				<view class="youmi">{{l.hash_coin}} 优米豆</view>
			</view>


		</view>
	</view>
</template>

<script>
	import Category from '../../components/page/head/category'
	import Index from "../../components/page/blank/index"
	import Banner from "../../components/page/banner/index"
	import * as Api from '@/api/category/index'
	import Images from "../../components/page/image/index";

	export default {
		name: "Page",
		components: {
			Images,
			Index,
			Category,
			Banner,
		},
		data() {
			return {
				banner: [],
				category: [],
				hot: [],
				list: []
			}
		},
		onShow() {
			this.loadData()
		},
		methods: {
			loadData() {
				const app = this
				Api.list()
					.then(result => {
						// 设置页面数据
						app.banner = result.data.banner
						app.category = result.data.category
						app.hot = result.data.hot
						app.news = result.data.new
						app.list = result.data.list

					})
			},
			shopList(type) {
				this.$navTo('pages/shop/list?type=' + type)
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/shop/detail?id=' + id
				})
			},
			goList(id) {
				uni.navigateTo({
					url: '/pages/shop/list?id=' + id
				})
			},
			goOrderEnsure(id) {
				uni.navigateTo({
					url: '/pages/shop/order?id=' + id
				})
			}
		}
	}
</script>
<style lang="scss">
	@font-face {
		font-family: YouSheBiaoTiHei-Bold;
		src: url("/static/font/YouSheBiao.TTF");
	}

	// 组件样式
	.page-items {
		background: linear-gradient(180deg, #F6F6F6 0%, #F1F1F1 100%);
		height: 100%;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;

		.icons {
			margin-top: 20px;
			height: 200px;
		}

		.icon {
			width: 22%;
			float: left;
			text-align: center;
			margin: 15px 1.5%;
			height: 60px;
			display: grid;
		}

		.icon image {
			width: 40%;
			height: 40px;
			margin-left: 30%;
		}

		.icon text {
			margin-top: 10px;
		}

		.hot-view {
			width: 90%;
			height: 220px;
			margin-left: 5%;
			background: url("@/static/images/xrxd_bg.png") no-repeat;
			background-size: 100% 100%;
		}

		.hot-text {
			width: 100px;
			height: 34px;
			margin-left: 10px;
			background: url("@/static/images/hot-rank.png") no-repeat;
			background-size: 100% 22px;
			background-position-y: 10px;
			color: #fff;
		}

		.hot-text text {
			position: absolute;
			right: 16%;
			margin-top: 10px;
			height: 16px;
		}

		.hot-text image {
			position: absolute;
			right: 8%;
			margin-top: 12px;
			width: 30px;
			height: 16px;
		}

		.new-text {
			width: 100px;
			height: 68rpx;
			margin-left: 10rpx;
			background: url("@/static/images/mrsx.png") no-repeat;
			background-size: 100% 35rpx;
			background-position-y: 10rpx;
			color: #fff;
		}

		.new-text text {
			position: absolute;
			right: 16%;
			margin-top: 10rpx;
			height: 16px;
		}

		.new-text image {
			position: absolute;
			right: 8%;
			margin-top: 12rpx;
			width: 30px;
			height: 16px;
		}

		.hot-good {
			display: flex;
		}

		.hot-good .hot-list {
			width: 45%;
			height: 120rpx;
			text-align: center;
		}

		.top1,
		.top2 {
			width: 160rpx;
			height: 50rpx;
			position: absolute;
			margin-top: 30rpx;
		}

		.top1 {
			left: 8%;
		}

		.top2 {
			margin-left: 0px;
		}

		.hot-image {
			width: 70%;
			height: 180rpx;
			margin-top: 120rpx;
		}

		.hot-right {
			margin-left: 8%;
		}

		.daily-new {
			margin-top: 40rpx;
			width: 90%;
			margin-left: 5%;
			height: 400rpx;
			background: url("@/static/images/xrxd_bg1.png") no-repeat;
			background-size: 100% 100%;
		}

		.daily-image {
			width: 200rpx;
			height: 30rpx;
			margin-left: 30rpx;
			margin-top: 10rpx;
		}

		.new-list {
			width: 100%;
			display: flex;
			margin-top: 90rpx;
			text-align: center;
		}

		.new-image {
			width: 40%;
			float: left;
			margin-left: 5%;
			height: 240rpx;
		}

		.new-image image {
			width: 80%;
			height: 200rpx;
		}

		.goods {
			height: 100%;
			margin-left: 5%;
			margin-top: 10px;
			padding-bottom: 30px;
		}

		.good-detail,
		.good-detail1 {
			height: 190px;
			width: 45%;
			background-color: #fff;
			border-radius: 15px;
			color: #3D3D3D;
			display: inline-grid;
		}

		.good-detail {
			margin: 40rpx 5% 0rpx 0px;
		}

		.good-detail1 {
			margin: 40rpx 5% 0px 0px;
		}

		.good-detail image,
		.good-detail1 image {
			width: 80%;
			height: 100px;
			margin: 20px 10% 0px;
		}

		.price1 {
			font-family: Roboto-Regular, Roboto;
			font-size: 20px;
			margin-left: 10px;
		}

		.youmi {
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: 500;
			color: #D99147;
			margin-left: 10px;
			font-weight: 700;
		}

	}
</style>
