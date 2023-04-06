<template>
	<view class="diy-goods-bg">

		<!-- 商品组 -->
		<view class="diy-goods">
			<view class="week-view">
				<view class="bonus-bg" @click="showBonus" v-if="isBonus">
					<image :src="bonusImage"></image>王先生，获取华为pro手机一部
				</view>

				<view class="right-float">
					<view class="re-join" @click="recard">重抽卡</view>
					<view class="open-box" @click="showBox">公平开盒</view>
				</view>

				<view class="week-content">

					<view class="diy-banner">
						<swiper class="swiper-box" :autoplay="true" :duration="800" :circular="true"
							:interval="3 * 1000">
							<swiper-item v-for="(b, index) in banner" :key="index">
								<view>
									<image class="slide-image" :src="b.product.thumb" @click="onTargetGoods(b.id)" />
								</view>
								<image class="slide-grade" :src="'../../static/images/grade'+b.type_id+'.png'"></image>
								<view class="week-good-price">¥{{b.product.price}}</view>
								<view class="good-name">{{b.name}}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>

			<view class="must-bonus">
				<view class="must-bonus-bg">
					<view class="bg1">
						<text>抽到不满意可兑换</text>
					</view>
					<view class="bg2">
						<text>{{category.tip}}</text>
						<!-- <text class="look-all" @click="lookAll">查看全部</text> -->
					</view>
				</view>

				<view class="must-content">
					<view class="image-list">
						<view v-for="t in type" class="list">
							<image :src="t.src" class="img"></image>
							<text>{{t.percent}}</text>
						</view>
					</view>

					<view>
						<!-- <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">

						<swiper class="swiper-box1">
							<swiper-item v-for="g in goods" class="good-list">
								<view class="lists1" @click="goodDetail(g.id)">
									<image class="good-image" :src="g.product.thumb"></image>
									<text class="must-price1">￥{{g.product.price}}</text>
								</view>
							</swiper-item>
						</swiper>
					</scroll-view> -->

					</view>
				</view>
				<view class="swiper-box1">
					<view v-for="g in goods" class="good-list">
						<view class="lists1" @click="goodDetail(g.id)">

							<image class="grade-icon"
								:src="g.type_id==4?'http://d2fe1554.heziyoupin.com/static/api/images/xishi.png':g.type_id==3?'http://d2fe1554.heziyoupin.com/static/api/images/zhenqi.png':g.type_id==2?'http://d2fe1554.heziyoupin.com/static/api/images/zhuoyue.png':'http://d2fe1554.heziyoupin.com/static/api/images/putong.png'"
								@click="onTargetGoods(b.id)" />
							<image class="good-image" :src="g.product.thumb"></image>
							<view class="good-title">
								{{g.product.name}}
							</view>
							<view class="good-price">
								￥{{g.product.price}}
							</view>
						</view>
					</view>
				</view>

				<view class="buy-area-bg">
					<!-- <view class="buy-area" @click="openNow()">
						<view class="times">
							<text>限购3次</text>
						</view>
						<view class="start-number">
							<text class="number">(2抽起购)</text>
							<text class="prices">￥199</text>
						</view>
						<view class="gives">
							<text>送一抽</text>
						</view>
					</view> -->
					<view class="buy-lianchou" v-if="category.is_new==0">
						<view class="lianchou-list" @click="payTen">
							<view>超值连抽</view>
							<view>最多可省{{tenPrice}}元</view>
						</view>
						<view class="lianchou-list" @click="payOne">
							<view>一发入魂</view>
							<view>￥{{onePrice}}</view>
						</view>
					</view>
					<view class="buy-shouchou" v-if="category.is_new==1" @click="payThree">
						<view class="kh">
							立即开盒/<text>首抽￥0.01</text>
						</view>
						<view class="lx-bg">3抽起购</view>
					</view>
				</view>

				<view style="height: 150rpx;"></view>
			</view>
			<!-- <view class="more-goods" v-show="showMore">
				<view class="goods-area">
					<view class="head">开盒必出以下宝贝之一</view>
					<image class="head-close" src="../../static/images/close.png" @click="closeMore"></image>

					<view class="more-tip">抽到不满意可兑换</view>
					<view class="image-list more-image-list">
						<block v-for="t in type">
							<image :src="t.src"></image><text>{{t.percent}}</text>
						</block>
					</view>

					<view class="more-good-list">
						<scroll-view scroll-y="true" class="scroll-Y">
							<view class="good-list" v-for="g in goods" @click="goodDetail(g.id)">
								<image class="good-type" :src="type[g.type_id].src"></image>
								<view class="good-thumb-view">
									<image mode="aspectFit" class="more-thumb" :src="g.product.thumb"></image>
								</view>
								<text class="more-good-name">{{g.name}}--------</text>
								<view class="more-good-price">￥{{g.product.price}}</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view> -->

			<view class="pay-window" v-if="showPay">
				<view class="pay-view">
					<view class="pay-head">确认订单</view>
					<image class="head-close1" src="../../static/images/close.png" @click="closePay"></image>

					<view class="pay-good">
						<view class="good-image">
							<image :src="category.thumb"></image>
						</view>
						<view class="good-info">
							<view class="cate-name">{{category.name}}</view>
							<view class="cate-price">
								<text>￥{{category.blind_price}}</text>
								<text class="buy-number">x{{blind_number}}</text>
							</view>
						</view>
					</view>
					<view class="pay-coupon" v-if="coupon_number>0">
						<text>优惠</text>
						<text>-￥{{coupon_number}}</text>
					</view>

					<view class="pay-list">
						<view class="pay" v-for="p in pays">
							<image :src="p.icon"></image>
							<text>{{p.name}}</text>
							<label class="item-radio" @click="selectPay(p.alias)">
								<radio class="radio" color="rgb(47,35,41)" :checked="p.alias == currentPay"></radio>
							</label>
						</view>
					</view>

					<view class="blind-buy-tips">
						<view class="tip-view" v-for="b in blindTips">{{b}}</view>
					</view>

					<view class="pay-area">
						<view class="pay-bg" @click="payNow">
							<view class="pay-left">
								<text class="pay-ren">￥</text>
								<text class="pay-total">{{totalPrice}}</text>
							</view>
							<view class="pay-now">立即支付</view>
						</view>

						<view class="agreement">
							<label class="item-radio1" @click="agreement">
								<radio class="radio" color="rgb(47,35,41)" :checked="hasAgree"></radio>
							</label>
							<view>我已满18岁，已阅读并同意<text @click="goAgreement">《<text
										@click="agreements('user')">用户协议</text>》</text></view>
						</view>
					</view>
				</view>
			</view>

			<view class="windowPop" v-if="bonus">
				<image class="close-windowpop" src="../../static/images/close-get.png" @click="hideWindow()"></image>
				<view class="recard-view">
					<view class="recard-title"></view>
					<view class="recard-tip">如您对开盒奖品不满意,拥有此卡,可获得重抽机会,一次可使用多张。(部分限定盒子不可用哦~) </view>
					<view class="recard-tip">在重抽后,您可自行决定是否保留原有奖品或选择重抽奖品。重抽卡在每日必领活动中可获得哦~购盒时可直接使用! </view>
					<view class="recard-button" @click="goDaily">去获得</view>
				</view>
			</view>

			<view class="rafflePop-bg" @click="showRaffle=false" v-if="showRaffle">
				<view class="rafflePop" @click.stop>
					<view class="rafflePop-list" @click.stop="rafflePopClick(c)"
						v-for="(c,i) in JSON.parse(category.continuous_activity)" :key="i">
						<view class="rafflePop-list-yh" v-if="i>0">
							省{{(category.blind_price*c.number[0])-c.value[0]}}元
						</view>
						<view class="rafflePop-list-price">
							￥<text>{{c.value[0]}}</text><text>{{category.blind_price*c.number[0]}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fairPop-bg" v-if="showFairPop">
			<view class="fairPop-view">
				<view class="fairPop-view-head">确认订单
					<image class="fairPop-view-close" src="../../static/images/close.png" @click="closeBox"></image>
				</view>
				<view class="h20bgcf5f6f7"></view>
				<view class="fairPop-zz">
					<view class="fairPop-zz-title">
						我的种子
					</view>
					<input class="fairPop-zz-input" type="text" value="" placeholder="请填写您的种子" />
					<view class="fairPop-zz-title">
						时间种子
					</view>
					<view class="fairPop-zz-time">
						<!-- 2023-02-20 15:18:28 3709 -->
						{{Samplingtime}}
					</view>
					<view class="fairPop-zz-tip">
						注意：是开盒时间！不是购买盒子的时间！
					</view>
				</view>
				<view class="h20bgcf5f6f7"></view>
				<view class="fairPop-chgz">
					<text>抽盒规则：</text>
					每次开盒将通过哈希计算获得一个数值，该数值所对应的物品即为本次开盒所得物品。
					<text>公平算法：</text>
					平台结合用户自行提供的种子和时间种子，用哈希算法得到平台无法篡改的抽盒结果，保证抽盒过程绝对公平。
				</view>
				<view class="fairPop-see" @click="openBox">点击查看哈希算法详细说明</view>
				<view class="fairPop-know">
					知道了
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import * as BlindApi from '@/api/blind'
	import * as Order from '@/api/order'
	import * as Pay from '@/api/pay'
	import {
		checkLogin
	} from '../../core/app'

	export default {
		data() {
			return {
				showFairPop: false,
				showRaffle: false,
				isBonus: false,
				bonus: false,
				bonusImage: '',
				id: null,
				banner: [],
				category: {},
				goods: [],
				type: [],
				ensureGood: [],
				pays: [],
				currentPay: 'ali',
				blindTips: [],
				hasAgree: true,
				showMore: false,
				showPay: false,
				windowWidth: 750,
				indicatorDots: false, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				duration: 800, // 滑动动画时长
				imgHeights: [], // 图片的高度
				imgCurrent: 0, // 当前banner所在滑块指针
				totalPrice: 0,
				coupon_number: 0,
				blind_number: 1,
				Samplingtime: "",
				timer: null,
				onePrice: 0,
				tenPrice: 0,
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getData()
		},
		onHide() {
			this.showFairPop = false
			this.showPay = false
			this.bonus = false
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			agreements(type) {
				this.$navTo('pages/user/agreement?type=' + type)
			},
			rafflePopClick(obj) {
				this.showRaffle = false
				this.showPay = true
				this.totalPrice = obj.value[0] - this.coupon_number
				this.blind_number = obj.number[0]
			},
			payOne(obj) {
				if (!this.global.Sign) {
					this.$navTo('pages/login/mobileLogin')
					return
				}
				this.showPay = true
				this.blind_number = 1
				this.totalPrice = this.category.blind_price - this.coupon_number
			},
			payTen() {
				if (!this.global.Sign) {
					this.$navTo('pages/login/mobileLogin')
					return
				}
				this.showRaffle = true
			},
			payThree(obj) {
				// 三联抽
				this.showPay = true
				this.blind_number = this.category.limit_time
				this.totalPrice = this.category.blind_price * (this.blind_number - 1) + 0.01
			},
			getData() {
				const app = this
				BlindApi.detail({
						id: this.id
					})
					.then(result => {
						let num = result.data.goods.length

						app.category = result.data.category
						// 新人优惠
						app.coupon_number = app.category.is_new == 1 ? (app.category.blind_price - 0.01) : result.data
							.coupon_number
						app.goods = result.data.goods
						app.banner = result.data.banner
						app.type = Object.values(result.data.type).reverse()
						app.pays = result.data.pay
						app.blindTips = result.data.blind_tips
						app.ensureGood = result.data.goods[num - 1]
						// 普通
						if (app.category.is_new == 0) {
							// 一发价格  多抽省
							this.onePrice = this.category.blind_price - this.coupon_number
							let continuous_activity = JSON.parse(this.category.continuous_activity)
							let ten = continuous_activity.length
							this.tenPrice = (this.category.blind_price * continuous_activity[
								ten - 1].number[0]) - continuous_activity[
								ten - 1].value[0]
						}
						uni.setNavigationBarTitle({
							title: app.category.name
						});
					})
			},
			onTargetGoods(id) {
				this.$navTo('pages/weekLimit/detail?id=' + id)
			},
			hideWindow() {
				this.bonus = false
			},
			selectPay(type) {
				this.currentPay = type
			},
			goAgreement() {
				this.$navTo('')
			},
			payNow() {
				if (!this.hasAgree) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none'
					})
					return false
				}
				Order.createOrder({
						pay_type: "ali",
						type: 2, //订单类型 type 1商城商品购买 2盲盒购买  3快递费
						number: this.blind_number,
						total_money: this.totalPrice,
						box_id: this.id,
					})
					.then(result => {
						// this.$navTo('pages/blindBoxOrder/index', {
						// 	"order_no": result.data
						// })
						this.getPay(result.data)
					})
			},
			getPay(order_no) {
				let that = this
				Pay.getInfo({
						order_no: order_no,
					}, {
						type: 2, //订单类型 type 1商城商品购买 2盲盒购买  3快递费
					})
					.then(result => {
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: result.data,
							success: function(res) {
								that.getfindOrder(order_no)
								// that.$navTo('pages/unpacking/index?id=' + e)
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								that.$toast("支付失败")
								setTimeout(() => {
									that.$navTo('pages/blindBoxOrder/index', {
										"order_no": order_no
									})
								}, 1000)
								console.log('fail:' + JSON.stringify(err));
							}
						})
					})
			},
			getfindOrder(order_no) {
				let that = this
				Order.findOrder({
						order_no: order_no,
					})
					.then(result => {
						let detail = result[0]
						setTimeout(() => {
							that.$navTo('pages/unpacking/index?id=' + detail.order.blind_category_id+'&b_id='+detail.b_id)
						}, 1000)
					})
			},
			getCurrentTime() {
				const nowDate = new Date();
				const date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
					hours: nowDate.getHours(),
					minutes: nowDate.getMinutes(),
					seconds: nowDate.getSeconds(),
					milliseconds: nowDate.getMilliseconds(),
				};
				const newyear = (date.year > 10 ? "" : "0") + date.year;
				const newmonth = (date.month > 10 ? "" : "0") + date.month;
				const newday = (date.date > 10 ? "" : "0") + date.date;
				const newminutes = (date.minutes > 10 ? "" : "0") + date.minutes;
				const newseconds = (date.seconds > 10 ? "" : "0") + date.seconds;
				const newmilliseconds = (date.milliseconds > 10 ? "" : "0") + date.milliseconds;
				this.Samplingtime =
					date.year +
					"-" +
					newmonth +
					"-" +
					newday +
					" " +
					date.hours +
					":" +
					newminutes +
					":" +
					newseconds +
					" " +
					newmilliseconds;
			},
			agreement() {
				this.hasAgree = !this.hasAgree
			},
			closeMore() {
				this.showMore = false
			},
			closePay() {
				this.showPay = false
			},
			lookAll() {
				this.showMore = true
			},
			recard() {
				this.bonus = true
			},
			showBox() {
				this.showFairPop = true
				this.getCurrentTime();
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.getCurrentTime(); //每秒更新一次时间
				}, 50);
			},
			closeBox() {
				this.showFairPop = false
				clearInterval(this.timer);
			},
			openBox() {
				this.$navTo('pages/justiceBox/index')
			},
			goodDetail(id) {
				this.$navTo('pages/weekLimit/detail?id=' + id)
			},
			goDaily() {
				this.$navTo('pages/daily-get/index')
			},
			openNow() {
				this.showPay = true

			},
			/**
			 * 计算图片高度
			 */
			_imagesHeight({
				detail
			}) {
				const app = this;
				// 获取图片真实宽度
				const {
					width,
					height
				} = detail;
				// 宽高比
				const ratio = width / height;
				// 计算的高度值
				const viewHeight = 200;
				//const viewHeight = app.windowWidth / ratio;
				// 把每一张图片的高度记录到数组里
				app.imgHeights.push(viewHeight);
			},

			/**
			 * 记录当前指针
			 */
			_bindChange(e) {
				this.imgCurrent = e.detail.current;
			}

		}

	}
