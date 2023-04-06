<template>
    <view class="container">
        <view class="questions">
			<view class="question-view">
				<view class="question-title">{{question.title}}</view>
				<view class="question-content">
					<view v-for="c in question.content">{{c}}</view>
				</view>
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
                question: null
            }
        },
        onLoad(options) {
            this.id = options.id
        },
        onShow() {
            this.getQuestion()
        },
        methods: {
            getQuestion() {
                const app = this
                QuestionApi.detail({id: this.id})
                    .then(result => {
                        app.question = result.data.question
                    })
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
		color: #000000;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;

        .type {
            padding: 20 rpx 30 rpx;
            font-weight: 700;
            color: #999999;
            font-size: 30 rpx;
        }

        .questions {
			width: 100%;
            background-color: #fff;
        }

        .question-view {
            width: 94%;
            margin-left: 3%;
            height: 80 rpx;
            line-height: 80 rpx;
        }

		.question-title{
			font-size: 32rpx;
			border-bottom: 1rpx solid #E5E6EB;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
		}
		
		.question-content{
			padding: 0px 20rpx 40rpx;
		}

		.question-content view{
			line-height: 50rpx;
		}

    }
</style>
