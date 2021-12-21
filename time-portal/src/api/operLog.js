import request from '@/utils/request'

// todo看板
export function operInfo() {
  return request({
    url: '/admin/operLog/memberGetLog',
    method: 'get'
  })
}
