import request from '@/utils/request'

export function requestLogin(params) {
  return request({
    url: '/member/login',
    method: 'post',
    data: params
  })
}
