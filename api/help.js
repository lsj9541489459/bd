import request from '@/utils/request'

// api地址
const api = {
    list: '/question/index',
    category: '/question/category',
    detail: '/question/detail',
    upload: '/uploads/uploadApi',
    submit: '/question/add',
    play: '/index/play'
}

// 帮助中心列表
export const list = (param) => {
    return request.get(api.list, param)
}

//帮助与反馈分类列表
export const category = (param) => {
    return request.get(api.category, param)
}

//帮助与反馈内容页面
export const detail = (param) => {
    return request.get(api.detail, param)
}


//上传图片
export const upload = (param) => {
    return request.post(api.upload, param)
}

//提交问题
export const submit = (param) => {
  return request.post(api.submit, param)
}

//玩法介绍
export function player() {
    return request.get(api.play, {})
}

