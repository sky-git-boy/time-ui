import request from '@/utils/request'

// 发送重置密码验证码
export function sendResetMail(phone) {
  return request({
    url: '/member/reset/sendResetMail',
    method: 'post',
    params: phone
  })
}

// 重置密码
export function resetPwd(data) {
  return request({
    url: '/member/reset/resetPwd',
    method: 'post',
    data: data
  })
}
