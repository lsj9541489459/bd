<template>
    <view class="container">
        <!--,backgroundSize: '100% 100%'-->
        <view class="wechat" :style="{background: 'url(' +bg_image + ') no-repeat'}">
        </view>
    </view>
</template>

<script>
    import * as HelpApi from '@/api/help'
    export default {
        data() {
            return {
                bg_image: '',
            }
        },
        onLoad(){
            this.getPlay()
        },
        methods: {
            getPlay(){
                const app = this
                HelpApi.player()
                    .then(result => {
                        // 设置页面数据
                        app.bg_image = result.data.play
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        .wechat{
            width: 100%;
            min-height: 200vh;
            background-size: 100% 100% !important;
        }
    }
</style>
