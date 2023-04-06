<script>
	export default {

		/**
		 * 全局变量
		 */
		globalData: {

		},

		/**
		 * 初始化完成时触发
		 */
		onLaunch() {
			// 小程序主动更新
			this.updateManager()
			this.createWebSocket()
		},

		methods: {

			// 创建websocket连接
			createWebSocket() {
				let that = this;
				that.webSocet = null;
				that.webSocet = new WebSocket("ws://d2fe1554.heziyoupin.com/api/socket");
				that.global.setWs(that.webSocet);
				// console.log('that.webSocet', that.webSocet);
				if (that.webSocet.readyState == 0 && !that.timeoutnum) {
					that.timer = setInterval(() => {
						if (that.timer_num < 3 && that.webSocet.readyState == 0) {
							that.timer_num++;
						} else {
							clearInterval(that.timer);
							that.timer = null;
							that.timer_num = 0;
							// 只要不成功就连接
							if (that.webSocet.readyState != 1) {
								that.reconnect();
							}
						}
					}, 1000);
				}
				//链接成功时
				that.webSocet.onopen = function() {
					//开启心跳
					that.start();
				}
				//收到消息时
				that.webSocet.onmessage = (msgInfo) => {
					// console.log('接收到的消息',msgInfo);
					// that.UP_WEBSOCKETINFO({
					// 	data: msgInfo.data,
					// 	timer: msgInfo.timeStamp
					// });
					
					// setInterval(()=>{
					// 	let aa =  new Date();
					// 	 this.$openInvite("你-----好"+aa)
					// 	 setTimeout(()=>{
					// 	  this.$closeInvite();
					// 	 },1000)
					// },3000)
					
					//收到服务器信息，心跳重置
					that.reset();
				}
				//连接错误
				that.webSocet.onerror = function() {
					console.log("WebSocket连接发生错误");
					//重连
					that.reconnect();
				};
				// 监听组件的销毁
				that.$once('hook:beforeDestroy', () => {
					if (that.webSocet.close) {
						that.webSocet.close();
						that.webSocet.onclose = () => {
							console.log('web socket 链接已关闭');
						};
					}
				})
			},
			reconnect() { //重新连接
				let that = this;
				if (that.webSocet && that.webSocet.readyState == 1) {
					clearInterval(that.timeoutnum);
					that.timeoutnum = null;
					that.timeNum = 0;
					return;
				}
				if (!that.timeoutnum) {
					that.timeoutnum = setInterval(function() {
						if (that.webSocet && that.webSocet.readyState == 1) {
							clearInterval(that.timeoutnum);
							that.timeoutnum = null;
							that.timeNum = 0;
							return;
						}
						//新连接
						that.createWebSocket();
						that.timeNum++;
						if (that.timeNum >= 3) {
							clearInterval(that.timeoutnum);
							that.timeoutnum = null;
							that.timeNum = 0;
						}
					}, 1000);
				};
			},
			reset() { //重置心跳
				//清除时间
				clearTimeout(this.timeoutObj);
				clearTimeout(this.serverTimeoutObj);
				//重启心跳
				this.start();
			},
			start() { //开启心跳
				let that = this;
				let date = new Date() 
				that.timeoutObj && clearTimeout(that.timeoutObj);
				that.serverTimeoutObj && clearTimeout(that.serverTimeoutObj);
				that.timeoutObj = setTimeout(function() {
					//这里发送一个心跳，后端收到后，返回一个心跳消息，
					if (that.webSocet && that.webSocet.readyState == 1) { //如果连接正常
						// that.webSocet.send(`发送心跳给后端${date}`);
					} else { //否则重连
						that.reconnect();
					}

				}, that.timeout)
			},

			/**
			 * 小程序主动更新
			 */
			updateManager() {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(res => {
					// 请求完新版本信息的回调
					// console.log(res.hasUpdate)
				})
				updateManager.onUpdateReady(() => {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，即将重启应用',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
				updateManager.onUpdateFailed(() => {
					// 新的版本下载失败
					uni.showModal({
						title: '更新提示',
						content: '新版本下载失败',
						showCancel: false
					})
				})
			}

		}

	}
</script>

<style lang="scss">
	/* 引入uView库样式 */
	@import "uview-ui/index.scss";
</style>

<style>
	/* 项目基础样式 */
	@import "./app.scss";

	.uni-app--showlayout+uni-tabbar.uni-tabbar-bottom,
	.uni-app--showlayout+uni-tabbar.uni-tabbar-bottom .uni-tabbar,
	.uni-app--showlayout+uni-tabbar.uni-tabbar-top,
	.uni-app--showlayout+uni-tabbar.uni-tabbar-top .uni-tabbar {
		left: var(--window-left);
		right: var(--window-right);
	}
</style>