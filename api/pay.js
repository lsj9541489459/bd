import request from '@/utils/request'

// api地址
const api = {
  getInfo: '/alipay/getInfo'
}

// 支付宝
export const getInfo = (param) => {
  return request.post(api.getInfo, param)
}
