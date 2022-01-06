<template>
  <div>
    <vs-card>
      <div id="test"/>
    </vs-card>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  mounted() {
    this.initData()
  },
  created() {
  },
  methods: {
    initRewardChart() {
      var options = {
        series: [
          {
            name: '奖励数',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            color: '#28C76F'
          }, {
            name: '惩罚数',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            color: '#FFB200'
          }],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        fill: {
          opacity: 1
        }
      }
      var chart = new ApexCharts(document.querySelector('#test'), options)
      chart.render()
    }
  }
}
</script>

<style>

</style>
