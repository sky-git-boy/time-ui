<template>
  <div id="container" style="width:100%; height: 300px"/>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      blogContributeCount: [
        ['2021-11-01', '1'],
        ['2021-11-02', '1'],
        ['2021-11-03', '0'],
        ['2021-11-04', '5'],
        ['2021-11-05', '2']
      ]
    }
  },
  mounted() {
    this.initDate()
  },
  created() {},
  methods: {
    initDate: function() {
      const chart = echarts.init(document.getElementById('container'))

      const option = {
        // 设置背景
        // backgroundColor: '#d0d0d0',

        title: {
          top: 30,
          text: '完成数',
          subtext: '一年内完成事项的数量',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.data[0] + '<br>事项数：' + params.data[1]
          }
        },
        legend: {
          top: '40',
          left: '100',
          data: ['事项数', 'Top 12'],
          textStyle: {
            // 设置字体颜色
            color: '#000'
          }
        },
        calendar: [
          {
            top: 120,
            left: 'center',
            range: '2021',
            splitLine: {
              show: true,
              lineStyle: {
                // 设置月份分割线的颜色
                color: 'rgb(248,248,248)',
                width: 4,
                type: 'solid'
              }
            },
            yearLabel: { show: false },
            dayLabel: {
              nameMap: ['一', '二', '三', '四', '五', '六', '日'], // 设置中文显示
              textStyle: {
                // 设置周显示颜色
                color: '#000'
              }
            },
            monthLabel: {
              nameMap: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
              ], // 设置中文显示
              textStyle: {
                // 设置月显示颜色
                color: '#000'
              }
            },
            itemStyle: {
              normal: {
                // 设置背景颜色
                color: 'rgb(238,238,238)',
                borderWidth: 1,
                // 设置方块分割线段颜色
                borderColor: 'rgb(255,255,255)'
              }
            }
          }
        ],
        series: [
          {
            name: '事项数',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: this.blogContributeCount,
            // 根据值设置原点大小
            symbolSize: function(val) {
              if (val[1] == 0) {
                return val[1]
              } else {
                let size = 8 + val[1] * 2
                if (size > 18) {
                  size = 18
                }
                return size
              }
            },
            itemStyle: {
              normal: {
                // 设置圆点颜色
                color: 'rgb(148,139,242)'
              }
            }
          }
        ]
      }

      chart.setOption(option)
      // window.onresize = chart.resize;
    }
  }
}
</script>
