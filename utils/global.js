// global.js 文件
export default {
    ws: {},
    setWs: function(newWs) {
        this.ws = newWs
    },
	Sign:uni.getStorageSync('token')?true:false, // 是否登录
}