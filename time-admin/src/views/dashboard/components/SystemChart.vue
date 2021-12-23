<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getSystemChart } from '@/api/stat'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      noticeCount: 0,
      slideCount: 0,
      musicCount: 0,
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      getSystemChart().then(res => {
        this.noticeCount = res.data.noticeCount
        this.slideCount = res.data.slideCount
        this.musicCount = res.data.musicCount
        this.initChart()
      }).catch(e => {
        this.initChart()
      })
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['公告', '轮播图', '白噪音']
        },
        series: [
          {
            name: '总数',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.noticeCount, name: '公告' },
              { value: this.slideCount, name: '轮播图' },
              { value: this.musicCount, name: '白噪音' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
