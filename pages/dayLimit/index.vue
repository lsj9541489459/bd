<template>
	<!-- 商品组 -->
	<view class="diy-goods">
		<view class="day-view">
			<view class="week" :style="'background:url('+thumb+') no-repeat 100% 100%;'"></view>
			<view class="over-time">
				<text class="over-text">距结束:</text>
				<text class="current-time">{{hour}}</text>:
				<text class="current-time">{{minite}}</text>:
				<text class="current-time">{{second}}</text>
			</view>
		</view>

		<view class="must-bonus">
			<view class="image-list">
				<text class="list" :class="0 == currentWeek ? 'active' : ''">周一</text>
				<text class="list" :class="1 == currentWeek ? 'active' : ''">周二</text>
				<text class="list" :class="2 == currentWeek ? 'active' : ''">周三</text>
				<text class="list" :class="3 == currentWeek ? 'active' : ''">周四</text>
				<text class="list" :class="4 == currentWeek ? 'active' : ''">周五</text>
				<text class="list" :class="5 == currentWeek ? 'active' : ''">周六</text>
				<text class="list" :class="6 == currentWeek ? 'active' : ''">周日</text>
			</view>
		</view>

		<view class="limit-view" :style="'background:url('+week_thumb+') no-repeat'" v-for="w in week">
			<view class="limit-time-text">
				<text class="limit-buy">限购{{w['limit_time']}}次</text>
				<view class="limit-right">
					<text>距结束：</text>
					<view class="count-time">{{hour}}</view>:<view class="count-time">{{minite}}</view>:<view
						class="count-time">{{second}}</view>
				</view>
			</view>

			<view class="week">
				<view class="week-left">
					<view class="week-info">
						<text>{{w['tip']}}</text>
						<text
							class="week-tip">买{{w['buy_number']}}抽送{{w['give_number']}}抽，到手{{w['buy_number'] + w['give_number']}}抽</text>
						<view class="week-price-info"><text>￥</text><text>{{w.blind_price}}</text><text>{{w.buy_total}}W+已购买</text></view>
						<view class="buy-button" @click="openNow(w.id)">({{w.has_buy}}/3)</view>
					</view>
					<image class="week-thumb" :src="w.thumb"></image>

					<view class="week-good-list">
						<image :src="g.product.thumb" v-for=" g in w.goods"></image>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import * as GoodApi from '@/api/goods'

	export default {
		name: "goods",
		/**
		 * 组件的属性列表
		 * 用于组件自定义设置
		 */
		data() {
			return {
				hour: 0,
				minite: 0,
				second: 0,
				weeks: [],
				currentWeek: null,
				thumb: null,
				week_thumb: null
			}
		},
		onShow() {
			this.getData()
		},
		/**
		 * 组件的方法列表
		 * 更新属性和数据的方法与更新页面数据的方法类似
		 */
		methods: {
			getData() {
				const app = this
				GoodApi.dayLimit().then(result => {
					app.week = result.data.week
					app.thumb = result.data.thumb
					app.week_thumb = result.data.bg
					app.currentWeek = result.data.currentWeek
					app.hour = result.data.remain_time[0]
					app.minite = result.data.remain_time[1]
					app.second = result.data.remain_time[2]

					app.countTime()
				})
			},
			countTime() {
				const app = this
				setInterval(() => {
					app.second--
					if (app.second < 1) {
						app.minite--
						app.second = 59
					}
					if (app.minite < 1) {
						app.hour--
					}
					if (app.hour < 1) {
						uni.$navto("/pages/dayLimit/index")
					}
				}, 1000)
			},
			lookAll() {

			},
			openNow(e) {
				this.$navTo('pages/weekLimit/index?id=' + e)
			}

		}

	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: YouSheBiaoTiHei-Bold;
		src: url("/static/font/YouSheBiao.TTF");
	}

	.diy-goods {
		height: 100%;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;
		background-color: #fff;

		.day-view {
			height: 410rpx;
			background-size: 100% 100%;
		}

		.week {
			height: 380rpx;
			background-size: 100% 100% !important;
		}

		.week-text {
			display: grid;
			color: #33197F;
			margin-left: 25px;
			margin-top: 15px;
		}

		.buy1 {
			font-size: 30px;
			font-weight: 400;
		}

		.buy2 {
			margin-top: 5px;
			font-weight: 700;
			font-size: 15px;
		}

		.over-time {
			width: 350rpx;
			display: flex;
			height: 30px;
			line-height: 30px;
			margin-left: 5px;
			margin-top: -40px;
			padding-left: 10px;
			color: #fff;
			position: absolute;
			z-index: 11;
			background: url('/static/images/over-time.png') no-repeat;
			background-size: 100% 100%;
		}

		.over-text {
			margin-right: 5px;
		}

		.current-time {
			height: 24px;
			line-height: 24px;
			width: 24px;
			background-color: #fff;
			margin-right: 2px;
			margin-left: 2px;
			margin-top: 3px;
			border-radius: 5px;
			color: #FF3737;
			text-align: center;
		}

		.day-good {
			width: 45%;
			height: 155px;
			position: absolute;
			top: 30px;
			right: 5%;
		}

		.week-good-price {
			width: 40%;
			height: 34px;
			line-height: 35px;
			margin: -2% auto 15px;
			background-image: url('/static/images/week-price.png');
			background-size: 100% 100%;
			text-align: center;
			font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
			font-weight: 700;
		}

		.good-name {
			width: 75%;
			margin: 0 auto;
			font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
			font-weight: 700;
		}

		.must-bonus {
			margin-top: 0px;
			height: 70px;
		}

		.must-bonus-bg {
			height: 60px;
			background-image: url('/static/images/must-bonus-bg.png');
			background-size: 100% 100%;
			color: #fff;
		}

		.bg1 {
			height: 30px;
			background: url('/static/images/open-box.png') no-repeat;
			background-size: 45% 100%;
		}

		.bg1 text {
			margin-left: 48%;
			height: 30px;
			line-height: 35px;
			color: #C5C3C4;
		}

		.bg2 {
			margin-top: 5px;
			background: url('/static/images/guarantee.png') no-repeat;
			background-size: 35px 12px;
			background-position-y: 3px;
			float: left;
			margin-left: 10px;
		}

		.bg2 text {
			margin-left: 45px;
			color: #C5C3C4;
		}

		.must-content {
			height: 280px;
			background-size: 100% 100%;
			z-index: 555;
		}

		.look-all {
			float: right;
			position: absolute;
			color: #6C6CB9 !important;
			right: 6%;
		}

		.image-list {
			width: 100%;
			height: 40px;
			line-height: 40px;
			margin-top: 15px;
			display: flex;
			position: absolute;
			background: rgba(15, 65, 157, 0.1);
			border-radius: 5px;
		}

		.list {
			width: 14.2%;
			text-align: center;
			color: #3D3D3D;
			font-size: 24rpx;
		}

		.list image {
			width: 30px;
			height: 30px;
			padding-left: 20%;
		}

		.list {}

		.active {
			height: 40px;
			text-align: center;
			color: #1D132C !important;
			background: linear-gradient(180deg, #5EE6FF 0%, #B195FF 100%);
			background-size: 100% 100%;
		}

		.buy-button {
			width: 290rpx;
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 15rpx;
			background: url("@/static/images/bt-ljkh1.png") no-repeat;
			background-size: 100% 100% !important;
		}

		.limit-view {
			width: 90%;
			height: 520rpx;
			margin: 15px auto;
			background-size: 100% 100% !important;
			background-position-y: 12rpx !important;
		}

		.limit-time-text {
			display: flex;
			color: #fff;
		}

		.week-good-list image {
			width: 14%;
			height: 80rpx;
			margin: 0 3%;
		}

		.week-good-list {
			width: 100%;
			height: 100rpx;
			margin-top: 40rpx;
		}

		.limit-buy {
			line-height: 90rpx;
			padding-left: 40rpx;
			font-size: 50rpx;
			font-family: YouSheBiaoTiHei-Bold;
		}

		.limit-right {
			width: 300rpx;
			display: flex;
			line-height: 90rpx;
			margin-right: 0px;
			position: absolute;
			right: 20rpx;
		}

		.week-info {
			display: grid;
			padding-left: 40rpx;
		}

		.week-info text:nth-child(1) {
			font-size: 40rpx;
			color: #1F182A;
			font-weight: bold;
			margin: 30rpx 0px 10rpx;
		}

		.week-tip {
			color: #FF6E64;
			margin: 0rpx 0px 10rpx;
		}

		.week-price-info text:nth-child(3) {
			margin-left: 8%;
			font-size: 24rpx;
			color: #726C7B;
		}

		.week-price-info text:nth-child(2) {
			font-size: 40rpx;
			font-weight: bold;
		}

		.week-price-info text:nth-child(1) {
			font-size: 26rpx;
			color: #1F182A;
		}

		.week-thumb {
			position: absolute;
			right: 10%;
			width: 160rpx;
			height: 160rpx;
			margin-top: -250rpx;
			background-color: #fff;
			padding: 40rpx;
		}

		.count-time {
			width: 40rpx;
			background-color: #fff;
			color: #FF3737;
			height: 40rpx;
			line-height: 40rpx;
			margin-top: 25rpx;
			text-align: center;
			border-radius: 10rpx;
		}

		.must-price1 {
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			color: #2C61CB;
			font-size: 16px;
			text-align: center;
			background: url('/static/images/must-price1.png') no-repeat;
			background-size: 100% 100%;
		}

		.scroll-Y {
			height: 300rpx;
		}

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			padding-top: 90px;
		}

		.scroll-view-item {
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;
			font-size: 36rpx;
		}

		.scroll-view-item_H {
			display: inline-block;
			width: 45%;
			height: 300rpx;
			margin-top: 20px;
			margin-left: 20px;
			line-height: 300rpx;
			background-color: #fff;
			text-align: center;
			font-size: 36rpx;
			border-radius: 10px;
		}

		.lists {
			display: grid;
		}

		.scroll-view-item_H image {
			width: 80%;
			margin: 6% 10%;
			height: 90px;
		}

		.buy-area {
			width: 80%;
			margin: 30px auto 40px;
			height: 60px;
			background: url("/static/images/ljkh.png") no-repeat;
			background-size: 100% 100%;
		}

		.times {
			width: 80px;
			position: absolute;
			height: 18px;
			margin-top: 20px;
			margin-left: 5px;
			background: url("/static/images/limited-time.png") no-repeat;
			background-size: 100% 100%;
		}

		.times text {
			padding-left: 15px;
			font-size: 12px;
			color: #fff;
		}

		.start-number {
			position: absolute;
			height: 18px;
			margin-top: 36px;
		}

		.prices {
			position: absolute;
			margin-left: 15px;
			font-size: 20px;
			margin-top: -10px;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 700;
		}

		.number {
			color: #726C7B;
			font-size: 12px;
			margin-left: 15px;
		}

		.gives {
			width: 60px;
			line-height: 14px;
			height: 20px;
			position: absolute;
			margin-top: -5px;
			right: 10%;
			color: #fff;
			text-align: center;
			font-size: 12px;
			background: url("/static/images/gives.png") no-repeat;
			background-size: 100% 100%;
		}

	}
</style>