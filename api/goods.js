import request from '@/utils/request'

// api地址
const api = {
    list: '/goods/list',
    detail: '/goods/detail',
    blind: '/blind/good',
    specData: '/goods/specData',
    category: '/goods/category',
    order: '/order/index',
    dayLimit: '/dayLimit/index'
}

// 商品列表
export const list = param => {
    return request.get(api.list, param)
}

// 商品详情
export const detail = param => {
    return request.get(api.detail, param)
}

// 获取商品规格数据
export const specData = (goodsId) => {
    return request.get(api.specData, {goodsId})
}

//获取订单相关信息
export const order = param => {
    return request.get(api.order, param)
}

//商品详情
export const blind = param => {
    return request.get(api.blind, param)
}

//每日限定
export const dayLimit = param => {
    return request.get(api.dayLimit, param)
}

//获取商城分类
export const category = param => {
    return request.get(api.category, param)
}
