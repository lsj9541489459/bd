<template>
	<view class="section">
		<view class="section1">
			<view class="head-banner1" :style="{'background': 'url('+left+') no-repeat','background-size': '100% 100%'}"
				@click="daily">
				<view class="remain-number">还差{{sum}}元领取奖励</view>
			</view>
			<view class="head-banner2 rank"
				:style="{'background': 'url('+right+') no-repeat','background-size': '100% 100%'}" @click="rank">
			</view>
		</view>

		<view class="new-person">
			<!--<view class="new-title">新人限定</view>
			<view class="new-content">
				<view class="new-left">
					<view>
						<image :src="'/../../../static/images/xr.png'" class="new-icon"></image>
						<text class="buy-tip">{{limitOne.tip}}</text>
					</view>
					<view class="buy-number1">
						<text>买1抽得2抽，新人限定福利</text>
					</view>
					<view class="new-view">
						<view class="price-list">
							<text class="new-price">￥0.01</text>
							<text class="original-price">￥{{limitOne.datum.blind_price}}</text>
						</view>
						<image :src="'/../../../static/images/msm_red.png'"></image>
					</view>

				</view>
				<view class="new-right">
					<image :src="'/../../../static/images/xd1.png'" class="xd1"></image>
					<image :src="limitOne.datum.banner" class="good"></image>
				</view>
			</view>

			<view class="new-title">新人限定</view>
			<view class="new-content">
				<view class="new-left">
					<view>
						<image :src="'/../../../static/images/xr.png'" class="new-icon"></image>
						<text class="buy-tip">新人买1送1盲盒</text>
					</view>
					<view class="buy-number1">
						<text>买1抽得2抽，新人限定福利</text>
					</view>
					<view class="new-view">
						<view class="price-list">
							<text class="new-price">￥99</text>
							<text class="original-price">￥99</text>
						</view>
						<image :src="'/../../../static/images/msm_red.png'"></image>
					</view>

				</view>
				<view class="new-right">
					<image :src="'/../../../static/images/xd1.png'" class="xd1"></image>
					<image :src="'/../../../static/images/good1.png'" class="good"></image>
				</view>
			</view>-->


			<view class="hot">
				<text class="hot-text">热卖盲盒</text>
				<image class="hot-image" :src="'/../../../static/images/hot.png'"></image>
			</view>

			<!--<view class="hot-good" v-for="d in hot">
				<view class="hot-top">{{d.name}}</view>
				<view class="hot-view">
					<view class="hot-left">
						<view class="must-blind">必抽保底盲盒</view>
						<view class="hot-des">{{d.tip}}</view>
						<view class="hot-goods">
							<image :src="b.banne" v-for="b in d.datum"></image>
						</view>
					</view>
					<view class="hot-right">
						<view class="has-selected">已抽 2/10</view>
						<image :src="'{{b.thumb}}'" class="hot-product"></image>
					</view>
				</view>
			</view>-->


			<view class="week-limit">
				<view class="week-tip">
					<text class="limit-title">周{{week}}限定</text>
					<image :src="'/../../../static/images/arrow-right.png'"></image>
					<view class="right-time">
						<text class="limit-over">距结束：</text>
						<text class="limit-time">20</text>
						：
						<text class="limit-time">18</text>
						：
						<text class="limit-time">20</text>
					</view>
				</view>
				<view class="week-view">
					<view class="week-left">
						<image :src="'/../../../static/images/good1.png'"></image>
					</view>
					<view class="week-right">
						<view class="week-limits">
							<text class="total-time">限购3次</text>
							<text class="times">(0/3)</text>
						</view>

						<view class="week-xd">
							<image :src="'/../../../static/images/xd.png'"></image>
							<text>买2送1盲盒</text>
						</view>

						<view class="week-give">买2抽送1抽，到手3抽</view>
						<view class="week-buy">
							<view class="week-num">
								<view>
									<text class="week-price ml20">￥</text>
									<text class="week-price week-price1">99</text>
								</view>
								<text class="buy-number">32W+已购买</text>
							</view>
							<image :src="'/../../../static/images/msm_zs.png'" @click="onWeekLimit(1)"></image>
						</view>
					</view>
				</view>

                <view class="week-view">
                    <view class="week-left">
                        <image :src="'/../../../static/images/good1.png'"></image>
                    </view>
                    <view class="week-right">
                        <view class="week-limits">
                            <text class="total-time">限购3次</text>
                            <text class="times">(0/3)</text>
                        </view>

                        <view class="week-xd">
                            <image :src="'/../../../static/images/xd.png'"></image>
                            <text>买2送1盲盒</text>
                        </view>

                        <view class="week-give">买2抽送1抽，到手3抽</view>
                        <view class="week-buy">
                            <view class="week-num">
                                <view>
                                    <text class="week-price ml20">￥</text>
                                    <text class="week-price week-price1">99</text>
                                </view>
                                <text class="buy-number">32W+已购买</text>
                            </view>
                            <image :src="'/../../../static/images/msm_zs.png'" @click="onWeekLimit(1)"></image>
                        </view>
                    </view>
                </view>
			</view>
		</view>
	</view>
