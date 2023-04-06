<template>
	<view class="container">
		<view class="tab">
			<view :class="t.active" @click="changeTab(t.tab)" v-for="t in tabNav">{{t.name}}</view>
		</view>

		<view class="good" v-if="tabIndex == 0">
			<view class="good-tab">
				<view :class="g.active" @click="changeGoodTab(g.tab)" v-for="g in goodTab">{{g.name}}</view>
			</view>

			<view class="goods">
				<scroll-view scroll-y="true">
					<view class="good-list" v-for="g,k in goodData">
						<view class="good-info">
							<image :src="g.thumb"></image>
							<view class="goods-info">
								<view>{{g.name}}</view>
								<block v-if="g.good_type == 0">
									<view>可兑换<text>{{g.exchange_coin}}</text> 优米豆</view>
								</block>
								<block v-if="g.good_type == 1">
									<view class="bottom-info">兑换时间: {{g.update_time}}</view>
								</block>
								<block v-if="g.good_type == 2">
									<view class="bottom-info">
										<view class="sku">规格：默认规格</view>提货时间: {{g.update_time}}
									</view>
								</block>
								<block v-if="g.good_type > 3">
									<view>可兑换<text>{{g.exchange_coin}}</text> 优米豆<text class="giving">赠送中</text></view>
								</block>
							</view>
						</view>
						<view class="button-list">
							<block v-if="g.good_type < 1">
								<view @click="givePerson(k)">赠送</view>
								<view @click="exchangeCoin(k)">兑换</view>
								<view @click="getGood(k)">提货</view>
							</block>
							<view @click="cancelGive(k)" v-if="g.good_type == 4" class="cancel">取消赠送</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="box" v-if="tabIndex == 1">
			<scroll-view scroll-y="true">
				<view class="box-list" v-for="b in box">
					<view class="box-head">
						<!-- <image class="box-image" :src="b.thumb"></image> -->
						<image class="box-image" :src="b.category.thumb"></image>
						<view class="box-info">
							<view>{{b.category.name}}</view>
							<view>数量：{{b.number}}</view>
							<view class="box-button">
								<view class="look-box" @click="goBox(b.blind_category_id)">查看盒子</view>
								<view class="open-box" @click="openBox(b.blind_category_id,b.id)">开启</view>
							</view>
						</view>
					</view>
					<view class="opportunity">有机会开出以下物品</view>
					<view class="blind-box">
						<image  v-for="bi in b.images" mode="aspectFit" :src="bi"></image>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="window" v-if="showWindow">
			<view class="give-area" v-if="showGive">
				<view class="give-title">
					<text>我要赠送</text>
					<image src="../../static/images/close.png" @click="hideWindow"></image>
				</view>
				<view class="give-good-info">
					<image :src="goodData[storeIndex].thumb"></image>
					<text>{{goodData[storeIndex].name}}</text>
				</view>

				<view class="give-tip">
					<view>赠送说明</view>
					<view>1、已完成赠送的商品，好友24小时内未领取，商品将自动原路返回;</view>
					<view>2、在领取之前,赠送人可以取消赠送。</view>
					<view>3、请妥善使用赠送功能,本平台不负责解决因赠送产生的纠纷。</view>
				</view>

				<view class="give-submit">
					<view @click="agreeProtocal">
						<radio class="radio" color="rgb(47,35,41)" :checked="agreeGive == 1"></radio>
						<text>同意上述《商品赠送说明》</text>
					</view>
					<view class="give-button" @click="ensureGive">确定</view>
				</view>
			</view>
			<view class="exchange-area" v-if="showExchange">
				<view class="give-title">
					<image src="../../static/images/close.png" @click="hideWindow"></image>
				</view>
				<view class="exchange-good-info">
					<image src="../../static/images/app.png"></image>
					<!-- <image :src="goodData[storeIndex].thumb"></image> -->
					<view class="exchange-right">
						<text class="exchange-name">{{goodData[storeIndex].name}}</text>
						<view><text>兑换优米豆</text><text>{{goodData[storeIndex].exchange_coin}}</text></view>
					</view>
				</view>

				<view class="exchange-tip">
					<view>兑换说明</view>
					<view>1、不喜欢的商品可兑换平台优豆米(优豆米是作为平台兑换商品的媒介)</view>
					<view>2、优豆米一旦兑换,不可转让，不可提现</view>
					<view>3、优豆米的所属解释权归平台所有，有疑问请联系客服</view>
					<view>4、优豆米的兑换数量根据商品市场成本实时变化 </view>
				</view>

				<view class="exchange-submit">
					<view class="give-button" @click="ensureExchange">确定兑换</view>
				</view>
			</view>
			<view class="get-area" v-if="showGet">

			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/storeHouse/index'
	import * as UserApi from '@/api/user'

	export default {
		data() {
			return {
				tabIndex: 0,
				tabGoodIndex: 0,
				type: 0,
				// 正在加载
				//isLoading: true,
				// 购物车商品列表
				list: [],
				all: [],
				exchange: [],
				get: [],
				give: [],
				box: [],
				goodData: [],
				agreeGive: 0,
				storeIndex: null,
				showWindow: false,
				showGive: false,
				showExchange: false,
				showGet: false,
				tabNav: [{
						"name": "商品",
						"tab": "0",
						"active": "active"
					},
					{
						"name": "盒子",
						"tab": "1",
						"active": ""
					},
				],
				goodTab: [{
						"name": "全部",
						"tab": "0",
						"active": "good-tab-active"
					},
					{
						"name": "已兑换",
						"tab": "1",
						"active": ""
					},
					{
						"name": "已提货",
						"tab": "2",
						"active": ""
					},
					{
						"name": "已赠送",
						"tab": "3",
						"active": ""
					}
				]
			}
		},
		onShow(options) {
			//checkLogin() ? this.getCartList() : this.isLoading = false
			// 获取缓存中的选中记录
			//this.checkedIds = uni.getStorageSync(CartIdsIndex)
			if(this.global.Sign){
				this.loadData()
			}else{
				this.$navTo('pages/login/mobileLogin')
			}
		},

		methods: {
			loadData() {
				const app = this
				Api.list({
						type: app.tabGoodIndex
					})
					.then(result => {
						// 设置页面数据
						app.all = result.data.good.all
						app.get = result.data.good.get
						app.exchanges = result.data.good.exchanges
						app.give = result.data.good.give
						app.box = result.data.box
						app.goodData = result.data.good.all
					})
			},
			goBox(e) {
				this.$navTo('pages/weekLimit/index?id=' + e)
			},
			openBox(box_id,b_id) {
				this.$navTo('pages/unpacking/index?id=' + box_id+'&open_type=1'+'&b_id='+b_id)
			},
			//导航栏
			changeTab(e) {
				this.tabIndex = e
				this.tabNav.forEach((item, index) => {
					this.tabNav[index].active = ""
				})
				this.tabNav[e].active = 'active'
			},
			//商品下导航切换
			changeGoodTab(e) {
				this.tabGoodIndex = e
				this.goodTab.forEach((item, index) => {
					this.goodTab[index].active = ""
				})
				if (e == 0) {
					this.goodData = this.all
				} else if (e == 1) {
					this.goodData = this.exchanges
				} else if (e == 2) {
					this.goodData = this.get
				} else if (e == 3) {
					this.goodData = this.give
				}
				this.goodTab[e].active = 'good-tab-active'
				this.loadData()
			},
			ensureExchange() {
				const app = this
				uni.showModal({
					title: '确认要兑换吗？',
					icon: 'none',
					success(res) {
						if (res.confirm) {
							UserApi.exchange({
								id: app.goodData[app.storeIndex].id
							}).then(result => {
								if (result.status == 200) {
									uni.showToast({
										title: '兑换成功',
										icon: 'none',
										success() {
											app.showWindow = false
											app.showExchange = false
											setTimeout(function() {
												app.loadData()
											}, 2000)
										}
									})
								} else {
									uni.showToast({
										title: '兑换失败',
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							app.hideWindow()
						}
					}
				})
			},

			// 跳转到商品详情页
			onTargetGoods(goodsId) {
				this.$navTo('pages/goods/detail', {
					goodsId
				})
			},
			agreeProtocal() {
				this.agreeGive = !this.agreeGive
			},
			//确定赠送
			ensureGive() {
				if (!this.agreeGive) {
					uni.showToast({
						title: "请先同意上述《商品赠送说明》",
						icon: "none"
					})
					return false
				} else {
					//this.$navto('')
				}
			},
			cancelGive(e) {
				const app = this
				uni.showModal({
					title: '确认要取消赠送吗？',
					success(res) {
						if (res.confirm) {
							UserApi.cancelGive({
								id: app.goodData[e].id
							}).then(result => {
								if (result.status == 200) {
									uni.showToast({
										title: '取消成功',
										icon: 'none',
										success(res) {
											setTimeout(function() {
												app.loadData()
											}, 2000)
										}
									})
								} else {
									uni.showToast({
										title: '取消失败',
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},

			givePerson(e) {
				this.showGive = true
				this.showWindow = true
				this.storeIndex = e
			},
			exchangeCoin(e) {
				this.showWindow = true
				this.showExchange = true
				this.storeIndex = e
			},
			getGood(e) {
				this.showGet = true
				this.showWindow = true
				this.storeIndex = e
			},
			hideWindow() {
				this.storeIndex = null
				this.showWindow = false
				this.showExchange = false
				this.showGive = false
				this.showGet = false
			}

		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("../../static/font/YouSheBiao.TTF");
		src: url("../../static/font/SourceHanSansCN-Bold.otf");
		font-family: YouSheBiaoTiHei;
	}

	.container {
		background-color: #F5F6F7;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;

		.tab {
			height: 80rpx;
			line-height: 80rpx;
			color: #999999;
			background-color: #fff;
		}

		.tab view {
			width: 50%;
			float: left;
			text-align: center;
		}

		.active {
			color: #000000;
			font-weight: 700;
			border-bottom: 1px solid #000000;
		}

		.good-tab {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
		}

		.good-tab view {
			width: 25%;
			text-align: center;
			float: left;
			color: #767676;
		}

		.good-tab-active {
			color: #1D2129 !important;
			font-weight: 700;
		}

		.good-list {
			width: 94%;
			margin-left: 3%;
			margin-top: 20rpx;
			height: 260rpx;
			padding: 20rpx 2%;
			background-color: #fff;
			border-radius: 10rpx;
		}

		.goods-info {
			width: 70%;
			margin-left: 200rpx;
		}

		.goods-info view:nth-child(2) text {
			font-size: 40rpx;
		}

		.goods-info view:nth-child(1) {
			margin-top: 20rpx;
			font-weight: bold;
		}

		.goods-info view:nth-child(2) {
			color: #D99147;
		}

		.good-info image {
			width: 160rpx;
			height: 160rpx;
			position: absolute;
			margin-top: 20rpx;
			left: 4%;
		}

		.button-list {
			width: 60%;
			margin: 40rpx 0 40rpx 40%;
			float: right;
			display: flex;
		}

		.button-list view {
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			width: 120rpx;
			background: url("@/static/images/store-button.png") no-repeat;
			background-size: 100% 100%;
		}

		.box-list {
			width: 94%;
			margin-left: 3%;
			margin-top: 20rpx;
			height: 240rpx;
			padding: 20rpx 2%;
			background-color: #fff;
			border-radius: 10rpx;
		}

		.box-image {
			width: 200rpx;
			height: 200rpx;
			background-color: #F9F9F9;
			padding: 20rpx;
		}

		.box-info {
			margin-left: 5%;
		}


		.box-info view:nth-child(1) {
			font-weight: 700;
			font-size: 32rpx;
			margin-top: 20rpx;
		}

		.box-info view:nth-child(2) {
			margin-top: 20rpx;
		}

		.box-info image {
			width: 300rpx;
			height: 60rpx;
			margin-top: 40rpx;
		}

		.window {
			width: 100%;
			height: 90vh;
			position: absolute;
			top: 0px;
			z-index: 10;
			background-color: rgb(76, 76, 76);
			opacity: 0.9;
		}

		.give-area {
			width: 100%;
			height: 70%;
			position: absolute;
			z-index: 20;
			bottom: 0px;
			background-color: #fff;
			border-radius: 20rpx 20rpx 0px 0px;
		}

		.give-title image {
			position: absolute;
			right: 40rpx;
			width: 50rpx;
			height: 50rpx;
		}

		.give-title {
			text-align: center;
			margin-top: 20rpx;
			color: #000000;
			font-size: 32rpx;
		}

		.give-good-info {
			display: grid;
			text-align: center;
		}

		.give-good-info image {
			width: 200rpx;
			height: 200rpx;
			margin: 80rpx auto 20rpx;
		}

		.give-tip view:nth-child(1) {
			font-size: 30rpx;
			margin-bottom: 10rpx;
		}

		.give-tip {
			width: 90%;
			height: 280rpx;
			margin: 40rpx auto;
			color: #999999;
			background-color: #F5F6F7;
			border-radius: 10rpx;
			padding: 20rpx;
		}

		.give-button {
			width: 80%;
			height: 80rpx;
			line-height: 80rpx;
		}

		.give-submit view:nth-child(1) {
			width: 90%;
			margin: 0 auto;
			text-align: left;
		}

		.radio {
			vertical-align: middle;
			transform: scale(0.76)
		}

		.give-submit view:nth-child(2) {
			width: 80%;
			height: 110rpx;
			line-height: 110rpx;
			margin-top: 20rpx;
			margin-left: 10%;
			background: url('@/static/images/shop-buy.png') no-repeat;
			background-size: 100% 100%;
			text-align: center;
			color: #fff;
			font-size: 36rpx;
			font-weight: bold;
		}

		.exchange-area {
			width: 100%;
			height: 60%;
			position: absolute;
			z-index: 20;
			bottom: 0px;
			background-color: #fff;
			border-radius: 20rpx 20rpx 0px 0px;
		}

		.exchange-good-info {
			width: 90%;
			margin-left: 5%;
			display: flex;
		}

		.exchange-good-info image {
			margin-left: 20rpx;
			width: 100rpx;
			height: 100rpx;
			padding: 40rpx;
		}

		.exchange-right view text:nth-child(2) {
			font-size: 40rpx;
		}

		.exchange-right view {
			color: #D99147;
			margin-top: 20rpx;
		}

		.exchange-right {
			margin-top: 40rpx;
		}

		.exchange-name {
			font-size: 32rpx;
		}

		.exchange-tip {
			width: 90%;
			height: 320rpx;
			margin: 40rpx auto;
			color: #999999;
			background-color: #F5F6F7;
			border-radius: 10rpx;
			padding: 20rpx;
		}

		.exchange-tip view:nth-child(1) {
			font-size: 30rpx;
			margin-bottom: 10rpx;
		}

		.exchange-submit view {
			width: 80%;
			height: 110rpx;
			line-height: 110rpx;
			margin-top: 20rpx;
			margin-left: 10%;
			background: url('@/static/images/shop-buy.png') no-repeat;
			background-size: 100% 100%;
			text-align: center;
			color: #fff;
			font-size: 36rpx;
			font-weight: bold;
		}

		.bottom-info {
			margin-top: 20rpx;
			color: #999999 !important;
		}

		.giving {
			color: #999999 !important;
			font-size: 24rpx !important;
			margin-left: 20%;
		}

		.cancel {
			width: 180rpx !important;
			position: absolute;
			right: 60rpx;
		}

		.sku {
			color: #999999 !important;
			margin-bottom: 10rpx;
		}

		.box-list {
			height: 450rpx;
			background-color: #fff;
			border-radius: 20rpx;
		}

		.box-head {
			display: flex;
		}

		.blind-box image {
			width: 14%;
			height: 100rpx;
			margin: 0 auto;
		}

		.blind-box {
			display: flex;
		}

		.box-image {
			width: 200rpx;
			height: 200rpx;
		}

		.box-button view {
			height: 60rpx;
			line-height: 60rpx;
			font-size: 24rpx !important;
			text-align: center;
			float: left;
		}

		.look-box {
			width: 140rpx;
			background: url('@/static/images/store-button.png') no-repeat;
			background-size: 100% 100%;
			color: #1F182A;
		}

		.open-box {
			width: 140rpx;
			background: url('@/static/images/pay-button.png') no-repeat;
			background-size: 100% 100%;
			color: #fff;
		}

		.opportunity {
			width: 90%;
			margin: 30rpx auto 10rpx;
			text-align: center;
			color: #999999;
		}

	}
</style>