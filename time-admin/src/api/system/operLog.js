import request from '@/utils/request'
// 分页查询
export function listForPage(query) {
  return request({
    url: '/admin/operLog/listForPage',
    method: 'get',
    params: query
  })
}
// 通过id删除登录日志
export function deleteOperLogByIds(ids) {
  return request({
    url: '/admin/operLog/deleteOperLogByIds/' + ids,
    method: 'delete'
  })
}
// 清空
export function clearAllOperLog() {
  return request({
    url: '/admin/operLog/clearAllOperLog',
    method: 'delete'
  })
}
