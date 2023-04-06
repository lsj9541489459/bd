<template>
	<view class="container">
		<view class="type">问题分类</view>

		<view class="questions">
			<view class="question" v-for="c in cate" @click="questionCategory(c.id)">
				<text class="question-title">{{c.name}}</text>
				<image src="../../static/images/arrow-right1.png"></image>
			</view>
		</view>

		<view class="type">常见问题</view>
		<view class="questions">
			<view class="question" v-for="q in questions" @click="questionDetail(q.id)">
				<text class="question-title">{{q.title}}</text>
				<image src="../../static/images/arrow-right1.png"></image>
			</view>
		</view>

		<view class="buttons">
			<view @click="onlineService()">在线客服</view>
			<view @click="helpFeedback()">帮助与反馈</view>
		</view>
	</view>
</template>

<script>
	import * as QuestionApi from '@/api/help'

	export default {
		data() {
			return {
				cate: [],
				questions: []
			}
		},
		onShow(){
			this.getQuestion()
		},
		methods: {
			getQuestion() {
				const app = this
				QuestionApi.list()
					.then(result => {
						app.cate = result.data.cate
						app.questions = result.data.questions
					})
			},
			questionCategory(id){
				this.$navTo('pages/help/questionCategory?id='+id)
			},
			questionDetail(id){
				this.$navTo('pages/help/questionDetail?id='+id)
			},
			helpFeedback(id) {
				this.$navTo('pages/help/question')
			},
			onlineService() {
				this.$navTo('pages/help/online')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("@/static/font/YouSheBiao.TTF");
		font-family: YouSheBiaoTiHei-Bold;
	}

	.container {
		background: #F5F6F7;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;

		.type {
			padding: 20rpx 30rpx;
			font-weight: 700;
			color: #999999;
			font-size: 30rpx;
		}

		.questions {
			background-color: #fff;
		}

		.question {
			width: 94%;
			margin-left: 3%;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #E5E6EB;
		}

		.question image {
			width: 40rpx;
			height: 40rpx;
			float: right;
			margin-top: 20rpx;
		}

		.buttons {
			width: 80%;
			margin-left: 10%;
			position: fixed;
			bottom: 60rpx;

		}

		.buttons view {
			width: 40%;
			height: 60rpx;
			line-height: 60rpx;
			float: left;
			color: #fff;
			text-align: center;
		}

		.buttons view:nth-child(1) {
			background: url('@/static/images/exchange.png') no-repeat;
			background-size: 100% 100%;
			margin-left: 5%;
		}

		.buttons view:nth-child(2) {
			background: url('@/static/images/shop-buy.png') no-repeat;
			background-size: 100% 100%;
			margin-right: 5%;
		}

	}
</style>
