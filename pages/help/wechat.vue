<template>
	<view class="container">
		<view class="wechat" :style="{background: 'url(' +bg_image + ') no-repeat','background-size': '100% 100%'}">
			<view class="qrcode">
				<image :src="qrcode" mode="widthFix"></image>
			</view>
			<view class="save">
				<view class="save-bg" @click="saveWechat">
					保存图片
				</view>
			</view>
        </view>
    </view>
</template>

<script>
	import * as UserApi from '@/api/user'
    export default {
        data() {
            return {
                bg_image: '/static/images/company-wechat.png',
				qrcode: ''
            }
        },
		onShow(){
        	this.getQrcode()
		},
        methods: {
        	getQrcode(){
				const app = this
				UserApi.qrcodes()
					.then(result => {
						// 设置页面数据
						app.qrcode = result.qrcode
					})
			},
			saveWechat(){
				// 图片保存到手机相册
				uni.saveImageToPhotosAlbum({
					//filePath: /*res.tempFilePath*/,
					filePath: this.qrcode,
					success: function() {
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration:2000,
							mask:true
						});
					},
					fail: function() {
						this.loadProgress = 0;
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						});
					}

				});

			}
		}
    }
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("@/static/font/YouSheBiao.TTF");
		src: url("@/static/font/SourceHanSansCN-Bold.otf");
		font-family: YouSheBiaoTiHei;
	}

	.container{
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;

		.wechat{
			width: 100%;
			height: 100vh;
		}

		.save{
			width:56%;
			margin-left: 25%;
			height: 80rpx;
			line-height: 80rpx;
			position: absolute;
			margin-top: 73vh;
			background: url('@/static/images/bt-bctp.png') no-repeat;
			background-size: 100% 100%;
			text-align: center;
			color: #fff;
			font-weight: 700;
			font-size: 32rpx;
		}

		.qrcode{
			width: 100%;
			position: absolute;
			// bottom: 32vh;
			margin-top: 77%;
			z-index: 66;
		}

		.qrcode image{
			width: 40%;
			margin-left: 33.5%;
		}
	}
</style>
