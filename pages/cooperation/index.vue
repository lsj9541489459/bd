<template>
	<view class="container">
		<!-- 表单组件 -->
		<view class="form-wrapper">
			<u-form :model="form" ref="uForm" label-width="140rpx">
				<u-form-item label="姓名" prop="name">
					<u-input v-model="form.name" placeholder="请填写您的姓名" />
				</u-form-item>
				<u-form-item label="手机号" prop="phone">
					<u-input v-model="form.phone" placeholder="请填写您的手机号码" />
				</u-form-item>
				<u-form-item label="微信" prop="wechat" :border-bottom="false">
					<u-input v-model="form.wechat" placeholder="请填写您的微信号" />
				</u-form-item>


				<view class="page-title">备注</view>

				<textarea v-model="form.memo" placeholder-style="color:#C9CDD4;font-size:14px;" placeholder="请输入备注" />
			</u-form>
		</view>

		<view class="tips">
			<view>提示：</view>
			<view>1、提交留言，我们的工作人员将会尽快与您联系。</view>
			<view>2、提交前请仔细核对您的输入内容。</view>
		</view>

		<!-- 操作按钮 -->
		<view class="footer">
			<view class="btn-wrapper">
				<view class="btn-item btn-item-main" :class="{ disabled }" @click="handleSubmit()">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isMobile
	} from '@/utils/verify'
	import * as UserApi from '@/api/user'

	// 表单字段元素
	const form = {
		name: '',
		phone: '',
		memo: '',
		wechat: ''
	}

	// 表单验证规则
	const rules = {
		name: [{
			required: true,
			message: '请填写您的姓名',
			trigger: ['blur', 'change']
		}],
		phone: [{
			required: true,
			message: '请填写您的手机号码',
			trigger: ['blur', 'change']
		},{
			// 自定义验证函数
			validator: (rule, value, callback) => {
				// 返回true表示校验通过，返回false表示不通过
				return isMobile(value)
			},
			message: '手机号码不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		}],
		wechat: [{
			required: true,
			message: '请填写您的微信号 ',
			trigger: ['blur', 'change']
		},{
			// 自定义验证函数
			validator: (rule, value, callback) => {
				let reg = /^[a-zA-Z][-_a-zA-Z0-9]{6,20}$/
				if(!reg.test(value)){
					return false
				}
				return true
			},
			message: '微信号以字母开头，字母、数字、下划线组合长度不低于6位',
			// 触发器可以同时用blur和change
			trigger: ['blur'],
		}],
	}

	export default {
		data() {
			return {
				form,
				rules,
				// 按钮禁用
				disabled: false
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {},

		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},

		methods: {
			// 表单提交
			handleSubmit() {
				const app = this
				if (app.disabled) {
					return false
				}
				app.$refs.uForm.validate(valid => {
					if (valid) {
						app.disabled = true
						UserApi.cooperation(app.form)
							.then(result => {
								if(result.status == '200'){
									uni.showToast({
										title: '保存成功',
										icon: 'none'
									})
									setTimeout(function () {
										uni.navigateBack()
									},2000)
								}
							})
							.finally(() => app.disabled = false)
					}
				})
			}

		}
	}
</script>

<style>
	page {
		background: #f7f8fa;
	}
</style>
<style lang="scss" scoped>
	@font-face {
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
	}

	.page-title {
		width: 100%;
		margin-top: 20rpx;
	}

	.form-wrapper {
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		margin: 20rpx auto 20rpx auto;
		padding: 0 40rpx;
		width: 100%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: #fff;
	}

	textarea {
		margin-top: 10px;
	}

	.tips view:nth-child(1) {
		font-size: 16px;
		font-weight: 600;
		color: rgb(102, 102, 102);
		margin-bottom: 10rpx;
	}

	.tips {
		width: 90%;
		margin-left: 5%;
		margin-top: 20px;
		color: rgb(162, 162, 163);
	}

	/* 底部操作栏 */

	.footer {
		margin-top: 100rpx;

		.btn-wrapper {
			width: 70%;
			height: 120rpx;
			line-height: 120rpx;
			margin-left: 15%;
			background: url("../../static/images/shop-buy.png") no-repeat;
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
			border-radius: 50rpx;
		}

		.btn-item-main {
			font-size: 40rpx;

			// 禁用按钮
			&.disabled {
				background: #ff9779;
			}
		}

	}
</style>
