import request from '@/utils/request'

// 登录
export function requestLogin(params) {
  return request({
    url: '/member/login',
    method: 'post',
    data: params
  })
}

// 获取用户信息
export function getUserInfo(phone) {
  return request({
    url: '/admin/getUser/' + phone,
    method: 'get'
  })
}
