<template>
	<view class="diy-banner">
		<!-- 图片轮播 -->
		<swiper class="swiper-box" :autoplay="autoplay" :duration="duration" :circular="true" :interval="3 * 1000"
			@change="_bindChange">
			<swiper-item v-for="(dataItem, index) in dataList" :key="index">
				<image mode="widthFix" class="slide-image" :src="dataItem.image_src"
					@click="onLink(dataItem.app_route)" />
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import mixin from '../mixin';

	export default {
		name: 'Banner',

		/**
		 * 组件的属性列表
		 * 用于组件自定义设置
		 */
		props: {
			itemIndex: String,
			dataList: {}
		},

		mixins: [mixin],

		/**
		 * 私有数据,组件的初始数据
		 * 可用于模版渲染
		 */
		data() {
			return {
				windowWidth: 750,
				indicatorDots: false, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				duration: 800, // 滑动动画时长
				imgHeights: [], // 图片的高度
				imgCurrent: 0 // 当前banne所在滑块指针
			};
		},

		created() {
			const app = this;
			uni.getSystemInfo({
				success({
					windowWidth
				}) {
					app.windowWidth = windowWidth > 750 ? 750 : windowWidth;
				}
			});
		},

		/**
		 * 组件的方法列表
		 * 更新属性和数据的方法与更新页面数据的方法类似
		 */
		methods: {
			/**
			 * 记录当前指针
			 */
			_bindChange(e) {
				this.imgCurrent = e.detail.current;
			},
			onLink(e) {
				this.$navTo(e)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.diy-banner {
		width: 94%;
		margin-left: 3%;
		position: relative;
		margin-bottom: 15rpx;

		// swiper组件
		.swiper-box {
			height: 240rpx;

			.slide-image {
				width: 100%;
				margin: 0 auto;
				display: block;
			}
		}
	}
</style>