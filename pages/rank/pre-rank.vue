<template>
    <view class="container">
        <view class="header">
            <view class="rank-list">
                <view class="tz-bg">
                    <view class="text-title">
                        <view class="rank-number">排名</view>
                        <view class="rank-name">用户名</view>
                        <view class="honor-num">荣誉值</view>
                    </view>

                    <view class="rank-lists">
                        <view class="list first">
							<view class="current-number number1">1</view>
							<view class="user-info">
								<image src="../../static/images/avatar.png"></image>
								<view class="info">
									<view>136****5465</view>
									<view>可得￥1299元Apple Watch S8 GPS款</view>
								</view>
							</view>
							<view class="user-honor-num">25895654</view>
                        </view>

                        <view class="list second">
							<view class="current-number number2">2</view>
							<view class="user-info">
								<image src="../../static/images/avatar.png"></image>
								<view class="info">
									<view>136****5465</view>
									<view>可得￥1299元Apple Watch S8 GPS款</view>
								</view>
							</view>
							<view class="user-honor-num">878454</view>
                        </view>

                        <view class="list third">
							<view class="current-number number3">3</view>
							<view class="user-info">
								<image src="../../static/images/avatar.png"></image>
								<view class="info">
									<view>136****5465</view>
									<view>可得￥1299元Apple Watch S8 GPS款</view>
								</view>
							</view>
							<view class="user-honor-num">878454</view>
                        </view>

                        <view class="list">
							<view class="current-number">4</view>
							<view class="user-info">
								<image src="../../static/images/avatar.png"></image>
								<view class="info">
									<view>136****5465</view>
									<view>可得￥1299元Apple Watch S8 GPS款</view>
								</view>
							</view>
							<view class="user-honor-num">878454</view>
                        </view>
						
						<view class="list">
							<view class="current-number">5</view>
							<view class="user-info">
								<image src="../../static/images/avatar.png"></image>
								<view class="info">
									<view>136****5465</view>
									<view>可得￥1299元Apple Watch S8 GPS款</view>
								</view>
							</view>
							<view class="user-honor-num">878454</view>
						</view>
                    </view>
                
					<view class="my-rank">
						<text>未上榜</text>
						<image src="../../static/images/avatar.png"></image>
						<view class="other">
							<text>距离上榜还差</text>
							<text>789852荣誉值</text>
						</view>
						<text class="current-honor">0</text>
					</view>
					
				</view>
            </view>
        </view>
    </view>
</template>

