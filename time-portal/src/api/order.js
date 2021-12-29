import request from '@/utils/request'

// 创建订单
export function createOrder(data) {
  return request({
    url: '/member/order/createOrder',
    method: 'post',
    data: data
  })
}

// 获取订单
export function getOrder(data) {
  return request({
    url: '/member/order/getOrder',
    method: 'get',
    params: data
  })
}
