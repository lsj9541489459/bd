<template>
	<view class="container">
		<!-- 表单组件 -->
		<view class="form-wrapper">
			<u-form label-width="140rpx">
				<view class="page-title">问题描述</view>
				<textarea class="white-bg" v-model="description"
					placeholder-style="color:#C9CDD4;font-size:14px;padding: 20rpx;" maxlength="100"
					placeholder="请输入不少于10个字的描述" @input="sumWords" />
				<text class="count">{{counts}}/100</text>

				<view class="page-title">(选填)问题截图</view>
				<view class="upload-image">
					<block v-if="images.length > 0">
						<view v-for="m,k in images">
							<image class="upload-images" :src="m"></image>
							<image class="delete-image" src="../../static/images/close1.png" @click="deleteImage(k)"></image>
						</view>
					</block>
					<block v-if="images.length < 5">
						<image class="upload-button" src="../../static/images/choose-file.png" @click="chooseImg">
						</image>
					</block>
				</view>


				<view class="page-title">(选填)联系方式</view>
				<u-input class="contact" v-model="contact"
					placeholder-style="color:#C9CDD4;font-size:14px;padding: 20rpx;" placeholder="QQ、邮箱、手机号" />

			</u-form>
		</view>

		<!-- 操作按钮 -->
		<view class="footer">
			<view class="btn-wrapper">
				<view class="btn-item btn-item-main" @click="handleSubmit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as QuestionApi from '@/api/help'
	import * as UploadApi from '@/api/upload'
	import {
		app
	} from '../../store/modules'

	import Config from '@/core/config'

	// 后端api地址
	const apiUrl = Config.get('apiUrl')

	// 表单验证规则
	export default {
		data() {
			return {
				description: '',
				img_src: [],
				contact: '',
				counts: 0,
				// 按钮禁用
				disabled: false,
				images: []
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad() {},
		methods: {
			// 表单提交
			handleSubmit() {
				const app = this
				if (!app.validate()) {
					return false
				}
				if (app.disabled) {
					return false
				}
				app.disabled = true
				let data = {
					description: app.description,
					img_src: JSON.stringify(app.img_src),
					contact: app.contact
				}
				QuestionApi.submit(data)
					.then(result => {
						app.$toast(result.data.msg)
						app.description = ''
						app.img_src = []
						app.images = []
						app.contact = ''
						setTimeout(function() {
							app.$navTo("pages/help/list")
						}, 2500)
					})
					.finally(() => app.disabled = false)
			},
			validate() {
				if (this.description == '') {
					uni.showToast({
						title: '问题描述不可为空',
						icon: 'none'
					})
					return false;
				}
				return true
			},
			sumWords(e) {
				this.counts = e.detail.value.length
			},
			deleteImage(e){
				this.images = this.images.slice(e,1)
				this.img_src = this.img_src.slice(e,1)
			},
			chooseImg() {
				const app = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						app.uploadImage(res.tempFilePaths[0])
					}
				});
			},
			uploadImage(files) {
				const app = this
				uni.uploadFile({
					url:  apiUrl + '/uploads/uploadApp',
					filePath: files,
					name: 'file',
					type: 'json',
					success: (res) => {
						let data = JSON.parse(res.data)
						app.images.push(data['data']['save_name'])
						app.img_src.push(data['data']['save_name'])
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
		font-family: YouSheBiaoTiHei-Bold;
		src: url("../../static/font/YouSheBiao.TTF");
	}

	.page-title {
		width: 100%;
		margin-top: 20rpx;
		padding-left: 20rpx;
	}

	.form-wrapper {
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		margin: 20rpx auto 20rpx auto;
		width: 100%;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
	}

	.white-bg {
		height: 200rpx;
	}

	.white-bg,
	.upload-image {
		background-color: #fff;
		width: 100%;
		padding: 20rpx;
	}

	textarea {
		margin-top: 10px;
	}

	.upload-image {
		height: 120px;
		margin: 30rpx 0px 00rpx;
	}

	.upload-image view{
		width: 23%;
		float: left;
		height: 120px;
		margin-right:2%;
	}

	.upload-images {
		width: 100%;
		height: 90px;
		margin: 0 10rpx;
	}

	.delete-image{
		position: absolute;
		margin-top: -190rpx;
		margin-left: 18%;
		width: 40rpx;
		height: 40rpx;
	}

	.upload-button {
		width: 90px;
		height: 90px;
		margin-left: 20rpx;
	}

	.contact {
		margin: 30rpx 0 0rpx;
		background-color: #fff;
		padding: 10rpx 0px 10rpx 20rpx !important;
		width: 100%;
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

	.count {
		position: absolute;
		right: 2%;
		margin-top: -50rpx;
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
