<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getPieChart } from '@/api/stat'

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
      taskCount: 0,
      journalCount: 0,
      evenCount: 0,
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      getPieChart().then(res => {
        this.taskCount = res.data.taskCount
        this.journalCount = res.data.journalCount
        this.evenCount = res.data.evenCount
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
          data: ['任务', '自省', '事件']
        },
        series: [
          {
            name: '总数',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.taskCount, name: '任务' },
              { value: this.journalCount, name: '自省' },
              { value: this.evenCount, name: '事件' }
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
