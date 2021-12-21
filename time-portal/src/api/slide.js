import request from '@/utils/request'

// 获取轮播图
export function slide(params) {
  return request({
    url: '/admin/slide/listSlideForPage',
    method: 'get',
    params: params
  })
}
