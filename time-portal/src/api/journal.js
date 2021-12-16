import request from "@/utils/request";

// 分页查询
export function listJournalForPage(query) {
  return request({
    url: '/member/journal/list',
    method: 'get',
    params: query
  })
}

// 添加
export function addJournal(data) {
  return request({
    url: '/member/journal/add',
    method: 'post',
    data: data
  })
}

// 修改
export function updateJournal(data) {
  return request({
    url: '/member/journal/update',
    method: 'put',
    data: data
  })
}

// 查询一个
export function getJournalById(id) {
  return request({
    url: '/member/journal/getOne/' + id,
    method: 'get'
  })
}
