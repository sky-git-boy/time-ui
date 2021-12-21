import request from '@/utils/request'

// 分页查询
export function listSlideForPage(query) {
  return request({
    url: '/admin/slide/listSlideForPage',
    method: 'get',
    params: query
  })
}

// 添加
export function addSlide(data) {
  return request({
    url: '/admin/slide/addSlide',
    method: 'post',
    data: data
  })
}

// 修改
export function updateSlide(data) {
  return request({
    url: '/admin/slide/updateSlide',
    method: 'put',
    data: data
  })
}
// 删除
export function deleteSlideByIds(slideIds) {
  return request({
    url: '/admin/slide/deleteSlideByIds/' + slideIds,
    method: 'delete'
  })
}
// 查询一个
export function getSlideById(slide) {
  return request({
    url: '/admin/slide/getSlideById/' + slide,
    method: 'get'
  })
}
