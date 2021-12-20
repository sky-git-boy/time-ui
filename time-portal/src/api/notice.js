import request from '@/utils/request'

// 获取消息
export function notice() {
  return request({
    url: '/admin/notice/listNoticeForPage',
    method: 'get'
  })
}
