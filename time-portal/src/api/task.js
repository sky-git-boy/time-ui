import request from '@/utils/request'

// todo看板
export function kanBan(query) {
  return request({
    url: '/member/task/kanBan',
    method: 'get',
    params: query
  })
}

// 添加
export function addTask(data) {
  return request({
    url: '/member/task/add',
    method: 'post',
    data: data
  })
}

// 修改
export function updateTask(data) {
  return request({
    url: '/member/task/update',
    method: 'put',
    data: data
  })
}

// 查询一个
export function getTaskById(id) {
  return request({
    url: '/member/task/getOne/' + id,
    method: 'get'
  })
}

// 删除
export function delTask(id) {
  return request({
    url: '/member/task/delete/' + id,
    method: 'delete'
  })
}
