<template>
	<view class="container">
		<!-- tab栏 -->
		<u-tabs :list="tabs" :is-scroll="false" :current="curTab" active-color="#1D2129" :duration="0.2"
			@change="onChangeTab" />

		<!-- 优惠券列表 -->
		<scroll-view scroll-y="true">
			<view class="coupons" v-if="curTab == 0">
				<view class="coupon" v-for="t,k in coupons">
					<view class="coupon-left"><text>￥</text><text>{{t.coupon.money}}</text></view>
					<view class="coupon-right">
						<view>{{t.coupon.name}}</view>
						<view>有效期至{{t.end_time}}</view>
					</view>
					<view class="button" @click="goUse">去使用</view>
				</view>
			</view>
			<view class="coupons" v-else>
				<view class="coupons-used" v-for="t,k in coupons">
					<view class="coupon-left"><text>￥</text><text>{{t.coupon.money}}</text></view>
					<view class="coupon-right">
						<view>{{t.coupon.name}}</view>
						<view>有效期至{{t.end_time}}</view>
					</view>
					<view class="button">已使用</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
	import {
		getEmptyPaginateObj,
		getMoreListData
	} from '@/core/app'
	import * as MyCouponApi from '@/api/myCoupon'
	const color = ['red', 'blue', 'violet', 'yellow']
	const pageSize = 15
	const tabs = [{
		name: `未使用`,
		value: 'isUnused'
	}, {
		name: `已使用`,
		value: 'isUse'
	}]

	export default {
		components: {
			MescrollBody
		},
		mixins: [MescrollMixin],
		data() {
			return {
				// 颜色组
				color,
				// 标签栏数据
				tabs,
				// 当前标签索引
				curTab: 0,
				// 优惠券列表数据
				coupons: [],
				unuse: [],
				used: [],
				list: getEmptyPaginateObj(),
				// 上拉加载配置
				upOption: {
					// 首次自动执行
					auto: true,
					// 每页数据的数量; 默认10
					page: {
						size: pageSize
					},
					// 数量要大于4条才显示无更多数据
					noMoreSize: 4,
					// 空布局
					empty: {
						tip: '亲，暂无相关优惠券'
					}
				}
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onShow() {
			this.getCouponList()
		},
		methods: {
			/**
			 * 上拉加载的回调 (页面初始化时也会执行一次)
			 * 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10
			 * @param {Object} page
			 */
			upCallback(page) {
				const app = this
				// 设置列表数据
				app.getCouponList(page.num)
					.then(list => {
						const curPageLen = list.data.length
						const totalSize = list.data.total
						app.mescroll.endBySize(curPageLen, totalSize)
					})
					.catch(() => app.mescroll.endErr())
			},

			/**
			 * 获取优惠券列表
			 */
			getCouponList(pageNo = 1) {
				const app = this
				return new Promise((resolve, reject) => {
					MyCouponApi.list({
							page: pageNo
						}, {
							load: false
						})
						.then(result => {
							// 合并新数据
							app.unuse = result.data.unuse
							app.used = result.data.used
							app.coupons = result.data.unuse
							app.upOption.auto = false
						})
				})
			},

			// 切换标签项
			onChangeTab(index) {
				const app = this
				// 设置当前选中的标签
				app.curTab = index
				app.coupons = index == 0 ? app.unuse : app.used
				// 刷新优惠券列表
				app.onRefreshList()
			},

			// 刷新优惠券列表
			onRefreshList() {
				this.list = getEmptyPaginateObj()
			},
			goUse() {
				this.$navTo('pages/index/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupons {
		width: 90%;
		height: 80vh;
		margin: 40rpx 5%;
	}

	.coupon {
		height: 120rpx;
		position: relative;
		margin-bottom: 30rpx;
		background: url('../../static/images/coupon1.png') no-repeat;
		background-size: 100% 100%;
		display: flex;
		color: #fff;
	}

	.coupons-used {
		height: 120rpx;
		position: relative;
		margin-bottom: 30rpx;
		background: url('../../static/images/coupon-used.png') no-repeat;
		background-size: 100% 100%;
		display: flex;
		color: #fff;
	}

	.coupon-left {
		width: 40%;
		line-height: 120rpx;
	}

	.coupon-left text:nth-child(1) {
		margin-left: 40rpx;
		font-size: 40rpx;
	}

	.coupon-left text:nth-child(2) {
		font-size: 50rpx;
	}

	.coupon-right view {
		height: 40rpx;
	}

	.coupon-right view:nth-child(1) {
		font-size: 30rpx;
		font-weight: 700;
		margin-top: 20rpx;
	}

	.coupon-right view:nth-child(2) {
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.button {
		width: 40rpx;
		height: 120rpx;
		word-break: break-word;
		position: absolute;
		right: 5rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.item-wrapper {
		width: 100%;
		display: flex;
		background: #fff;
		border-radius: 8rpx;
		color: #fff;
		height: 180rpx;

		.coupon-type {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 10;
			width: 128rpx;
			padding: 6rpx 0;
			background: #a771ff;
			font-size: 20rpx;
			text-align: center;
			color: #ffffff;
			transform: rotate(45deg);
			transform-origin: 64rpx 64rpx;
		}

		&.color-blue {
			background: linear-gradient(-125deg, #57bdbf, #2f9de2);
		}

		&.color-red {
			background: linear-gradient(-128deg, #ff6d6d, #ff3636);
		}

		&.color-violet {
			background: linear-gradient(-113deg, #ef86ff, #b66ff5);

			.coupon-type {
				background: #55b5ff;
			}
		}

		&.color-yellow {
			background: linear-gradient(-141deg, #f7d059, #fdb054);
		}

		&.color-gray {
			background: linear-gradient(-113deg, #bdbdbd, #a2a1a2);

			.coupon-type {
				background: #9e9e9e;
			}
		}

		.content {
			flex: 1;
			padding: 30rpx 20rpx;
			border-radius: 16rpx 0 0 16rpx;

			.title {
				font-size: 32rpx;
			}

			.bottom {
				.time {
					font-size: 24rpx;
				}

				.receive {
					height: 46rpx;
					width: 122rpx;
					line-height: 46rpx;
					text-align: center;
					border: 1rpx solid #fff;
					border-radius: 30rpx;
					color: #fff;
					font-size: 24rpx;

					&.state {
						border: none;
					}
				}
			}
		}

		.tip {
			position: relative;
			flex: 0 0 32%;
			text-align: center;
			border-radius: 0 16rpx 16rpx 0;

			.money {
				font-weight: bold;
				font-size: 52rpx;
			}

			.pay-line {
				font-size: 22rpx;
			}
		}

		.split-line {
			position: relative;
			flex: 0 0 0;
			border-left: 4rpx solid #fff;
			margin: 0 10rpx 0 6rpx;
			background: #fff;

			&:before,
				{
				border-radius: 0 0 16rpx 16rpx;
				top: 0;
			}

			&:after {
				border-radius: 16rpx 16rpx 0 0;
				bottom: 0;
			}

			&:before,
			&:after {
				content: '';
				position: absolute;
				width: 24rpx;
				height: 12rpx;
				background: #f7f7f7;
				left: -14rpx;
				z-index: 1;
			}


		}
	}
</style>
