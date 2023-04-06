<template>
    <!-- 商品组 -->
    <view class="daily-content">
        <view class="daily-get">
            <image src="../../static/images/daily-get.png"></image>
            <image src="../../static/images/fuli.png"></image>
            <image src="../../static/images/activity-rule.png"></image>
        </view>
        <view class="intro">
            <text>单日消费满198元，即可领取相关权益</text>
        </view>

        <view class="section1">
            <view class="reset">
                <view>14</view>
                <text>:</text>
                <view>15</view>
                <text>:</text>
                <view>16</view>
            </view>
            <view class="money">
                <view class="money-left">
                    <image src="../../static/images/red-arrow.png"></image>
                    <text>已消费298元</text>
                </view>

                <view class="money-right">
                    <view class="money-bg">198</view>
                    <view class="money-bg">298</view>
                    <view class="money-bg1">598</view>
                </view>

                <view class="current-icon">
                    <image src="../../static/images/check_sel.png"></image>
                    <image src="../../static/images/check_sel.png"></image>
                    <image src="../../static/images/check_sel.png"></image>
                </view>

                <view class="border"></view>
                <view class="get-text">还差300元即可领取奖励</view>
            </view>
        </view>

        <view class="get-area">
            <view class="get-area-head">
                <image class="money-bg2" src="../../static/images/get-money-bg.png"></image>
                <text>达到198元领取</text>
            </view>

            <scroll-view>
                <view class="get-list">
                    <view class="list-left">
                        <image src="../../static/images/yhq.png"></image>
                    </view>
                    <view class="list-right">
                        <text>优惠券*2</text>
                        <text>无门槛优惠券、大额满减券</text>
                        <text>查看详情</text>
                        <view class="lock">
                            <image src="../../static/images/lock.png"></image>
                        </view>
                        <image class="red-arrow" src="../../static/images/red-arrow1.png"></image>
                        <view class="get-unlock">去解锁</view>
                        <!--<view class="get-unlock">去解锁</view>-->
                    </view>
                </view>

                <view class="get-list">
                    <view class="list-left">
                        <image src="../../static/images/yhq.png"></image>
                    </view>
                    <view class="list-right">
                        <text>优惠券*2</text>
                        <text>无门槛优惠券、大额满减券</text>
                        <text>查看详情</text>
                        <view class="lock">
                            <image src="../../static/images/lock.png"></image>
                        </view>
                        <image class="red-arrow" src="../../static/images/red-arrow1.png"></image>
                        <view class="get-unlock">去解锁</view>
                        <!--<view class="get-unlock">去解锁</view>-->
                    </view>
                </view>
            </scroll-view>

        </view>


        <view class="get-area1">
            <view class="get-area-head">
                <image class="money-bg2" src="../../static/images/get-money-bg.png"></image>
                <text>达到298元领取</text>
            </view>

            <scroll-view>
                <view class="get-list">
                    <view class="list-left">
                        <image src="../../static/images/yhq.png"></image>
                    </view>
                    <view class="list-right">
                        <text>优惠券*2</text>
                        <text>无门槛优惠券、大额满减券</text>
                        <text>查看详情</text>
                        <view class="lock">
                            <image src="../../static/images/lock.png"></image>
                        </view>
                        <image class="red-arrow" src="../../static/images/red-arrow1.png"></image>
                        <view class="get-unlock">去解锁</view>
                        <!--<view class="get-unlock">去解锁</view>-->
                    </view>
                </view>

                <view class="get-list">
                    <view class="list-left">
                        <image src="../../static/images/yhq.png"></image>
                    </view>
                    <view class="list-right">
                        <text>优惠券*2</text>
                        <text>无门槛优惠券、大额满减券</text>
                        <text>查看详情</text>
                        <view class="lock">
                            <image src="../../static/images/lock.png"></image>
                        </view>
                        <image class="red-arrow" src="../../static/images/red-arrow1.png"></image>
                        <view class="get-unlock">去解锁</view>
                        <!--<view class="get-unlock">去解锁</view>-->
                    </view>
                </view>
            </scroll-view>

        </view>

    </view>

</template>

<script>
    import Images from "../../components/page/image/index";
    export default {
        components: {Images},
        /**
         * 组件的方法列表
         * 更新属性和数据的方法与更新页面数据的方法类似
         */
        methods: {
            /**
             * 跳转商品详情页
             */
            onTargetGoods(goodsId) {
                this.$navTo(`pages/goods/detail`, {
                    goodsId
                })
            },
            lookAll() {

            },
            goodDetail(id) {

            },
            openNow() {

            }

        }

    }
</script>

