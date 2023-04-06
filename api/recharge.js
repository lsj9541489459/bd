import request from '@/utils/request'

// api地址
const api = {
  submit: 'recharge/submit',
  daifu: 'checkout/daifu',
}

// 积分明细列表
export const submit = (data) => {
  return request.post(api.submit, data)
}
// 代付
export const daifu = (data) => {
  return request.post(api.daifu, data)
}
