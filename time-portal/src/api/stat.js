import request from '@/utils/request'

export function getPieChart() {
  return request({
    url: '/statistic/portal/pieChart',
    method: 'get'
  })
}

export function getColumnChart() {
  return request({
    url: '/statistic/portal/columnChart',
    method: 'get'
  })
}

export function getLineChartSimple() {
  return request({
    url: '/statistic/portal/lineChartSimple',
    method: 'get'
  })
}

export function getMixedChart() {
  return request({
    url: '/statistic/portal/mixedChart',
    method: 'get'
  })
}

export function getRewardInfo(query) {
  return request({
    url: '/member/reward/list',
    method: 'get',
    params: query
  })
}
