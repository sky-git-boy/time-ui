import request from '@/utils/request'

// 发送注册用户验证码
export function sendRegisterMail(phone) {
  return request({
    url: '/member/register/sendRegisterMail',
    method: 'post',
    params: phone
  })
}

// 注册用户
export function register(data) {
  return request({
    url: '/member/register',
    method: 'post',
    data: data
  })
}
