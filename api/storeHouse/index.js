import request from '@/utils/request'

// api地址
const api = {
    list: '/storeHouse/index'
}

// 页面数据
export function list(param, option) {
    return request.get(api.list, param, option)
}
