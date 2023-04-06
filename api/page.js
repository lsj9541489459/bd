import request from '@/utils/request'

// api地址
const apiUri = {
  index: '/'
}

// 页面数据
export function index() {
  return request.get(apiUri.index, {})
}