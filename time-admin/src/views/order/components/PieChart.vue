<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  // 取父页面传过来的数据
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
    },
    propPieData: {
      type: Object,
      default() {
        return { title: '收支概况', data: [{ value: 320, name: '收费金额' }, { value: 240, name: '退费金额' }]
        }
      }
    }
  },
  data() {
    return {
      chart: null,
      pieData: this.propPieData
    }
  },
  watch: {
    propPieData: {
      immediate: true,
      handler(val) {
        console.log(val)
        this.pieData = val
        this.$nextTick(() => {
          this.initChart()
        })
      }
    }
  },
  mounted() {
    this.pieData = this.propPieData
    this.$nextTick(() => {
      this.initChart()
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
        title: {
          text: this.pieData.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.pieData.data
        },
        series: [
          {
            name: this.pieData.title,
            type: 'pie',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: this.pieData.data,
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
