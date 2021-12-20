import request from '@/utils/request'

// 获取轮播图
export function slide() {
  return request({
    url: '/admin/slide/listSlideForPage',
    method: 'get'
  })
}