<script>
    import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins'
    import {getEmptyPaginateObj, getMoreListData} from '@/core/app'
    import Images from "../../components/page/image/index";

    const pageSize = 15
    export default {
        components: {Images},
        mixins: [MescrollMixin],
        data() {
            return {
                //tab索引
                tabIndex: 0,
                // 枚举类
                CouponTypeEnum,
                list: {
                    data: [
                        {"": ""}
                    ]
                },
                // 上拉加载配置
                upOption: {
                    // 首次自动执行
                    auto: true,
                    // 每页数据的数量; 默认10
                    page: {size: pageSize},
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
        onLoad(options) {

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

            // 切换标签项
            onChangeTab(index) {
                const app = this
                // 设置当前选中的标签
                app.tabIndex = index
                // 刷新优惠券列表
                //app.onRefreshList()
            },

            // 刷新优惠券列表
            onRefreshList() {
                this.list = getEmptyPaginateObj()
                setTimeout(() => {
                    this.mescroll.resetUpScroll()
                }, 120)
            },

        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        src: url("@/static/font/YouSheBiao.TTF");
        src: url("@/static/font/SourceHanSansCN-Bold.otf");
        font-family: YouSheBiaoTiHei;
    }

    .header {
        width: 100%;
        height: 800rpx;
        color: #ffffff;
        background-size: 100% 100%;


        .tz-honor {
            width: 100%;
            height: 250rpx;
            margin-top: 100rpx;
            display: flex;
        }

        .honor-list {
            width: 33%;
            text-align: center;
        }

        .honor-number {
            font-size: 36rpx;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: 700;
            color: #82212E;
        }

        .honor-coin {
            color: #000000;
        }

        .honor-coin image {
            width: 30rpx;
            height: 30rpx;

        }

        .honor-phone {
            color: #804A12;
        }

        .honor1 {
            margin-top: 30px;
        }

        .honor2, .honor3 {
            margin-top: 40px;
        }

        .rank-image {
            width: 96%;
            margin-left: 2%;
            display: flex;
            margin-top: -145rpx;
            position: absolute;
        }

        .rank-image image {
            width: 50%;
            height: 50%;
            margin-top: 60rpx;
        }

        .rank-image1 image {
            width: 45% !important;
            height: 44% !important;
            margin-top: 90rpx;
        }

        .rank-image image:nth-child(2) {
            width: 40% !important;
            height: 40% !important;
            margin-top: 60rpx;
        }

        .rank-image1, .rank-image2, .rank-image3 {
            text-align: center;
        }

        .rank-image1 {
            width: 38%;
            background: url('@/static/images/champion.png') no-repeat;
            background-size: 100% 100%;
            margin-top: -70rpx;
            height: 280rpx;
        }

        .rank-image2 {
            width: 30%;
            height: 220rpx;
            background: url('@/static/images/secondary.png') no-repeat;
            background-size: 100% 100%;
        }

        .rank-image3 {
            width: 33%;
            height: 220rpx;
            background: url('@/static/images/third.png') no-repeat;
            background-size: 100% 100%;
        }

        .honor-view1 image:nth-child(1) {
            width: 50rpx;
            height: 50rpx;
            margin-top: 5rpx;
            margin-left: 20rpx;
        }

        .honor-view1 image:nth-child(4) {
            width: 38rpx;
            height: 38rpx;
            margin-top: 16rpx;
            position: absolute;
            right: 30rpx;
        }

        .honor-view1 {
            display: flex;
        }


        .honor-view1 text:nth-child(2) {
            width: 200rpx;
            font-weight: 700;
            font-size: 32rpx;
            margin-top: 10rpx;
        }

        .honor-view1 text:nth-child(3) {
            margin-top: 15rpx;
            position: absolute;
            right: 30rpx;
            width: 160rpx;
        }

        .honor-view2 {
            width: 92%;
            margin-left: 18rpx;
            margin-top: -10rpx;
            display: flex;
        }

        .honor-view2 view {
            width: 60%;
            height: 80rpx;
            padding-top: 34rpx;
            background: url('../../static/images/rank-over-bg.png') no-repeat;
            background-size: 100% 100%;
        }

        .honor-view2 view text:nth-child(1) {
            color: #FF4260;
            margin-right: 20rpx;
        }

        .red-bg {
            background-color: #EB6D63;
            color: #fff;
            padding: 5rpx;
            border-radius: 5rpx;
        }

        .honor-update {
            width: 40%;
            color: #FFEBD7;
            float: right;
            text-align: right;
            margin-top: 30rpx;
        }

        .text-title {
            width: 100%;
            height: 60rpx;
            line-height: 60rpx;
            display: flex;
            color: #A24309;
            font-weight: 600;
            background-image: linear-gradient(#FFD1B8,#FFB099);
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        }

        .rank-number,.current-number {
            width: 12%;
            padding-left: 20rpx;
        }

        .rank-name{
            padding-left: 5%;
        }

        .rank-name,.user-info {
            width: 63%;
        }

        .honor-num,.user-honor-num {
            width: 25%;
			text-align: right;
			padding-right: 20rpx;
        }

        .list {
            height: 100rpx;
            line-height: 100rpx;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            background-color: #fff;
        }

        .first{
            background-image: linear-gradient(#FFFFFF,#FFF5F4);
        }

        .second{
            background-image: linear-gradient(#FFFFFF,#FFF2FD);
        }

        .third{
            background-image: linear-gradient(#FFFFFF,#F2F9FF);
        }

        .current-number{
            padding-left: 30rpx;
            color: #000000;
        }

        .number1{
            color: #FFB00A;
        }

        .number2{
            color: #AFAFAF;
        }

        .number3{
            color: #DBAD6F;
        }

        .user-info{
            display: flex;
        }

        .user-info image{
            width: 70rpx;
            height: 70rpx;
            margin-top: 15rpx;
            margin-right: 10rpx;
        }

        .info view:nth-child(1){
            color: #000000;
            margin-top: -20rpx;
            position: absolute;
        }

        .info view:nth-child(2){
            color: #767676;
            position: absolute;
            margin-top: 20rpx;
            font-size: 24rpx;
        }

        .user-honor-num{
            text-align: right;
            color: #82212E;
        }

        .rank-lists{
            padding-bottom: 120rpx;
        }

        .my-rank{
            position: fixed;
            width: 100%;
            height: 100rpx;
            line-height: 100rpx;
            bottom: 0rpx;
            background: url('@/static/images/rank-bottom-bg.png') no-repeat;
            background-size: 100% 100%;
            z-index: 66;
            display: flex;
            color: #3D3D3D;
        }

        .my-rank image{
            width: 70rpx;
            height: 70rpx;
            margin-top: 15rpx;
        }

        .my-rank text:nth-child(1){
            padding-left: 10rpx;
            font-size: 24rpx;
            margin-right: 20rpx;
        }

        .my-rank view{
            display: grid;
        }

        .other{
            margin-left: 20rpx;
        }

        .other text{
            height: 10rpx;
            position: absolute;
        }

        .other text:nth-child(1){
            font-size: 24rpx;
            margin-top: -20rpx;
        }

        .other text:nth-child(2){
            margin-top: 15rpx;
            color: #82212E;
            font-weight: 700;
            font-size: 30rpx;
        }

        .current-honor{
            position: absolute;
            text-align: right;
            float: right;
            right: 20rpx;
        }

    }

</style>