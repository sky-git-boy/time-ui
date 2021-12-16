import request from '@/utils/request'
// 分页查询
export function listForPage(query) {
  return request({
    url: '/admin/smsLog/listSmsForPage',
    method: 'get',
    params: query
  })
}
// 通过id删除
export function deleteSmsByIds(ids) {
  return request({
    url: '/admin/smsLog/deleteSmsByIds/' + ids,
    method: 'delete'
  })
}

