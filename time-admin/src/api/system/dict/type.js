import request from '@/utils/request'
// 分页查询字典类型
export function listForPage(query) {
  return request({
    url: '/admin/dict/type/listForPage',
    method: 'get',
    params: query
  })
}
// 添加字典类型
export function addDictType(data) {
  return request({
    url: '/admin/dict/type/addDictType',
    method: 'post',
    data: data
  })
}
// 根据字典类型ID查询一个字典信息
export function getDictTypeById(dictId) {
  return request({
    url: '/admin/dict/type/getOne/' + dictId,
    method: 'get'
  })
}
// 更新字典类型数据
export function updateDictType(data) {
  return request({
    url: '/admin/dict/type/updateDictType',
    method: 'put',
    data: data
  })
}
// 删除字典类型
export function deleteDictTypeByIds(dictId) {
  return request({
    url: '/admin/dict/type/deleteDictTypeByIds/' + dictId,
    method: 'delete'
  })
}
// 查询所有字典类型数据
export function selectAllDictType() {
  return request({
    url: '/admin/dict/type/selectAllDictType',
    method: 'get'
  })
}
