<template>
    <view class="container" :style="'background:url('+background+')'">
    </view>
</template>

<script>
    import * as UserApi from '@/api/user'

    export default {
        data() {
            return {
                background: ''
            }
        },
        onShow() {
            this.getData()
        },
        methods: {
            getData() {
                const app = this
                UserApi.ruleVip().then(result => {
                    app.background = result.background
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        min-height: 180vh;
        background-size: 100% 100% !important;
    }
</style>
