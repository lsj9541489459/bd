<template>
	<view class="mobileLogin">
		<view class="mobileLogin-title">手机号码登录</view>
		<view class="mobileLogin-list">
			<view class="mobileLogin-list-name fs38">+86</view>
			<input type="text" :value="phone" maxlength="11" @input="onKeyInput" placeholder="请输入您的手机号码"
				placeholder-class="inputClass" />
		</view>
		<view class="mobileLogin-list">
			<view class="mobileLogin-list-name fs30">验证码</view>
			<input type="text" :value="code" maxlength="6" @input="onKeyCode" placeholder="请输入验证码"
				placeholder-class="inputClass" />
			<view class="mobileLogin-list-code" v-if="showCode" @click="getSend()">获取验证码</view>
			<view class="mobileLogin-list-code cCDCDCD" v-if="!showCode">{{time}}s</view>
		</view>
		<view class="mobileLogin-btn bgc1f182a" @click="signIn()" v-if="check&&phone.length==11&&code.length==6">登录
		</view>
		<view class="mobileLogin-btn bgccdcdcd" @click="signIn()" v-else>登录</view>

		<view class="mobileLogin-link">
			<label class="item-radio" @click="agreement">
				<radio class="radio" color="rgb(47,35,41)" :checked="check"></radio>
			</label>
			我已阅读并同意
			<text @click="GoTo('pages/user/agreement?type=secret')" class="c417AA7">《隐私政策》</text>
			和
			<text @click="GoTo('pages/user/agreement?type=user')" class="c417AA7">《用户协议》</text>
		</view>
	</view>
</template>

<script>
	import * as login from '@/api/login'
	export default {

		data() {
			return {
				check: false,
				showCode: true,
				timer: null,
				time: 60,
				// phone: "17702332753",
				// code: "394996",
				phone: "",
				code: "",
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad(options) {
			
		},

		onShow() {},
		onHide() {
			clearInterval(this.timer)
		},

		methods: {
			GoTo(url) {
				this.$navTo(url)
			},
			onKeyInput: function(event) {
				this.phone = event.target.value
			},
			onKeyCode: function(event) {
				this.code = event.target.value
			},
			signIn() {
				let that = this
				if (this.phone == "" || this.phone.length != 11) {
					this.$toast("请输入正确手机号码")
					return
				}
				if (this.code.length != 6) {
					this.$toast("请输入正确验证码")
					return
				}
				if (!this.check) {
					this.$toast("请先同意《隐私政策》和《用户协议》")
					return
				}
				login.login({
						phone: this.phone,
						code: this.code,
					})
					.then(result => {
						uni.setStorageSync('token', result.data.token);
						this.global.Sign = true;
						uni.setStorageSync('user', result.user);
						this.$toast("登录成功")
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1000)
					})
			},
			getSend() {
				if (this.phone == "" || this.phone.length != 11) {
					this.$toast("请输入正确手机号码")
					return
				}
				this.getCode()
				login.send({
						phone: this.phone
					})
					.then(result => {
						this.$toast(result.data.message)
					})
			},
			agreement() {
				this.check = !this.check
			},
			getCode() {
				this.time = 60;
				this.showCode = false
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					if (this.time === 0) {
						this.showCode = true
						clearInterval(this.timer)
					} else {
						this.time--
					}
				}, 1000)
			},


		}
	}
</script>

<style lang="scss" scoped>
	.mobileLogin {
		width: 100vw;
		height: 100vh;
		background: url("@/static/images/login-bg.png") no-repeat;
		background-size: 100% 100%;
		padding: 277rpx 80rpx 0;
		color: #3D3D3D;

		.mobileLogin-title {
			font-size: 38rpx;
			font-weight: 700;
			line-height: 55rpx;
			margin-bottom: 24rpx;
		}

		.mobileLogin-list {
			height: 125rpx;
			border-bottom: 1px solid #D8D8D8;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.mobileLogin-list-name {
				width: 90rpx;
				flex: 0 0 90rpx;
				font-size: 30rpx;
				font-weight: 700;
				color: #3D3D3D;
				margin-right: 28rpx;
			}

			input,
			.inputClass {
				width: 100%;
				font-size: 32rpx;
				color: #A7A7A7;
			}

			.mobileLogin-list-code {
				width: 165rpx;
				flex: 0 0 165rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
				color: #539CF3;
			}
		}

		.mobileLogin-btn {
			height: 98rpx;
			line-height: 98rpx;
			font-size: 34rpx;
			font-weight: 700;
			color: #FFFFFF;
			border-radius: 15rpx;
			text-align: center;
			margin-top: 80rpx;
		}

		.mobileLogin-link {
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			line-height: 36rpx;
			position: fixed;
			bottom: 36rpx;

			.item-radio {
				font-size: 24rpx;
				width: 30px;

				.radio {
					width: 20px;
					height: 20px;
					vertical-align: baseline;
					transform: scale(0.56)
				}
			}
		}
	}

	.fs30 {
		font-size: 30rpx
	}

	.fs38 {
		font-size: 38rpx
	}

	.c417AA7 {
		color: #417AA7;
	}

	.cCDCDCD {
		color: #CDCDCD;
	}

	.c417AA7 {
		color: #417AA7;
	}

	.bgccdcdcd {
		background-color: #CDCDCD;
	}

	.bgc1f182a {
		background-color: #1F182A;
	}
</style>