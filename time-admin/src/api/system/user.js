import request from '@/utils/request'

// 分页查询
export function listUserForPage(query) {
  return request({
    url: '/admin/user/listUserForPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addUser(data) {
  return request({
    url: '/admin/user/addUser',
    method: 'post',
    data: data
  })
}
// 修改
export function updateUser(data) {
  return request({
    url: '/admin/user/updateUser',
    method: 'put',
    data: data
  })
}
// 删除
export function deleteUserByIds(id) {
  return request({
    url: '/admin/user/deleteUserByIds/' + id,
    method: 'delete'
  })
}
// 查询一个
export function getUserById(id) {
  return request({
    url: '/admin/user/getUserById/' + id,
    method: 'get'
  })
}
// 重置用户密码
export function resetPwd(userId) {
  return request({
    url: '/admin/user/resetPwd/' + userId,
    method: 'put'
  })
}
