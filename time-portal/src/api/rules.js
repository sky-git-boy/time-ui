import request from '@/utils/request'

export function rulesList() {
  return request({
    url: '/member/rules/list',
    method: 'get'
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/member/rules/saveOrUpdate',
    method: 'post',
    data: data
  })
}

export function deleteRules(id) {
  return request({
    url: '/member/rules/delete/' + id,
    method: 'delete'
  })
}
