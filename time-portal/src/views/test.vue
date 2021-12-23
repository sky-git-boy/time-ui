<template lang="html">
  <div class="vx-card mb-4 no-gutter w-full justify-center" style="padding: 25px">
    <vs-tabs alignment="center">
      <vs-tab label="总览" @click="handleClick1(0)"/>
      <vs-tab label="任务" @click="handleClick2(1)"/>
    </vs-tabs>
    <div v-show="!flag">
      <vs-card>
        <div id="chart" />
      </vs-card>
    </div>
    <div v-show="flag">
      <vs-card>
        <div id="pieChart" />
      </vs-card>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  components: {
    apexchart: ApexCharts
  },
  data: function() {
    return {
      testdata: [10, 21, 2, 3, 2],
      flag: false,
      click1Count: 0,
      click2Count: 0
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      var options = {
        series: [{
          name: 'Desktops',
          data: this.testdata
        }],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      }

      var chart = new ApexCharts(document.querySelector('#chart'), options)
      chart.render()
    },
    initPieData() {
      var options = {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }

      var chart = new ApexCharts(document.querySelector('#pieChart'), options)
      chart.render()
    },
    handleClick1() {
      this.flag = false
      if (this.click1Count == 0) {
        this.initData()
        this.click1Count++
      }
    },
    handleClick2() {
      this.flag = true
      if (this.click2Count == 0) {
        this.initPieData()
        this.click2Count++
      }
    }
  }
}
</script>

<style>
</style>