</template>

<script>
	import Images from "../image/index";

	export default {
		components: {
			Images
		},
		/**
		 * 组件的属性列表
		 * 用于组件自定义设置
		 */
		props: {
			page: {

            },
		},
		data() {
			let d = this.page;

			return {
				sum: d.headBanner['remain_sum'],
				left: d.headBanner['left'],
				right: d.headBanner['right'],
				limitOne: d.limit[0],
				limitThree: d.limit[1],
				hot: d.hot,
				week: d.week,
				weekLimits: d.weekLimit
			}

		},
		onLoad() {

		},
		/**
		 * 组件的方法列表
		 * 更新属性和数据的方法与更新页面数据的方法类似
		 */
		methods: {
			daily() {
				this.$navTo('pages/daily-get/index')
			},
			rank() {
				this.$navTo('pages/rank/index')
			},
			onWeekLimit(id) {
				console.log(555)
				this.$navTo('pages/weekLimit/index?id=' + id)
			},
			err(e) {}
		}

	}
</script>

<style lang="scss" scoped>
	@font-face {
		font-family: YouSheBiaoTiHei-Bold;
		src: url("@/static/font/YouSheBiao.TTF");
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
	}

	.section {
		width: 94%;
		margin: 0px auto;
	}

	.section1 {
		margin: 20px auto;
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
		height: 110px;
		background-size: 100% 100%;
	}

	.rank {
		margin-left: 4%;
	}

	.new-person {
		height: 215px;
		background-image: url("@/static/images/xrxd_bg.png");
		background-size: 100% 100%;
	}

	.new-title {
		font-size: 30px;
		color: #fff;
		font-family: YouSheBiaoTiHei-Bold;
		margin: 10px 0px 0px 10px;
	}

	.new-content {
		margin-top: 20px;
		display: flex;
	}

	.new-left {
		margin-top: 20px;
		width: 60%;
		padding-left: 4%;
	}

	.new-icon {
		width: 35px;
		height: 20px;
	}

	.buy-tip {
		font-size: 42rpx;
		font-family: YouSheBiaoTiHei;
		background: linear-gradient(180deg, #8F4B30 0%, #51210D 20%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 700;
	}

	.buy-number1 {
		margin-top: 10px;
		color: #FF6E63;
	}

	.new-view image {
		width: 30%;
		height: 45px;
		margin-top: -5px;
		margin-left: 15%;
		position: absolute;
	}

	.new-view {
		height: 35px;
		width: 80%;
		display: flex;
		margin-top: 15px;
		background-image: url("@/static/images/new1.png");
		background-size: 100% 100%;
	}

	.price-list {
		display: grid;
		margin-left: 20px;
	}

	.new-right {
		width: 39%;
		margin-top: 10px;
		background-color: #FFFFFF;
		border-radius: 5px;
	}

	.new-right .good {
		width: 94%;
		margin: 2%;
		height: 180px;
	}

	.xd1 {
		width: 128px;
		height: 45px;
		position: absolute;
		margin-top: -70rpx;
		right: 3.5%;
	}

	.new-price {
		color: #E14120;
		font-weight: bold;
		margin-top: 10 rpx;
	}

	.original-price {
		color: #C2C2C2;
		margin-top: -8rpx;
		font-size: 12px;
		text-decoration: line-through;
	}

	.hot {
		margin-top: 30px;
		margin-bottom: 10px;
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
		height: 200px;
		margin-bottom: 20px;
		background-color: #fff;
	}

	.hot-top {
		width: 140px;
		height: 30px;
		padding-left: 10%;
		color: #fff;
		line-height: 30px;
		border-radius: 5px;
		background-image: url("../../../static/images/hot-bg1.png");
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
		background: #F9F9F9;
		margin-top: -10px;
	}

	.hot-product {
		width: 100%;
		height: 100%;
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
		margin-bottom: 65px;
		height: 210px;
		background-image: url("../../../static/images/week-limit.png");
		background-size: 100% 100%;
	}

	.week-left {
		width: 40%;
	}

	.week-left image {
		width: 100%;
		height: 125px;
		margin-top: 20px;
		margin-left: 10px;
		background-color: #fff;
	}

	.week-tip {
		display: flex;
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
	}

	.right-time {
		margin-top: 9px;
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
		background-image: url("../../../static/images/week_limit_title.png");
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
		font-size: 22px;
		font-weight: 700;
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
	}

	.week-give {
		color: #FF6E64;
	}

	.week-buy {
		width: 90%;
		height: 35px;
		background-image: url("../../../static/images/new2.png");
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
		background-image: url("../../../static/images/yichou.png");
		background-size: 100% 100%;
	}
</style>
