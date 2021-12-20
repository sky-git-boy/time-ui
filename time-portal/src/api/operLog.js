import request from '@/utils/request'

// todo看板
export function operInfo(query) {
  return request({
    url: '/admin/operLog/listForPage',
    method: 'get',
    params: query
  })
}
