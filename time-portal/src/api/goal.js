import request from '@/utils/request'

// 修改
export function updateGoal(data) {
  return request({
    url: '/member/goal/update',
    method: 'put',
    data: data
  })
}

// 查询一个
export function getGoal() {
  return request({
    url: '/member/goal/getByUser',
    method: 'get'
  })
}

// 添加
export function addGoal(data) {
  return request({
    url: '/member/goal/insert',
    method: 'post',
    data: data
  })
}