</script>


<style lang="scss" scoped>
	@font-face {
		src: url("../../static/font/SourceHanSansCN-Bold.otf");
	}

	.diy-goods-bg {
		background-color: #fff;
	}

	.diy-goods {
		height: 759rpx;
		background-image: url('@/static/images/week-limit-bg.png');
		background-size: 100% 100%;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;

		.bonus-bg {
			width: 90%;
			height: 35px;
			line-height: 35px;
			position: absolute;
			top: 20px;
			margin-left: 5%;
			padding-left: 30px;
			font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: bold;
			color: #fff;
			background-image: url('@/static/images/bonus-bg.png');
			background-size: 100% 100%;
		}

		.right-float {
			width: 25px;
			writing-mode: tb-rl;
			display: flex;
			position: fixed;
			right: 5px;
			font-size: 12px;
			margin-top: 45%;
			color: #FFFFFF;
			text-align: center;
			z-index: 66;
		}

		.re-join {
			height: 60px;
		}

		.re-join,
		.open-box {
			background-image: url('@/static/images/right-bg.png');
			background-size: 100% 100%;
			padding-right: 4px;
		}

		.open-box {
			height: 80px;
		}

		.week-good {
			width: 55%;
			height: 150px;
			margin: 25% 22.5% 0px;
		}

		.slide-grade {
			width: 265rpx;
			height: 63rpx;
			position: absolute;
			left: 0;
			right: 0;
			margin: -28px auto;
		}

		.week-good-price {
			width: 40%;
			height: 80rpx;
			line-height: 80rpx;
			margin: 20rpx auto 15px;
			background-image: url('@/static/images/week-price.png');
			background-size: 100% 100%;
			text-align: center;
			font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
			font-weight: 700;
		}

		.good-name {
			width: 75%;
			margin: 0 auto;
			text-align: center;
			font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
			font-weight: 700;
		}

		.must-bonus {}

		.must-bonus-bg {
			height: 60px;
			background-image: url('@/static/images/youpin.png');
			background-color: rgba(15, 65, 157, 0.1);
			background-size: 100% 100%;
			color: #fff;
		}

		.bg1 {
			height: 30px;
			background: url('@/static/images/open-box.png') no-repeat;
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
			background-image: url('@/static/images/guarantee.png');
			background-repeat: no-repeat;
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
			height: 80rpx;
			padding: 0 30rpx;
			background: rgba(15, 65, 157, 0.1);
			// margin-top: -30px;
			// background: url('/static/images/djckqb.png') no-repeat;
			// background-size: 100% 100%;
			// z-index: 555;
		}

		.look-all {
			float: right;
			position: absolute;
			color: #6C6CB9 !important;
			right: 6%;
		}

		.image-list {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			// margin-top: 40px;
			display: flex;

			// justify-content: center;
			// position: absolute;
			// border-radius: 5px;
			// text-align: center;
			.list {
				width: 25%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.image-list image:nth-child(1) {
			// margin-left: 5%;
		}

		.image-list .img {
			flex: 0 0 60rpx;
			width: 60rpx;
			height: 40rpx;
			// margin-top: 20rpx;
			// vertical-align: top;
		}

		.image-list text {
			// margin-right: 6%;
			padding-left: 5px;
			font-size: 12px;
			// line-height: 50rpx;
			// margin-top: 14rpx;
		}

		.must-price1 {
			width: 100%;
			height: 40px;
			line-height: 40px;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			color: #2C61CB;
			font-size: 16px;
			text-align: center;
			background: url('@/static/images/must-price1.png') no-repeat;
			background-size: 100% 100%;
		}


		.scroll-Y {
			height: 300rpx;
		}

		.scroll-view_H {
			white-space: nowrap;
			padding-top: 140rpx;
			overflow-x: scroll;
		}

		.lists {
			display: grid;
		}

		.scroll-view-item_H image {
			width: 80%;
			margin: 6% 10%;
			height: 90px;
		}

		.buy-area-bg {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			width: 100%;
			padding: 20rpx 0 10rpx;
		}

		.buy-area {
			width: 80%;
			// padding-bottom: 40rpx;
			height: 60px;
			background: url("@/static/images/ljkh.png") no-repeat;
			background-size: 100% 100%;
			margin: 0 auto;
		}

		.buy-shouchou {
			width: 577rpx;
			height: 93rpx;
			background-image: url("@/static/images/shouchou-bg.png");
			background-repeat: no-repeat;
			background-size: 100% 100%;
			margin: 0 auto;
			position: relative;

			.kh {
				font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
				font-size: 40rpx;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 93rpx;
				text-align: center;

				text {
					font-size: 30rpx;
				}
			}

			.lx-bg {
				width: 114rpx;
				height: 35rpx;
				background: linear-gradient(236deg, #AAACFF 0%, #A14FFF 100%);
				position: absolute;
				right: 0;
				top: 0;
				transform: skew(160deg);
				color: #FFFFFF;
				font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
				line-height: 35rpx;
				font-weight: 400;
				font-size: 24rpx;
				text-align: center;
			}
		}

		.buy-lianchou {
			display: flex;
			justify-content: center;

			.lianchou-list {
				width: 290rpx;
				height: 88rpx;
				background-image: url("@/static/images/lianchou-bg1.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;

				&:nth-child(2) {
					background-image: url("@/static/images/lianchou-bg2.png");
					margin-left: 15rpx;
				}

				view {
					font-weight: 700;
					color: #FFFFFF;
					line-height: 28rpx;
					font-size: 28rpx;
					text-align: center;
					margin: 14rpx 0;

					&:nth-child(2) {

						font-weight: 400;
						font-size: 24rpx;
					}
				}
			}
		}

		.times {
			width: 80px;
			position: absolute;
			height: 18px;
			margin-top: 20px;
			margin-left: 5px;
			background: url("@/static/images/limited-time.png") no-repeat;
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
			background: url("@/static/images/gives.png") no-repeat;
			background-size: 100% 100%;
		}

		.windowPop {
			width: 100%;
			height: 115vh;
			position: absolute;
			background: rgb(51, 51, 51);
			opacity: 0.9;
			top: 0;
			z-index: 88;

			.close-windowpop {
				position: absolute;
				width: 80rpx;
				height: 80rpx;
				margin-top: 8vh;
				right: 10%;
			}

			.recard-view {
				margin-top: 30%;
				width: 80%;
				height: 650rpx;
				margin-left: 10%;
				position: absolute;
				background: url("@/static/images/recard-bg.png") no-repeat;
				background-size: 100% 100%;
			}

			.recard-title {
				width: 100%;
				height: 160rpx;
				margin-top: 40rpx;
				background: url("@/static/images/recard-title.png") no-repeat;
				background-size: 100% 100%;
			}

			.recard-tip {
				width: 90%;
				margin: 20rpx auto;
				line-height: 50rpx;
				font-size: 30rpx;
				color: #fff;
			}

			.recard-view view:nth-child(2) {
				margin-top: 40rpx;
			}

			.recard-button {
				width: 60%;
				height: 200rpx;
				line-height: 200rpx;
				text-align: center;
				font-size: 34rpx;
				font-weight: 700;
				margin: 0rpx auto;
				background: url("@/static/images/recard-button.png") no-repeat;
				background-size: 100% 100%;
			}

		}

		.diy-banner {
			width: 94%;
			height: 759rpx;
			margin-left: 3%;
			position: relative;

			.swiper-box {
				height: 100%;
			}

			.slide-image {
				width: 350rpx;
				height: 350rpx;
				margin: 147rpx auto 0;
				display: block;
				animation: myfirst 2.5s infinite;
			}

			@keyframes myfirst {
				0% {
					transform: translate(0px, 0px);
				}

				50% {
					transform: translate(0px, -10px);
				}

				100% {
					transform: translate(0px, 0px);
				}
			}
		}

		.swiper-box1 {
			// height: 400rpx;
			overflow: hidden;
			background: rgba(15, 65, 157, 0.1);
			padding-bottom: 20rpx;


			.good-list {
				// width: 50% !important;
				width: 330rpx;
				min-height: 340rpx;
				background: #F9F9F9;
				border-radius: 20rpx;
				margin-top: 30rpx;
			}

			.lists1 {

				// width: 80%;
				// height: 260rpx !important;
				// display: grid;
				// border-radius: 30rpx;
				// background: #FFFFFF;
				font-size: 14px;
				position: relative;

				.good-image {
					width: 200rpx;
					height: 200rpx;
					margin: 34rpx 65rpx 20rpx;
				}

				.good-title {
					color: #3D3D3D;
					line-height: 28rpx;
					margin: 20rpx 30rpx 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.good-price {
					margin: 0 30rpx;
					color: #FF4427;
					font-weight: 400;
					line-height: 28rpx;
					padding-bottom: 20rpx;
				}

				.grade-icon {
					width: 58rpx;
					height: 40rpx;
					position: absolute;
					left: 19rpx;
					top: 11rpx;
				}
			}


		}

		.more-goods {
			width: 100%;
			height: 100%;
			background: #000000;
			opacity: 0.95;
			position: absolute;
			top: 0px;
			z-index: 68;
		}

		.goods-area {
			width: 100%;
			height: 80vh;
			background-color: #fff;
			margin-top: 20vh;
			border-radius: 20rpx;
			display: grid;
		}

		.head {
			width: 100%;
			height: 60rpx;
			text-align: center;
			margin-top: 40rpx;
			font-size: 34rpx;
		}

		.head-close {
			position: absolute;
			right: 10px;
			margin-top: 30rpx;
			width: 50rpx;
			height: 50rpx;
		}

		.more-tip {
			width: 100%;
			text-align: center;
			position: absolute;
			margin-top: 100rpx;
			color: rgb(197, 197, 197);
		}

		.more-image-list {
			margin-top: 160rpx;
		}

		.more-good-list {
			margin-top: 100rpx;
		}

		.scroll-Y {
			height: 60vh;
		}

		.good-list {
			width: 45%;
			min-height: 340rpx;
			float: left;
			margin-left: 3%;
			border-radius: 20rpx;
		}

		.good-type {
			width: 70rpx;
			height: 50rpx;
			position: absolute;
		}

		.good-thumb-view {
			width: 70%;
			margin: 20rpx auto;
			height: 200rpx !important;
		}

		.good-thumb-view {
			height: 200rpx;
		}

		.more-thumb {
			width: 100%;
			height: 200rpx !important;
		}

		.more-good-name {
			width: 50%;
			height: 60upx;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.more-good-price {
			height: 40rpx !important;
			color: #FF0000;
		}

		.pay-window {
			width: 100%;
			height: 100%;
			// background: #000000;
			opacity: 0.95;
			position: fixed;
			bottom: 0px;
			z-index: 68;
			background-color: rgba(0, 0, 0, 0.65);

			.pay-view {
				width: 100%;
				min-height: 566rpx;
				// margin-top: 5vh;
				border-radius: 20rpx 20rpx 0 0;
				position: absolute;
				bottom: 0px;
				background-color: #F5F6F7;
			}

			.pay-head {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				border-radius: 20rpx 20rpx 0 0;
				font-size: 34rpx;
				background-color: #FFFFFF;
			}

			.head-close1 {
				position: absolute;
				right: 10px;
				margin-top: -70rpx;
				width: 50rpx;
				height: 50rpx;
			}

			.pay-good {
				width: 100%;
				height: 200rpx;
				margin-top: 20rpx;
				background-color: #FFFFFF;
				display: flex;
			}

			.pay-coupon {
				display: flex;
				justify-content: space-between;
				background-color: #FFFFFF;
				font-size: 30rpx;
				color: #3D3D3D;
				line-height: 43rpx;
				font-weight: 500;
				padding: 20rpx 30rpx;

				text {
					&:nth-child(2) {

						color: #FF6E64;
					}
				}
			}

			.good-image {
				width: 220rpx;
				height: 160rpx;
				float: left;
			}

			.good-image image {
				width: 140rpx;
				height: 140rpx;
				margin: 50rpx 40rpx;
			}

			.cate-name {
				margin-top: 60rpx;
				font-size: 30rpx;
				font-weight: 700;
			}

			.cate-price {
				margin-top: 20rpx;
			}

			.buy-number {
				position: absolute;
				right: 4%;
			}

			.pay-list {
				width: 100%;
				background-color: #fff;
				padding: 10rpx 20rpx;
				margin-top: 20rpx;
			}

			.pay {
				height: 100rpx;
				line-height: 100rpx;
				color: #000000;
				display: flex;
			}

			.pay image {
				width: 60rpx;
				height: 60rpx;
				margin: 20rpx;
			}

			.item-radio {
				font-size: 28rpx;
				position: absolute;
				right: 40rpx;

				.radio {
					vertical-align: middle;
					transform: scale(0.76)
				}

				.text {
					vertical-align: middle;
				}
			}

			.blind-buy-tips {
				background-color: #fff;
				margin-top: 20rpx;
				padding: 20rpx 40rpx;
			}

			.tip-view {
				color: #666666;
				line-height: 40rpx;
				font-size: 24rpx;
			}

			.pay-bg {
				width: 70%;
				height: 80rpx;
				margin-left: 15%;
				margin-top: 50rpx;
				line-height: 80rpx;
				background: url('@/static/images/pay-bg.png') no-repeat;
				background-size: 100% 100%;
				display: flex;
			}

			.pay-left {
				width: 50%;
				text-align: center;
			}

			.pay-ren,
			.pay-total {
				color: #FF0000;
			}

			.pay-total {
				font-size: 40rpx;
				font-weight: 700;
			}

			.pay-now {
				width: 50%;
				color: #fff;
				font-size: 32rpx;
				font-weight: 700;
				text-align: center;
			}

			.agreement {
				width: 70%;
				margin: 20rpx auto;
				font-size: 24rpx;
				display: flex;
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

		}

	}

	.rafflePop-bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.65);
		z-index: 99;

		.rafflePop {
			width: 100%;
			height: 949rpx;
			background: url('@/static/images/lianzhou-bg.png') no-repeat;
			background-size: 100% 100%;
			position: absolute;
			bottom: 0;
			padding-top: 276rpx;

			.rafflePop-list {
				width: 664rpx;
				height: 133rpx;
				margin: 0 auto;
				background-image: url('@/static/images/lianzhou-bg1.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				margin-bottom: 29rpx;
				position: relative;

				&:nth-child(2) {
					background-image: url('@/static/images/lianzhou-bg2.png');
				}

				&:nth-child(3) {
					background-image: url('@/static/images/lianzhou-bg3.png');
				}

				&:nth-child(4) {
					background-image: url('@/static/images/lianzhou-bg4.png');
				}

				.rafflePop-list-yh {
					position: absolute;
					right: 0;
					top: 0;
					width: 111rpx;
					height: 33rpx;
					line-height: 33rpx;
					font-size: 22rpx;
					color: #fff;
					text-align: center;
					background: #FF4A4A;
				}

				.rafflePop-list-price {
					position: absolute;
					left: 372rpx;
					top: 40rpx;

					text {
						color: #3D3D3D;
						font-size: 26rpx;

						&:nth-child(1) {
							font-size: 36rpx;
						}

						&:nth-child(2) {
							color: #7E7E7E;
							margin-left: 5rpx;
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}

	.fairPop-bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.65);
		z-index: 99;

		.fairPop-view {
			width: 100%;
			background-color: #fff;
			position: absolute;
			left: 0;
			bottom: 0;
			border-radius: 15rpx 15rpx 0 0;
			min-height: 415rpx;

			.fairPop-view-head {
				height: 82rpx;
				line-height: 82rpx;
				text-align: center;
				color: #3D3D3D;
				font-weight: 500;
				font-size: 30rpx;
				position: relative;

				.fairPop-view-close {
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 20rpx;
					top: 15rpx;
				}
			}

			.fairPop-zz {
				padding: 0 60rpx 40rpx;
				color: #3D3D3D;

				.fairPop-zz-title {
					font-size: 30rpx;
					font-weight: 500;
					line-height: 30rpx;
					margin: 40rpx 0 30rpx;
				}

				.fairPop-zz-input {
					width: 100%;
					height: 76rpx;
					line-height: 76rpx;
					text-indent: 30rpx;
					background: #F9F9F9;
				}

				.fairPop-zz-time {
					width: 100%;
					height: 76rpx;
					text-indent: 30rpx;
					line-height: 76rpx;
					font-size: 30rpx;
					font-weight: 400;
					line-height: 30px;
					border: 1px solid #EEEEEE;
				}

				.fairPop-zz-tip {
					font-size: 24rpx;
					font-weight: 400;
					color: #F0A76B;
					line-height: 30rpx;
					margin-top: 20rpx;
				}
			}

			.fairPop-chgz {
				padding: 40rpx 30rpx 30rpx;
				line-height: 1.5;
				color: #1F182A;
				font-size: 24rpx;

				text {
					display: block;
					color: #1F182A;
					font-weight: 700;

					&:nth-child(2) {
						margin-top: 40rpx;
					}
				}
			}

			.fairPop-see {
				text-decoration: underline;
				font-size: 22rpx;
				font-weight: 400;
				color: #409EFF;
				padding: 0 30rpx;
			}

			.fairPop-know {
				width: 580rpx;
				height: 88rpx;
				line-height: 88rpx;
				background-image: url('@/static/images/unpacking-btn.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				font-weight: 500;
				color: #FFFFFF;
				font-size: 36rpx;
				text-align: center;
				margin: 40rpx auto;
			}
		}
	}

	.h20bgcf5f6f7 {
		height: 20rpx;
		background-color: #f5f6f7;
	}
</style>