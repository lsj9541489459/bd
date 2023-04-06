<template>
	<view class="content">
		<mp-html :content="content" />
	</view>
</template>

<script>
	import * as UserApi from '@/api/user'

	export default {
		data() {
			return {
				type: null,
				content: null
			}
		},
		onLoad(options) {
			this.type = options.type
		},
		onShow(){
			this.getContent(this.type)
		},
		methods: {
			getContent(type) {
				const app = this
				UserApi.agreements({
					type: type
				}).then(res => {
					app.content = res.data.content
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 40rpx 20rpx;
	}
</style>
