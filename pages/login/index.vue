<template>
	<view class="login">
		<!--<MpWeixin v-if="isMpWeixinAuth" @success="onGetUserInfoSuccess" />
    <Main v-else :isParty="isParty" :partyData="partyData" />-->
		<!-- <view class="login-icon">
			<image src="/../../static/images/logo-icon.png"></image>
		</view> -->
	</view>
</template>

<script>
	import Main from './components/main'
	import MpWeixin from './components/mp-weixin'
	import SettingKeyEnum from '@/common/enum/setting/Key'
	import SettingModel from '@/common/model/Setting'
	import Images from "../../components/page/image/index";

	export default {
		components: {
			Images,
			Main,
			MpWeixin
		},

		data() {
			return {
				// 数据加载完成 [防止在微信小程序端onLoad和view渲染同步进行]
				isLoad: true,
				// 是否显示微信小程序授权登录
				isMpWeixinAuth: false,
				// 第三方用户信息数据
				partyData: {},
				jsCode: [],
				univerifyStyle: {
					"fullScreen": true, // 是否全屏显示，默认值： false
					"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
					"backgroundImage": "static/images/login-bg.png", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）
					"icon": {
						"path": "static/images/logo-icon.png", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
					},
					"closeIcon": {
						"path": "static/xxx.png" // 自定义关闭按钮，仅支持本地图片。 HBuilderX3.3.7+版本支持
					},
					"phoneNum": {
						"color": "#000000", // 手机号文字颜色 默认值：#202020
					},
					"slogan": {
						"color": "#BBBBBB" //  slogan 字体颜色 默认值：#BBBBBB 
					},
					"authButton": {
						"normalColor": "static/images/login-button.png", // 授权按钮正常状态背景颜色 默认值：#3479f5
						"highlightColor": "#ffffff", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
						"disabledColor": "#ffffff", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
						"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff  
						"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
						"borderRadius": "10px", // 授权按钮圆角 默认值："24px" （按钮高度的一半）
					},
					"otherLoginButton": {
						"visible": true, // 是否显示其他登录按钮，默认值：true  
						"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
						"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
						"textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
						"title": "其它手机号码登录", // 其他登录方式按钮文字 默认值：“其他登录方式”  
						"borderColor": "", //边框颜色 默认值：透明（仅iOS支持）  
						"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
					},
					"privacyTerms": {
						"defaultCheckBoxState": true, // 条款勾选框初始状态 默认值： true
						"uncheckedImage": "", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
						"checkedImage": "", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
						"checkBoxSize": 12, // 可选 条款勾选框大小，仅android支持
						"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
						"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
						"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
						"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
						"privacyItems": [ // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
							{
								"url": "http://d2fe1554.heziyoupin.com/index/protocal/agreement", // 点击跳转的协议详情页面  
								"title": "用户服务协议" // 协议名称  
							},
							{
								"url": "http://d2fe1554.heziyoupin.com/index/protocal/privacy", // 点击跳转的协议详情页面  
								"title": "隐私政策" // 协议名称  
							}
						]
					},
					"buttons": { // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
						"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
						"list": [{
								"provider": "apple",
								"iconPath": "/static/apple.png" // 图标路径仅支持本地图片
							},
							{
								"provider": "weixin",
								"iconPath": "static/images/ico_wechat.png" // 图标路径仅支持本地图片
							}
						]
					}
				},
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		async onLoad(options) {
			// 设置当前是否显示微信小程序授权登录
			//await this.setShowUserInfo()
			// 数据加载完成
		},

		onShow() {
			this.init()
		},

		methods: {
			init() {
				const app = this
				uni.preLogin({
					provider: 'univerify',
					success() { //预登录成功
						uni.login({
							provider: 'univerify',
							univerifyStyle: app.univerifyStyle,
							success(res) { // 登录成功
								console.log(res);
								app.jsCode = res.authResult

								// const res1 = uniCloud.getPhoneNumber({
								// 	provider: 'univerify',
								// 	appid: '__UNI__A8DAFB5', // DCloud appid，不同于callFunction方式调用，使用云函数Url化需要传递DCloud appid参数！！！
								// 	apiKey: '841a1c0979293202b1c4c587e7767221', // 在开发者中心开通服务并获取apiKey
								// 	apiSecret: '60d66944ffdfc6d15fbb424cd2b71cb4', // 在开发者中心开通服务并获取apiSecret
								// 	access_token: res.authResult.access_token,
								// 	openid: res.authResult.openid
								// })
								uniCloud.callFunction({
									name: 'getPhoneNumber', // 你的云函数名称
									data: {
										access_token: res.authResult
											.access_token, // 客户端一键登录接口返回的access_token
										openid: res.authResult.openid // 客户端一键登录接口返回的openid
									}
								}).then(dataRes => {
									console.log('云函数返回的参数', dataRes)
									uni.showToast({
										title: `当前手机号为：${dataRes.result.res.phoneNumber}`,
										icon: "none"
									})
								}).catch(err => {
									console.log('云函数报错', err)
								})

								console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
							},
							fail(res) { // 登录失败
								console.log(res.errCode)
								console.log(res.errMsg)
								uni.closeAuthView()
								app.$navTo('pages/login/mobileLogin',{},"redirectTo")
								// uni.redirectTo({
								// 	url: '/pages/login/mobileLogin'
								// })
							}
						})
					},
					fail(res) { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res.errMsg)
					}
				})
			},

			/**
			 * 设置当前是否显示微信小程序授权登录
			 *  - 条件1: 只有微信小程序才显示获取用户信息按钮
			 *  - 条件2: 后台设置是否已开启该选项 [后台-客户端-注册设置]
			 */
			async setShowUserInfo() {
				console.log('setShowUserInfo start')
				const app = this
				// 判断当前客户端是微信小程序, 并且支持getUserProfile接口
				const isMpWeixin = app.platform === 'MP-WEIXIN' && wx.canIUse('getUserProfile')

				// 获取后台设置
				/*await SettingModel.item(SettingKeyEnum.REGISTER.value, false)
				  .then(setting => {
				    app.isMpWeixinAuth = isMpWeixin && setting.isOauthMpweixin
				    console.log('setShowUserInfo complete')
				  })*/
			},

			// 获取到用户信息的回调函数
			onGetUserInfoSuccess({
				oauth,
				code,
				userInfo
			}) {
				// 记录第三方用户信息数据
				this.partyData = {
					oauth,
					code,
					userInfo
				}
				// 显示注册页面
				this.onShowRegister()
			},

			// 显示注册页面
			onShowRegister() {
				// 是否显示微信小程序授权登录
				this.isMpWeixinAuth = false
				// 已获取到了第三方用户信息
				this.isParty = true
			}

		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
		src: url("@/static/font/YouSheBiao.TTF");
	}

	.login {
		font-family: Source Han Sans CN-Bold, Source Han Sans CN;

		width: 100%;
		height: 90vh;
		/* background: url("@/static/images/login-bg.png") no-repeat; */
		background-size: 100% 100%;

		.login-icon {
			width: 100%;
		}

		.login-icon image {
			width: 180rpx;
			height: 180rpx;
			margin-left: 35%;
			margin-top: 120rpx;
		}
	}
</style>