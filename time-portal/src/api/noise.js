import request from '@/utils/request'

// 查询
export function getNoiseList(params) {
  return request({
    url: '/admin/music/listMusicForPage',
    method: 'get',
    params: params
  })
}
