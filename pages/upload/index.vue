<template>
	<view class="container" v-if="userInfo.user_id">

		<view class="recharge-panel">
			<view class="recharge-label" style="margin-top: 10px;">
				<text>客户类型</text>
			</view>

			<view class="uni-list">
				<radio-group @change="typeChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in type">
						<radio class="customer" :value="item.index" :checked="item.index === cust_type" />
						<text>{{item.name}}</text>
					</label>
				</radio-group>
			</view>

			<view class="recharge-label">
				<text>商户简称</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入商户简称" v-model="another_name" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text v-if="cust_type == '00'">客户简称</text>
				<text v-else>公司名称</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入客户简称" v-if="cust_type == '00'" v-model="cust_name" />
				<input type="text" placeholder="请输入公司名称" v-else v-model="cust_name" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>行业类别</text>
			</view>
			<view class="recharge-input">
				<!--<uni-section title="本地数据" type="line">
					<uni-data-select
							v-model="industry"
							:localdata="range"
							@change="changeIndustry"
					></uni-data-select>
				</uni-section>-->
				<input type="text" placeholder="请输入行业类别" disabled v-model="industry" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>法人所在省市</text>
			</view>
			<view class="recharge-input">
				<pickerAddress @change="change">{{txt}}</pickerAddress>
			</view>
			<view class="recharge-label" style="margin-top: 10px;">
				<text>详细地址</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入详细地址" v-model="company_addr" />
			</view>
			<template v-if="type == 'B' || type == 'C'">
				<view class="recharge-label" style="margin-top: 10px;">
					<text>企业法人名字</text>
				</view>
				<view class="recharge-input">
					<input type="text" placeholder="请输入商户简称" v-model="legal_name" />
				</view>
			</template>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>企业法人手机号码</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入企业法人手机号码" v-model="legal_tel" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>企业法人证件号</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入企业法人证件号" v-model="legal_cert_no" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>结算方式</text>
			</view>
			<view class="recharge-input">
				<radio-group @change="checkChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkType">
						<radio class="customer" :value="item.index" :checked="item.index === settle_type" />
						<text>{{item.name}}</text>
					</label>
				</radio-group>
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>银行帐号</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入银行帐号" v-model="bank_account_no" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>开户人</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入开户人" v-model="bank_account_name" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>银行账户类型</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入银行账户类型" disabled v-model="bank_account_type" />
			</view>
			<view class="recharge-label" style="margin-top: 10px;">
				<text>开户行名称</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入开户行名称" v-model="bank_name" />
			</view>
			<view class="recharge-label" style="margin-top: 10px;">
				<text>银行行别</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入银行行别" v-model="bank_type" />
			</view>
			<view class="recharge-label" style="margin-top: 10px;">
				<text>开户行所在的省市</text>
			</view>
			<view class="recharge-input">
				<pickerAddress @change="change1">{{txt1}}</pickerAddress>
			</view>
			<view class="recharge-label" style="margin-top: 10px;">
				<text>开户人证件号码</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入开户人证件号码" v-model="cert_no" />
			</view>

			<view class="recharge-label" style="margin-top: 10px;">
				<text>银行预留手机号</text>
			</view>
			<view class="recharge-input">
				<input type="text" placeholder="请输入银行预留手机号" v-model="bank_telephone_no" />
			</view>

			<view class="recharge-label"  style="margin-top: 10px;">
				<text>法人身份证正面</text>
			</view>

			<view class="recharge-input inline">
				<view class="image-list" v-if="card1">
					<image class="thumb" :src="card1" ></image>
					<view class="delete" @click="deleteImage" data-type="card1">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="card1">+</view>
			</view>
			
			<view class="recharge-label"  style="margin-top: 10px;">
				<text>法人身份证反面</text>
			</view>
			
			<view class="recharge-input inline">
				<view class="image-list" v-if="card2">
					<image class="thumb" :src="card2"></image>
					<view class="delete" @click="deleteImage" data-type="card2">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="card2">+</view>
			</view>

			<view class="recharge-label">
				<text>法人手持身份证正扫面照</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="card3">
					<image class="thumb" :src="card3"></image>
					<view class="delete" @click="deleteImage" data-type="card3">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="card3">+</view>
			</view>
			<view class="recharge-label">
				<text>营业执照</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="license">
					<image class="thumb" :src="license"></image>
					<view class="delete" @click="deleteImage" data-type="license">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="license">+</view>
			</view>
			<view class="recharge-label">
				<text>门头照</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="door">
					<image class="thumb" :src="door"></image>
					<view class="delete" @click="deleteImage" data-type="door">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="door">+</view>
			</view>
			<view class="recharge-label">
				<text>结算银行卡正面照</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="bank1">
					<image class="thumb" :src="bank1"></image>
					<view class="delete" @click="deleteImage" data-type="bank1">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="bank1">+</view>
			</view>
			<view class="recharge-label">
				<text>结算银行卡反面照</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="bank2">
					<image class="thumb" :src="bank2"></image>
					<view class="delete" @click="deleteImage" data-type="bank2">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="bank2">+</view>
			</view>
			<view class="recharge-label">
				<text>客户协议书</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="protocal">
					<image class="thumb" :src="protocal"></image>
					<view class="delete" @click="deleteImage" data-type="protocal">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="protocal">+</view>
			</view>
			<view class="recharge-label">
				<text>开户许可证或印鉴卡</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="proof">
					<image class="thumb" :src="proof"></image>
					<view class="delete" @click="deleteImage" data-type="proof">X</view>
				</view>
				<view class="id-card" v-else @click="addImage" data-type="proof">+</view>
			</view>
			<view class="recharge-label">
				<text>经营场所图(2张)</text>
			</view>
			<view class="recharge-input inline">
				<view class="image-list" v-if="scene1">
					<image class="thumb" :src="scene1"></image>
					<view class="delete" @click="deleteImage" data-type="scene1">X</view>
				</view>
				<view class="image-list" v-if="scene2">
					<image class="thumb" :src="scene2"></image>
					<view class="delete" @click="deleteImage" data-type="scene2">X</view>
				</view>
				<view class="id-card" v-if="!scene1" @click="addImage" data-type="scene">+</view>
				<view class="id-card" v-if="!scene2" @click="addImage" data-type="scene">+</view>
			</view>

			<!-- 确认按钮 -->
			<view class="recharge-submit btn-submit">
				<form @submit="onSubmit">
					<button class="button" formType="submit" :disabled="disabled">提交</button>
				</form>
			</view>
		</view>

	</view>
