<template>
	<view class="container">
		<view style="height: 70px;"></view>
		<view class="head">
			<view class="logo" @click="day"></view>
			<view class="kf" @click="services"></view>
			<view class="wfjs" @click="play">玩法介绍</view>
		</view>
		<!-- 店铺页面组件 -->
		<scroll-view scroll-y="true">
			<Banner :dataList="banner" />

			<view class="section">
				<view class="section1" v-if="left||right">
					<view class="head-banner1" :style="'background:url('+left+') no-repeat;'" @click="daily">
					</view>
					<view class="head-banner2 rank"
						:style="'background:url('+right+') no-repeat;backgroundSize:100% 100%'" @click="rank">
					</view>
				</view>

				<view class="new-person">
					<!-- 新人 -->
					<view class="new-title" v-if="limitOne"></view>
					<block v-if="limitOne">
						<view class="new-content" @click="goWeekLimit(limitOne.id)">
							<view class="new-left">
								<view>
									<image src="../../static/images/xr.png" class="new-icon"></image>
									<text class="buy-tip">{{limitOne.name}}</text>
								</view>
								<view class="buy-number1">
									<text>{{limitOne.tip}}</text>
								</view>
								<view class="new-view">
									<view class="price-list">
										<text class="new-price">￥0.01</text>
										<text class="original-price">￥{{limitOne.blind_price}}</text>
									</view>
									<image src="../../static/images/msm_red.png" style=""></image>
								</view>

							</view>
							<view class="new-right">
								<image :src="'../../static/images/xd1.png'" class="xd1"></image>
								<image :src="limitOne.thumb" class="good"></image>
							</view>
						</view>
					</block>
					<block v-if="limitThree">
						<view class="new-content new-content1" @click="goWeekLimit(limitThree.id)">
							<view class="new-left1">
								<image :src="'../../static/images/new-limit3.png'" class="xd1"></image>
								<image :src="limitThree.thumb" class="good"></image>
							</view>
							<view class="new-right1">
								<view>
									<image src="../../static/images/xr.png" class="new-icon"></image>
									<text class="buy-tip">{{limitThree.name}}</text>
								</view>
								<view class="buy-number1">
									<text>{{limitThree.tip}}</text>
								</view>
								<view class="new-view">
									<view class="price-list">
										<text class="new-price">￥{{limitThree.blind_price}}</text>
										<text class="original-price">￥{{limitThree.blind_price}}</text>
									</view>
									<image src="../../static/images/msm_red.png"></image>
								</view>
							</view>
						</view>
					</block>

					<!-- 热卖盲盒 -->
					<view class="hot">
						<text class="hot-text">热卖盲盒</text>
						<image class="hot-image" :src="'../../static/images/hot.png'"></image>
					</view>

					<view class="hot-good" @click="goWeekLimit(d.id)" v-for="(d,index) in hot.slice(0,2)" :key="d.id">
						<view class="hot-good-left">
							<view class="hot-good-left-title">{{d.name}}</view>
							<view class="price">
								券后&nbsp;￥&nbsp;<text>{{d.blind_price-coupon_number}}</text><text>￥{{d.blind_price}}</text>
							</view>
							<view class="commercialValue">
								<text>商品价值</text><text>￥{{d.min_price}}-{{d.max_price}}</text>
							</view>
							<view class="hot-good-buy">{{d.buy_number}}人+已购买</view>
							<view class="imgs">
								<image :src="b.product.thumb" v-for="b in d.datum" :key="b.id"></image>
							</view>
						</view>
						<view class="hot-good-right">
							<image class="hot-img" v-if="d.gif" :src="d.gif"></image>
							<image :src="d.thumb" class="hot-product"></image>
						</view>
						<!-- 
						<view class="hot-top">{{d.name}}</view>
						<view class="hot-view" @click="goWeekLimit(d.id)">
							<view class="hot-left">
								<view class="must-blind">必抽保底盲盒</view>
								<view class="hot-des">{{d.tip}}</view>
								<view class="hot-goods">
									<view><text>￥{{d.blind_price}}</text><text>{{d.buy_number}}人+已购买</text>
									</view>
									<image :src="b.product.thumb" v-for="b in d.datum"></image>
								</view>
							</view>
							<view class="hot-right">
								<image :src="d.thumb" class="hot-product"></image>
							</view>
						</view>
						 -->
					</view>

					<!-- 限定 -->
					<view class="week-limit" v-if="weekLimit.length>0">
						<view class="week-tip">
							<text class="limit-title">周{{week}}限定</text>
							<image :src="'../../static/images/arrow-right.png'"></image>
							<view class="right-time">
								<text class="limit-over">距结束：</text>
								<text class="limit-time">{{hour}}</text>
								：
								<text class="limit-time">{{minite}}</text>
								：
								<text class="limit-time">{{second}}</text>
							</view>
						</view>

						<view class="week-view" v-if="weekLimit" v-for="w in weekLimit" @click="goWeekLimit(w.id)">
							<view class="week-left">
								<image :src="w.thumb"></image>
							</view>
							<view class="week-right">
								<view class="week-limits">
									<text class="total-time">限购{{w.limit_time}}次</text>
									<text class="times">({{w.buy_times}}/{{w.limit_time}})</text>
								</view>

								<view class="week-xd">
									<image :src="'../../static/images/xd.png'"></image>
									<text>{{w.name}}</text>
								</view>

								<view class="week-give">{{w.tip}}</view>
								<view class="week-buy">
									<view class="week-num">
										<view>
											<text class="week-price ml20">￥</text>
											<text class="week-price week-price1">{{w.blind_price}}</text>
										</view>
										<text class="buy-number">{{w.buy_number}}+已购买</text>
									</view>
									<image :src="'../../static/images/msm_zs.png'">
									</image>
								</view>
							</view>
						</view>
					</view>

					<view class="hot-good" @click="goWeekLimit(d.id)" v-for="(d,i) in hot.slice(2,hot.length)"
						:key="d.id">
						<view class="hot-good-left">
							<view class="hot-good-left-title">{{d.name}}</view>
							<view class="price">
								券后&nbsp;￥&nbsp;<text>{{d.blind_price-coupon_number}}</text><text>￥{{d.blind_price}}</text>
							</view>
							<view class="commercialValue">
								<text>商品价值</text><text>￥{{d.min_price}}-{{d.max_price}}</text>
							</view>
							<view class="hot-good-buy">{{d.buy_number}}人+已购买</view>
							<view class="imgs">
								<image :src="b.product.thumb" v-for="b in d.datum" :key="b.id"></image>
							</view>
						</view>
						<view class="hot-good-right">
							<!-- <image class="hot-img" :src="'../../static/images/h2.png'"></image> -->
							<image :src="d.thumb" class="hot-product"></image>
						</view>
						<!-- <view class="hot-top">{{d.name}}</view>
						<view class="hot-view" @click="goWeekLimit(d.id)">
							<view class="hot-left">
								<view class="must-blind">必抽保底盲盒</view>
								<view class="hot-des">{{d.tip}}</view>
								<view class="hot-goods">
									<view><text>￥{{d.blind_price}}</text><text>{{d.buy_number}}人+已购买</text>
									</view>
									<image :src="b.product.thumb" v-for="b in d.datum"></image>
								</view>
							</view>
							<view class="hot-right">
								<image :src="d.thumb" class="hot-product"></image>
							</view>
						</view> -->
					</view>

				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import * as Api from '@/api/page'
	import Banner from "../../components/page/banner/index";

	const App = getApp()

	export default {
		components: {
			Banner
		},
		data() {
			return {
				windowWidth: 750,
				indicatorDots: false, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				duration: 800, // 滑动动画时长
				imgHeights: [], // 图片的高度
				imgCurrent: 0, // 当前banne所在滑块指针
				hour: 0,
				minite: 0,
				second: 0,

				// 页面参数
				options: {},
				left: '',
				right: '',
				// 页面属性
				banner: [],
				headBanner: [],
				weekLimit: [],
				week: '',
				hot: [],
				limit: [],
				limitOne: [],
				limitThree: [],
				timer: null,
				coupon_number: 0
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {
			// 加载页面数据
			this.getPageData();
			this.handdleMsg();
		},
		onUnload: function() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			// 发送和接收消息
			handdleMsg(msg) {
				let that = this;
				// that.$openInvite("你-----好")
				// console.log(that.global.ws);
				// if (that.global.ws && that.global.ws.readyState == 1) {
				// 	console.log("发送信息", msg);
				// 	that.global.ws.send(msg);
				// }
				that.global.ws.onmessage = function(res) {
					console.log("收到服务器内容", res);
					// setInterval(()=>{
					// 	let aa =  new Date();
					// 	 that.$openInvite("你-----好"+aa)
					// 	 setTimeout(()=>{
					// 	  that.$closeInvite();
					// 	 },1000)
					// },3000)
				};
			},

			/**
			 * 加载页面数据
			 * @param {Object} callback
			 */
			getPageData() {
				const app = this
				Api.index()
					.then(result => {
						// 设置页面数据
						app.banner = result.data.banner
						app.headBanner = result.data.headBanner
						app.weekLimit = result.data.week_limit
						app.hot = result.data.hot
						app.limit = result.data.limit
						app.coupon_number = result.data.coupon_number

						app.left = result.data.headBanner['left']
						app.right = result.data.headBanner['right']
						app.limitOne = result.data.limit[0]
						app.limitThree = result.data.limit[1]

						app.week = result.data.week
						app.hour = result.data.remain_time[0]
						app.minite = result.data.remain_time[1]
						app.second = result.data.remain_time[2]

						app.countTime()
					})
			},
			day() {
				this.$navTo('pages/dayLimit/index')
			},
			services() {
				this.$navTo('pages/help/online')
			},
			play() {
				this.$navTo('pages/help/player')
			},
			onLink(e) {
				this.$navTo(e)
			},
			daily() {
				this.$navTo('pages/daily-get/index')
			},
			rank() {
				this.$navTo('pages/rank/index')
			},
			goWeekLimit(id) {
				this.$navTo('pages/weekLimit/index?id=' + id)
			},
			countTime() {
				const app = this
				clearInterval(app.timer)
				app.timer = setInterval(() => {
					app.second--
					if (app.second < 1) {
						app.minite--
						app.second = 59
					}
					if (app.minite < 1) {
						app.hour--
					}
					if (app.hour < 1) {
						uni.switchTab({
							url: "/pages/index/index"
						})
					}
				}, 1000)
			}
		},

		/**
		 * 下拉刷新
		 */
		onPullDownRefresh() {
			// 获取首页数据
			this.getPageData(() => {
				uni.stopPullDownRefresh()
			})
		},

		/**
		 * 分享当前页面
		 */
		onShareAppMessage() {
			const app = this
			const {
				page
			} = app
			return {
				title: page.params.share_title,
				path: "/pages/index/index?" + app.$getShareUrlParams()
			}
		},

		/**
		 * 分享到朋友圈
		 * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
		 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
		 */
		onShareTimeline() {
			const app = this
			const {
				page
			} = app
			return {
				title: page.params.share_title,
				path: "/pages/index/index?" + app.$getShareUrlParams()
			}
		}

	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: YouSheBiaoTiHei-Bold;
		src: url("@/static/font/YouSheBiao.TTF");
	}

	.container {
		// background: linear-gradient(180deg, #FFFFFF 0%, #dedede 54%);
		background: linear-gradient(180deg, #FFFFFF 0%, #F1F1F1 54%);
		height: 100%;
	}

	.head {
		width: 100%;
		height: 60px;
		display: flex;
		padding-top: 30px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		background-color: #fff;
	}

	.logo {
		width: 120px;
		height: 35px;
		margin-left: 4%;
		background-image: url("@/static/images/logo.png");
		background-size: 100% 100%;
	}

	.kf {
		width: 20px;
		height: 25px;
		margin-left: 13%;
		margin-top: 5px;
		background-image: url("@/static/images/kf.png");
		background-size: 100% 100%;
	}

	.wfjs {
		width: 150px;
		height: 25px;
		color: #fff;
		line-height: 25px;
		margin-left: 1%;
		margin-top: 5px;
		text-align: center;
		font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
		background-image: url("@/static/images/wfjs.png");
		background-size: 100% 100%;
	}

	.section {
		width: 94%;
		margin: 0px auto;
	}

	.section1 {
		margin: 0px auto 15rpx;
		display: flex;
	}

	.remain-number {
		position: absolute;
		margin-top: 130rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.head-banner1,
	.head-banner2 {
		width: 48%;
		float: left;
		height: 185rpx;
		background-size: 100% 100% !important;
	}

	.rank {
		margin-left: 4%;
	}

	.new-person {}

	.new-title {
		height: 80rpx;
		background: url('@/static/images/must-bonus-bg.png') no-repeat;
		background-size: 100% 100%;
		font-size: 30px;
		color: #fff;
		font-family: YouSheBiaoTiHei-Bold;
		margin-top: 10px;
		padding-left: 10px;
	}

	.new-content {
		height: 316rpx;
		display: flex;
		background: url('@/static/images/bg_xrxd1.png') no-repeat;
		background-size: 100% 100%;
		margin-bottom: 15rpx;
		border-radius: 0 0 20rpx 20rpx;
	}

	.new-content1 {
		border-radius: 20rpx;
		background: url('@/static/images/xrxd_bg2.png') no-repeat;
		background-size: 100% 100%;
	}

	.new-left {
		margin-top: 20px;
		width: 60%;
		padding-left: 4%;
	}

	.new-left1 {
		width: 38%;
		height: 85%;
		// margin-top: 10px;
		// background-color: #FFFFFF;
		// border-radius: 5px;
		margin-left: 18rpx;

		.xd1 {
			left: 3%;
			height: 46rpx;
			right: initial;
		}

		.good {
			width: 300rpx;
			height: 300rpx;
		}
	}

	.new-right1 {
		margin-left: 47rpx;
		margin-top: 63rpx;

		.buy-tip {
			font-size: 30rpx;
			background: none;
			-webkit-text-fill-color: #000;
			// background: linear-gradient(180deg, #8F4B30 0%, #51210D 20%);
		}

		.buy-number1 {

			color: #999999;
		}
	}

	.new-icon {
		width: 35px;
		height: 20px;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.buy-tip {
		font-size: 36rpx;
		// font-family: YouSheBiaoTiHei;
		background: linear-gradient(180deg, #8F4B30 0%, #51210D 20%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 700;
	}

	.buy-number1 {
		font-size: 22rpx;
		margin-top: 15rpx;
		color: #FF6E63;
	}

	.new-view image {
		width: 30%;
		height: 45px;
		margin-top: -5px;
		margin-left: 17%;
		position: absolute;
	}

	.new-view {
		height: 35px;
		width: 80%;
		display: flex;
		margin-top: 30rpx;
		background-image: url("@/static/images/new1.png");
		background-size: 100% 100%;
	}

	.price-list {
		display: grid;
		margin-left: 20px;
	}

	.new-right {
		width: 300rpx;
		height: 300rpx;
		// margin-top: 10px;
		margin-right: 26rpx;
		// background-color: #FFFFFF;
		border-radius: 5px;
	}

	.new-right .good {
		width: 300rpx;
		// margin: 0 7.5% 0rpx;
		height: 300rpx;
	}

	.xd1 {
		width: 100px;
		height: 36px;
		position: absolute;
		// margin-right: -16rpx;
		right: 22rpx;
		z-index: 22;
	}

	.new-price {
		color: #E14120;
		font-weight: bold;
		margin-top: 10rpx;
	}

	.original-price {
		color: #C2C2C2;
		margin-top: -8rpx;
		font-size: 12px;
		text-decoration: line-through;
	}

	.hot {
		margin-top: 3sss0rpx;
		margin-bottom: 10rpx;
		display: flex;
	}

	.hot-text {
		font-size: 30px;
		font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
	}

	.hot-image {
		width: 40px;
		height: 30px;
		margin-left: 5px;
	}

	.hot-good {
		height: 300rpx;
		margin-bottom: 15rpx;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;

		.hot-good-left {
			margin-left: 30rpx;

			.hot-good-left-title {
				font-size: 30rpx;
				line-height: 43rpx;
				color: #3D3D3D;
				font-weight: 700;
				margin-top: 36rpx;
			}

			.price {

				color: #E14120;
				font-size: 12px;
				line-height: 46rpx;

				text {
					&:nth-child(1) {
						font-size: 16px;
						font-weight: 700;
					}

					&:nth-child(2) {
						font-size: 12px;
						color: #999999;
						text-decoration: line-through;
						margin-left: 13rpx;
					}
				}
			}

			.commercialValue {
				line-height: 35rpx;
				font-size: 12px;

				text {
					&:nth-child(1) {
						display: inline-block;
						width: 104rpx;
						height: 35rpx;
						text-align: center;
						color: #fff;
						background: linear-gradient(270deg, #C095F7 0%, #99BFFF 100%);
					}

					&:nth-child(2) {
						display: inline-block;
						min-width: 153rpx;
						height: 35rpx;
						color: #9D89F3;
						padding: 0 10rpx;
						background: #EFF1FF;
					}
				}
			}

			.hot-good-buy {
				margin-top: 19rpx;
				margin-bottom: 10rpx;
				color: #C2C2C2;
				font-size: 12px;
				line-height: 29rpx;
			}

			.imgs {
				display: flex;

				image {
					flex: 0 0 54rpx;
					width: 54rpx;
					height: 54rpx;
					margin-right: 25rpx;
				}
			}
		}

		.hot-good-right {
			width: 250rpx;
			height: 250rpx;
			flex: 0 0 250rpx;
			position: relative;
			margin: 23rpx 21rpx 0 0;

			.hot-img {
				width: 219rpx;
				height: 44rpx;
				position: absolute;
				top: 0;
				right: 0;
				z-index: 9;
			}

			.hot-product {
				width: 250rpx;
				height: 250rpx;
				background-image: url("@/static/images/hot-good-bg.png");
				background-size: 100% 100%;
			}
		}
	}

	.hot-top {
		width: 170px;
		height: 30px;
		padding-left: 10%;
		color: #fff;
		line-height: 30px;
		border-radius: 5px;
		background-image: url("@/static/images/hot-bg1.png");
		background-size: 100% 100%;
	}

	.hot-left {
		width: 56%;
		padding-left: 2%;
	}

	.must-blind {
		margin-top: 20px;
		font-size: 18px;
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
		font-weight: bold;
	}

	.hot-des {
		margin-top: 10px;
		color: #FF6E64;
	}

	.hot-view {
		display: flex;
	}

	.hot-goods view {
		color: #999999;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}

	.hot-goods view text:nth-child(2) {
		margin-left: 40rpx;
	}

	.hot-goods {
		height: 60px;
		margin-top: 15px;
	}

	.hot-goods image {
		width: 30px;
		height: 30px;
		margin: 0px 5px 10px;
	}

	.hot-right {
		width: 42%;
		margin-left: 1%;
		// background: #F9F9F9;
		margin-top: -10px;
	}


	.limit-title {
		padding-left: 10px;
	}

	.limit-title {
		padding-top: 2px;
		font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
		font-size: 20px;
	}

	.week-limit {
		width: 98%;
		margin-left: 1%;
		margin-top: 15rpx;
		// height: 210px;
		// background-image: url("@/static/images/week-limit.png");
		// background-size: 100% 100%;
		margin-bottom: 15rpx;
	}

	.week-left {
		width: 40%;
	}

	.week-left image {
		width: 100%;
		height: 125px;
		margin-top: 20px;
		margin-left: 10px;
		// background-color: #fff;
	}

	.week-tip {
		display: flex;
		height: 92rpx;
		line-height: 72rpx;
		background-image: url("@/static/images/week-limit-title.png");
		background-size: 100% 100%;
		margin-bottom: -24rpx;
	}

	.week-tip image {
		height: 10px;
		width: 20px;
		margin: 12px 5px;
	}

	.week-right {
		width: 60%;
		padding-left: 10%;
	}

	.limit-over {
		color: #33197F;
	}

	.limit-time {
		background-color: #fff;
		padding: 0 3px;
		color: #FF2F4B;
	}

	.week-view {
		display: flex;
		margin-bottom: 15rpx;
		height: 300rpx;
		background-image: url("@/static/images/week-limit-conten.png");
		background-size: 100% 100%;
		border-radius: 20rpx;
	}

	.right-time {
		// margin-top: 9px;
		position: absolute;
		right: 6%;
	}

	.week-limits {
		width: 36%;
		height: 45px;
		position: absolute;
		margin-top: -12px;
		right: 4%;
		color: #fff;
		background-image: url("@/static/images/week_limit_title.png");
		background-size: 100% 100%;
	}

	.total-time,
	.times {
		position: absolute;
		margin-top: 20px;
	}

	.total-time {
		font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
		margin-left: 20px;
	}

	.times {
		right: 6%;
	}

	.week-xd {
		margin-top: 42px;
		height: 35px;
		line-height: 40px;

	}

	.week-xd image {
		width: 45px;
		height: 22px;
	}

	.week-xd text {
		position: absolute;
		margin-top: -5px;
		margin-left: 5px;
		color: #33197F;
		font-size: 18px;
		font-weight: 700;
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
	}

	.week-give {
		color: #FF6E64;
	}

	.week-buy {
		width: 90%;
		height: 35px;
		background-image: url("@/static/images/new2.png");
		background-size: 100% 100%;
		margin-top: 10px;
		display: flex;
	}


	.week-num view {
		margin-top: 2px;
		font-weight: 700;
	}

	.week-num {
		display: grid;
	}

	.ml20 {
		margin-left: 20px;
	}

	.week-price {
		color: #33197F;
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
	}

	.week-price1 {
		font-weight: 700;
	}

	.week-buy image {
		width: 25%;
		height: 42px;
		margin-top: -4px;
		position: absolute;
		right: 5%;
	}

	.buy-number {
		margin-top: -5px;
		font-size: 10px;
		margin-left: 2px;
		color: #999999;
	}

	.has-selected {
		margin-top: -6px;
		float: right;
		width: 120px;
		height: 35px;
		line-height: 35px;
		color: #fff;
		text-align: right;
		padding-right: 10px;
		background-image: url("@/static/images/yichou.png");
		background-size: 100% 100%;
	}

	.foot {
		margin-bottom: 80rpx;
	}
</style>