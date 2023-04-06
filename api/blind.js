import request from '@/utils/request'

// api地址
const api = {
    detail: '/blind/detail',
    getBonus: '/blind/getBonus',
    getGood: '/blind/getGood',
}

// 商品详情
export const detail = id => {
    return request.get(api.detail, id)
}

// 开盒
export const getBonus = parm => {
    return request.post(api.getBonus, parm)
}

// 开盒--去仓库查收
export const getGood = parm => {
    return request.post(api.getGood, parm)
}
