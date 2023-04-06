'use strict';
exports.main = async (event, context) => {
	// event里包含着客户端提交的参数
	const res = await uniCloud.getPhoneNumber({
		appid: '__UNI__A8DAFB5', // 替换成自己开通一键登录的应用的DCloud appid
		provider: 'univerify',
		apiKey: '841a1c0979293202b1c4c587e7767221', // 在开发者中心开通服务并获取apiKey
		apiSecret: '60d66944ffdfc6d15fbb424cd2b71cb4', // 在开发者中心开通服务并获取apiSecret
		access_token: event.access_token,
		openid: event.openid
	})

	console.log(res); // res里包含手机号
	// 执行用户信息入库等操作，正常情况下不要把完整手机号返回给前端
	// 如果数据库在uniCloud上，可以直接入库
	// 如果数据库不在uniCloud上，可以通过 uniCloud.httpclient API，将手机号通过http方式传递给其他服务器的接口，详见：https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=httpclient
	return {
		code: 0,
		res:res,
		message: '获取手机号成功'
	}
}