import request from '@/utils/request'

// api地址
const api = {
    userInfo: '/profile/index',
    assets: '/profile/assets',
    bindMobile: '/profile/bindMobile',
    personal: '/profile/personal',
    boxes: '/profile/boxes',
    qrcodes: '/profile/qrcode',
    cooperation: '/cooperation/index',
    agreements: '/profile/agreements',
    exchange: '/profile/exchange',
    give: '/profile/give',
    cancelGive: '/profile/cancelGive',
    getGood: '/profile/getGood',
    logoff: '/login/logoff',
    rule: '/resource/rule',
    buyVip: '/profile/vip',

}

// 当前登录的用户信息
export const info = (param, option) => {
    const options = {
        isPrompt: true, //（默认 true 说明：本接口抛出的错误是否提示）
        load: true, //（默认 true 说明：本接口是否提示加载动画）
        ...option
    }
    return request.get(api.userInfo, param, options)
}

// 账户资产
export const assets = (param, option) => {
    return request.get(api.assets, param, option)
}

// 绑定手机号
export const bindMobile = (data, option) => {
    return request.post(api.bindMobile, data, option)
}

// 修改个人信息（头像昵称）
export const personal = (data, option) => {
    return request.post(api.personal, data, option)
}

//开盒记录
export const boxes = (data, option) => {
    return request.post(api.boxes, data, option)
}

//协议
export const agreements = (data, option) => {
    return request.post(api.agreements, data, option)
}

//合作
export const cooperation = (data, option) => {
    return request.post(api.cooperation, data, option)
}
//商品兑换优米豆
export const exchange = (data, option) => {
    return request.post(api.exchange, data, option)
}
//商品赠送
export const give = (data, option) => {
    return request.post(api.give, data, option)
}

//商品取消赠送
export const cancelGive = (data, option) => {
    return request.post(api.cancelGive, data, option)
}

//注销
export function logoff(data, option) {
    return request.post(api.logoff, data, option)
}

//会员中心规则图
export const ruleVip = (data, option) => {
    return request.post(api.rule, data, option)
}

//企业微信二维码
export const qrcodes = (data, option) => {
    return request.post(api.qrcodes, data, option)
}