</template>

<script>
	import * as UserApi from '@/api/user'
	import * as UploadsApi from '@/api/uploads'
	import * as PlanApi from '@/api/recharge/plan'
	import SettingModel from '@/common/model/Setting'
	import SettingKeyEnum from '@/common/enum/setting/Key'
	import Index from "../user/personal/index";
	import Images from "../../components/page/image/index";
	import request from '@/utils/request'
	import pickerAddress from '../../components/picker-address/address.vue'
    import USelect from "../../uview-ui/components/u-select/u-select";

	export default {
		components: {
            USelect,
			Images,
			Index,
			pickerAddress
		},
		data() {
			return {
				imageValue:[],
				txt: '选择地址',
				txt1: '选择地址',
				cert_no: '',
				another_name: '',
				legal_cert_no: '',
				settle_type: '0',
				bank_type: '',
				bank_account_type: 'personal',
                bank_card_type: 'debit',
				cust_name: '',
				industry: '01',
				province: '',
				city: '',
				company_addr: '',
				legal_name: '',
				legal_tel: '',
				legal_cert_type: '',
				bank_name: '',
				bank_province: '',
				bank_city: '',
				bank_account_no: '',
				bank_account_name: '',
                bank_telephone_no: '',
				// 正在加载
				isLoading: true,
				// 会员信息
				userInfo: {},
				planList: [],
				// 按钮禁用
				disabled: false,
				type: [{
					'name': '小微',
					'index': "00"
				}, {
					'name': '企业',
					'index': "B"
				}, {
					'name': '个体',
					'index': "C"
				}],
				checkType: [{
					'name': '平台内账户',
					'index': "0"
				}, {
					'name': '银行卡账户',
					'index': "1"
				}],
                cust_type: "00",
				card1: null,
				card2: null,
				card3: null,
				license: null,
				door: null,
				bank1: null,
                bank2: null,
                protocal: null,
                proof: null,
                scene1: null,
                scene2: null,
                range:[
					{value:"01",text: "服饰鞋包"},
					{value:"02",text: "数码家电"},
					{value:"03",text: "鲜花礼品"},
					{value:"04",text: "美容护肤"},
					{value:"05",text: "团购"},
					{value:"06",text: "机票旅游"},
					{value:"07",text: "商务办公"},
					{value:"08",text: "文体用品"},
					{value:"09",text: "图书音像"},
					{value:"10",text: "家居装潢"},
					{value:"11",text: "母婴儿童"},
					{value:"12",text: "健康保健"},
					{value:"13",text: "食品饮料"},
					{value:"14",text: "资讯杂志"},
					{value:"15",text: "教育咨询"},
					{value:"16",text: "金融保险理财"},
					{value:"17",text: "软件定制创意"},
					{value:"18",text: "虚拟点卡"},
					{value:"19",text: "域名主机"},
					{value:"20",text: "电子商务"},
					{value:"21",text: "酒店预订"},
					{value:"22",text: "彩票"},
					{value:"23",text: "打车、智慧城市"},
					{value:"24",text: "移动支付手游"},
					{value:"25",text: "融资租赁"},
					{value:"26",text: "投资理财"},
					{value:"27",text: "保险行业"},
					{value:"31",text: "消费分期"},
					{value:"32",text: "其他行业"},
					{value:"33",text: "小贷消金"},
					{value:"34",text: "直播行业"},
					{value:"35",text: "信息咨询"},
					{value:"36",text: "综合商城"},
					{value:"41",text: "机械设备"},
					{value:"42",text: "直销行业"},
					{value:"43",text: "通信行业"},
					{value:"44",text: "汽车贸易"},
					{value:"45",text: "拍卖"},
					{value:"46",text: "税务服务"},
					{value:"47",text: "情趣用品"},
					{value:"48",text: "供应链服务"},
					{value:"49",text: "医疗服务"},
					{value:"50",text: "酒店管理"},
					{value:"51",text: "跨境直购"},
					{value:"52",text: "银行机构"},
					{value:"53",text: "事业单位"},
					{value:"55",text: "租赁行业"},
					{value:"56",text: "人力资源"},
					{value:"57",text: "房地产"},
					{value:"58",text: "批发零售业"},
					{value:"59",text: "制造业"},
					{value:"60",text: "文化活动服务"},
					{value:"61",text: "福利彩票"},
					{value:"62",text: "股票操盘"},
					{value:"63",text: "众筹"},
					{value:"66",text: "大宗商品"},
					{value:"67",text: "服装鞋包"},
					{value:"68",text: "互联网金融"},
					{value:"69",text: "话费充值"},
					{value:"70",text: "计算机软件"},
					{value:"71",text: "计算机系统集成"},
					{value:"72",text: "建筑工程"},
					{value:"73",text: "理财投资"},
					{value:"74",text: "金融租赁"},
					{value:"75",text: "旅游机票"},
					{value:"78",text: "人力资源"},
					{value:"79",text: "生活服务"},
					{value:"80",text: "软件定制商城"},
					{value:"82",text: "物流运输"},
					{value:"83",text: "消费金融"},
					{value:"84",text: "物业管理"},
					{value:"85",text: "小额贷款"},
					{value:"86",text: "游戏行业"},
					{value:"87",text: "游戏点卡"},
					{value:"88",text: "影视传媒"},
					{value:"89",text: "艺术品类"},
					{value:"1001",text: "餐饮娱乐类"},
					{value:"1002",text: "一般类"},
					{value:"1003",text: "民生类"},
					{value:"1004",text: "便民服务"},
					{value:"1005",text: "环保类"},
				]
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			// 获取页面数据
			this.getPageData()
		},

		methods: {
            change(data) {
				 this.txt = data.data.join(',')
				this.bank_province = data.data[0]
                this.bank_city = data.data[1]
			},
            change1(data) {
                this.txt1 = data.data.join(',')
                this.province = data.data[0]
                this.city = data.data[1]
            },
			checkChange(e) {
			    this.settle_type = e.detail.value
			},
            changeIndustry(e) {
                console.log("e:", e);
            },
			
			typeChange(e){
				this.cust_type = e.detail.value
			},
			
			addImage(e){
				let type = e.target.dataset.type;
				let _this = this
                uni.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: function (res) {
                        uni.uploadFile({
                            url: 'https://mnciiy.cn/index.php?s=/api/upload1/image', //这里为拼接的接口地址
                            filePath: res.tempFilePaths[0],
                            fileType: "image",
                            formData:{file: res.tempFilePaths[0]},
                            name: 'file',
                            success: uploadFileRes => {
                                // 这里可以对返回的参数进行处理了
								let src = 'https://mnciiy.cn/uploads/'+uploadFileRes.data;
                                if(type == 'card1'){
                                    _this.card1 = src;
								}else if(type == 'card2'){
                                    _this.card2 = src;
								}else if(type == 'card3'){
                                    _this.card3 = src;
								}else if(type == 'license'){
                                    _this.license = src;
								}else if(type == 'door'){
                                    _this.door = src;
								}else if(type == 'bank1'){
                                    _this.bank1 = src;
								}else if(type == 'bank2'){
                                    _this.bank2 = src;
								}else if(type == 'protocal'){
                                    _this.protocal = src;
								}else if(type == 'proof'){
                                    _this.proof = src;
								}else if(type == 'scene'){
                                    if(!_this.scene1){
                                        _this.scene1 = src;
                                    }else if(!_this.scene2){
                                        _this.scene2 = src;
                                    }
								}
                            },
                            fail(err) {
                                uni.showToast({ title: '上传失败', icon: "error" });
                            }
                        })
                    }
                });
			},
            deleteImage(e) {
                let type = e.target.dataset.type;
                if(type == 'card1'){
					this.card1 = null;
				}else if(type == 'card2'){
                    this.card2 = null;
				}else if(type == 'card3'){
                    this.card3 = null;
				}else if(type == 'license'){
                    this.license = null;
				}else if(type == 'door'){
                    this.door = null;
				}else if(type == 'bank1'){
                    this.bank1 = null;
				}else if(type == 'bank2'){
                    this.bank2 = null;
				}else if(type == 'protocal'){
                    this.protocal = null;
				}else if(type == 'proof'){
                    this.proof = null;
				}else if(type == ''){
                    this.card1 = null;
				}else if(type == 'scene1'){
                    this.scene1 = null;
				}else if(type == 'scene2'){
                    this.scene2 = null;
				}
            },
			// 获取页面数据
			getPageData() {
				const app = this
				app.isLoading = true
				Promise.all([app.getUserInfo()])
					.then(() => app.isLoading = false)
			},

			// 获取会员信息
			getUserInfo() {
				const app = this
				return new Promise((resolve, reject) => {
					UserApi.info()
						.then(result => {
							app.userInfo = result.data.userInfo
							resolve(app.userInfo)
						})
				})
			},

			// 立即充值
			onSubmit(e) {
				const app = this
				// 按钮禁用
				app.disabled = true
				// 提交到后端
				var data = {
					cust_type: app.cust_type,
					cert_no: app.cert_no,
					another_name: app.another_name,
					legal_cert_no: app.legal_cert_no,
					settle_type: app.settle_type,
					bank_type: app.bank_type,
					bank_account_type: app.bank_account_type,
					cust_name: app.cust_name,
					industry: app.industry,
					province: app.province,
					city: app.city,
					company_addr: app.company_addr,
					legal_name: app.legal_name,
					legal_tel: app.legal_tel,
					legal_cert_type: app.legal_cert_type,
					bank_name: app.bank_name,
					bank_province: app.bank_province,
					bank_city: app.bank_city,
					bank_account_no: app.bank_account_no,
					bank_account_name: app.bank_account_name,
                    card1: app.card1,
                    card2: app.card2,
                    card3: app.card3,
                    license: app.license,
                    door: app.door,
                    bank1: app.bank1,
                    bank2: app.bank2,
                    protocal: app.protocal,
                    proof: app.proof,
                    scene1: app.scene1,
					scene2: app.scene2,
                    bank_telephone_no: app.bank_telephone_no
				}

				request.post('merchantupload/submit', data)
					.then(result => {
						app.$success(result.message)
					})
					.finally(() => app.disabled = false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		background: #fff;
	}

	.container {
		padding-bottom: 70rpx;
	}

	/* 账户面板 */
	.account-panel {
		width: 650rpx;
		height: 180rpx;
		margin: 50rpx auto;
		padding: 0 60rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		color: #fff;
		background: linear-gradient(-125deg, #a46bff, #786cff);
		box-shadow: 0 5px 22px 0 rgba(0, 0, 0, 0.26);
	}

	.panel-lable {
		font-size: 32rpx;
	}

	.uni-list {
		margin-bottom: 25rpx;
	}

	.uni-list text {
		margin-right: 45rpx;
	}

	.customer {
		margin-right: 5rpx;
	}

	.recharge-label {
		color: rgb(51, 51, 51);
		font-size: 28rpx;
		margin-bottom: 25rpx;
	}

	.panel-balance {
		text-align: right;
		font-size: 46rpx;
	}

	.recharge-panel {
		margin-top: 60rpx;
		padding: 0 60rpx;
	}

	.id-card {
		width: 120rpx;
		height: 120rpx;
		background-color: #f7f7f7;
		text-align: center;
		font-size: 70rpx;
		border-radius: 15rpx;
		margin-right: 40rpx;
	}

	.thumb {
		width: 150rpx;
		height: 150rpx;
		border-radius: 20rpx;
	}

	.inline {
		display: flex;
		margin-bottom: 40rpx;
		margin-right: 30rpx;
	}

	.image-list {
		margin-right: 30rpx;
	}

	.delete {
		padding: 40rpx;
		position: absolute;
		margin-top: -190rpx;
		margin-left: 80rpx;
		z-index: 222;
	}

	.plan_money {
		font-size: 32rpx;
		color: rgb(82, 82, 82);
	}

	.plan_gift {
		font-size: 25rpx;
	}

	.recharge-input {
		margin-top: 25rpx;

		input {
			border: 1rpx solid rgb(228, 228, 228);
			border-radius: 10rpx;
			padding: 15rpx 16rpx;
			font-size: 26rpx;
		}
	}

	/* 立即充值 */
	.recharge-submit {
		margin-top: 70rpx;
	}

	.btn-submit {
		.button {
			font-size: 30rpx;
			background: #786cff;
			border: none;
			color: white;
			border-radius: 50rpx;
			padding: 0 120rpx;
			line-height: 3;
		}

		.button[disabled] {
			background: #a098ff;
			border-color: #a098ff;
			color: white;
		}
	}

	/* 充值说明 */
	.recharge-describe {
		margin-top: 50rpx;
		padding: 0 60rpx;

		.content {
			font-size: 26rpx;
			line-height: 1.6;
			color: #888;
		}
	}
</style>
