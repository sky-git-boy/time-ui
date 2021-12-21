import request from '@/utils/request'

// 分页查询
export function listMusicForPage(query) {
  return request({
    url: '/admin/music/listMusicForPage',
    method: 'get',
    params: query
  })
}

// 添加
export function addMusic(data) {
  return request({
    url: '/admin/music/addMusic',
    method: 'post',
    data: data
  })
}

// 修改
export function updateMusic(data) {
  return request({
    url: '/admin/music/updateMusic',
    method: 'put',
    data: data
  })
}
// 删除
export function deleteMusicByIds(musicIds) {
  return request({
    url: '/admin/music/deleteMusicByIds/' + musicIds,
    method: 'delete'
  })
}
// 查询一个
export function getMusicById(music) {
  return request({
    url: '/admin/music/getMusicById/' + music,
    method: 'get'
  })
}
