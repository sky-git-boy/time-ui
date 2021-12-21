import request from '@/utils/request'

// 分页查询
export function listEvent(query) {
  return request({
    url: '/member/event/list',
    method: 'get',
    params: query
  })
}

// 添加
export function addEvent(data) {
  return request({
    url: '/member/event/add',
    method: 'post',
    data: data
  })
}

// 修改
export function updateEvent(data) {
  return request({
    url: '/member/event/update',
    method: 'put',
    data: data
  })
}

// 查询一个
export function getEventById(id) {
  return request({
    url: '/member/event/getOne/' + id,
    method: 'get'
  })
}

// 删除
export function deleteEvent(id) {
  return request({
    url: '/member/event/delete/' + id,
    method: 'delete'
  })
}
