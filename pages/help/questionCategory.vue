<template>
	<view class="container">
		<view class="questions">
			<view class="question" v-for="q in questions" @click="questionDetail(q.id)">
				<text class="question-title">{{q.title}}</text>
				<image src="../../static/images/arrow-right1.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import * as QuestionApi from '@/api/help'

	export default {
		data() {
			return {
				id: null,
				questions: []
			}
		},
		onLoad(options){
			this.id = options.id
		},
		onShow(){
			this.getQuestion()
		},
		methods: {
			getQuestion(){
				const app = this
				QuestionApi.category({id:this.id})
						.then(result => {
							app.questions = result.data.questions
						})
			},
			questionDetail(id){
				this.$navTo('pages/help/questionDetail?id='+id)
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

	}
</style>
