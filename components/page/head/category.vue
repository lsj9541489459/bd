<template>
    <view class="head">
        <view class="logo"></view>
        <view class="category-tip"></view>
    </view>
</template>

<script>

    export default {
        /**
         * 组件的属性列表
         * 用于组件自定义设置
         */
        props: {
            itemStyle: Object
        },

        /**
         * 组件的方法列表
         * 更新属性和数据的方法与更新页面数据的方法类似
         */
        methods: {
            day(){
                uni.navigateTo({
                    url: '/pages/dayLimit/index'
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    @font-face {
    	font-family: YouSheBiaoTiHei-Bold;
    	src: url("../../../static/font/YouSheBiao.TTF");
    }
    .head {
        height: 60px;
        display: flex;
		padding-top: 10px;
        margin-bottom: 20px;
    }

    .logo {
        width: 188rpx;
        height: 86rpx;
        margin-left: 4%;
        background: url("../../../static/images/shop-logo.png") no-repeat;
		background-size: 100% 100%;
    }

    .category-tip {
        width: 439rpx;
        height: 60rpx;
		color: #fff;
		margin-left: 12%;
		margin-top: 30rpx;
		text-align: left;
        background-image: url("../../../static/images/category-tip.png");
		background-size: 100% 100%;
    }

</style>