<style lang="scss" scoped>
    @font-face {
        src: url("@/static/font/YouSheBiao.TTF");
        font-family: YouSheBiaoTiHei-Bold;
    }

    .daily-content {
        background: url('@/static/images/daily-bg.png');
        background-size: 100% 100%;
        padding-bottom: 40rpx;

        .daily-get {
            display: flex;
            height: 260rpx;
        }

        .daily-get image:nth-child(1) {
            padding-top: 20rpx;
            width: 40%;
            height: 100rpx;
        }

        .daily-get image:nth-child(2) {
            width: 100%;
            height: 400rpx;
            position: absolute;
            right: 0px;
        }

        .daily-get image:nth-child(3) {
            width: 40rpx;
            height: 140rpx;
            position: absolute;
            right: 0px;
            top: 60rpx;
        }

        .intro {
            color: #fff;
            font-weight: 700;
            padding-left: 5%;
            font-size: 28rpx;
            top: 140rpx;
            position: absolute;
        }

        .section1 {
            width: 90%;
            left: 5%;
            height: 300rpx;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFE7E7 100%);
            border-radius: 20rpx;
            position: absolute;
            top: 240rpx;
        }

        .reset {
            width: 50%;
            height: 60rpx;
            margin-top: 20rpx;
            background: url('@/static/images/reset.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            color: #fff;
        }

        .reset view {
            height: 40rpx;
            background-color: #fff;
            text-align: center;
            color: #FF3737;
            margin-top: 10rpx;
            padding: 0 5rpx;
            border-radius: 4px;
        }

        .reset view:nth-child(1) {
            margin-left: 20rpx;
        }

        .reset text {
            margin-top: 10rpx;
            padding: 0 3rpx;
        }

        .money {
            display: flex;
            margin-top: 20rpx;
        }

        .money-left,
        .money-right {
            width: 50%;
        }

        .money-left image {
            width: 40rpx;
            height: 30rpx;
            margin-top: 5rpx;
            position: absolute;
        }

        .money-left text {
            margin-left: 40rpx;
        }

        .money-bg {
            width: 30%;
            height: 70rpx;
            line-height: 65rpx;
            background: url('@/static/images/money-bg.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            color: #fff;
        }

        .money-bg1 {
            width: 30%;
            height: 70rpx;
            line-height: 65rpx;
            background: url('@/static/images/money-bg1.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            color: #fff;
        }

        .money-right {
            display: flex;
        }

        .border {
            width: 88%;
            height: 3px;
            left: 5%;
            background: linear-gradient(180deg, #FD3E42 75%, #FFFFFF 100%);
            position: absolute;
            margin-top: 80rpx;
            left: 5%;
        }

        .current-icon image {
            width: 30rpx;
            height: 30rpx;
            position: absolute;
            margin-top: 70rpx;
            z-index: 111;
        }

        .current-icon image:nth-child(1) {
            right: 40%;
        }

        .current-icon image:nth-child(2) {
            right: 25.2%;
        }

        .current-icon image:nth-child(3) {
            right: 10.5%;
        }

        .get-text {
            width: 100%;
            height: 70rpx;
            line-height: 70rpx;
            background: url('@/static/images/remain-get.png') no-repeat;
            position: absolute;
            margin-top: 130rpx;
            border-radius: 0 0 20rpx 20rpx;
            text-align: center;
            color: #fff;
        }

        .get-area {
            width: 90%;
            margin-left: 5%;
            margin-top: 300rpx;
            background: url('@/static/images/money-area-bg.png') no-repeat;
            background-size: 100% 100%;
        }

        .get-area1 {
            width: 90%;
            margin-left: 5%;
            margin-top: 30rpx;
            background: url('@/static/images/money-area-bg.png') no-repeat;
            background-size: 100% 100%;
        }

        .get-area-head{
            height: 80rpx;
        }

        .money-bg2{
            width: 45%;
            height: 80rpx;
            margin-top: -10rpx;
        }

        .get-area-head text{
            height: 80rpx;
            line-height: 70rpx;
            position: absolute;
            left: 11%;
            color: #fff;
            font-weight: 700;
            font-size: 31rpx;
        }

        .get-list{
            width: 90%;
            height: 180rpx;
            margin-left: 5%;
            margin-top: 30rpx;
            margin-bottom: 30rpx;
            background-color: #fff;
            border-radius: 20rpx;
            display: flex;

        }

        .list-left image{
            width: 160rpx;
            height: 130rpx;
            margin: 25rpx 3%;
        }

        .list-right{
            display: grid;
        }

        .list-right text:nth-child(1){
            margin: 20rpx 0px;
            font-size: 32rpx;
            font-weight: 700;
            color: #3D3D3D;
        }

        .list-right text:nth-child(2){
            color: #666666;
            line-height: 40rpx;
            font-size: 24rpx;
        }

        .list-right text:nth-child(3){
            color: #BF1827;
            line-height: 50rpx;
            font-size: 24rpx;
        }

        .red-arrow{
            width: 28rpx;
            height: 28rpx;
            position: absolute;
            margin-top: 140rpx;
            margin-left: 100rpx;
        }

        .lock{
            position: absolute;
            right: 8%;
            margin-top: 15rpx;
            width: 150rpx;
            height: 150rpx;
        }

        .lock image{
            width: 100%;
            height: 100%;
        }

        .get-unlock{
            color: #fff;
            position: absolute;
            right: 13%;
            margin-top: 70rpx;
            font-size: 24rpx;
        }

    }
</style>