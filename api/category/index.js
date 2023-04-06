import request from '@/utils/request'

// api地址
const api = {
  list: '/store/index'
}

// 页面数据
export function list() {
  return request.get(api.list)
}
