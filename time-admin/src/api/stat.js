import request from '@/utils/request'

export function getLineChart() {
  return request({
    url: '/statistic/backend/lineChart',
    method: 'get'
  })
}

export function getAllCount() {
  return request({
    url: '/statistic/backend/getAllCount',
    method: 'get'
  })
}

export function getPieChart() {
  return request({
    url: '/statistic/backend/pieChart',
    method: 'get'
  })
}

export function getSystemChart() {
  return request({
    url: '/statistic/backend/systemChart',
    method: 'get'
  })
}

export function getBarChart() {
  return request({
    url: '/statistic/backend/barChart',
    method: 'get'
  })
}

export function orderStatusChart(data) {
  return request({
    url: '/statistic/backend/orderStatusChart',
    method: 'get',
    params: data
  })
}

export function orderTypeChart(data) {
  return request({
    url: '/statistic/backend/orderTypeChart',
    method: 'get',
    params: data
  })
}

export function orderCount(data) {
  return request({
    url: '/statistic/backend/orderCount',
    method: 'get',
    params: data
  })
}
