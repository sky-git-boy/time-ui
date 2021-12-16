import request from '@/utils/request'

// 分页查询
export function listNoticeForPage(query) {
  return request({
    url: '/admin/notice/listNoticeForPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addNotice(data) {
  return request({
    url: '/admin/notice/addNotice',
    method: 'post',
    data: data
  })
}

// 修改
export function updateNotice(data) {
  return request({
    url: '/admin/notice/updateNotice',
    method: 'put',
    data: data
  })
}
// 删除
export function deleteNoticeByIds(id) {
  return request({
    url: '/admin/notice/deleteNoticeByIds/' + id,
    method: 'delete'
  })
}
// 查询一个
export function getNoticeById(id) {
  return request({
    url: '/admin/notice/getNoticeById/' + id,
    method: 'get'
  })
}

