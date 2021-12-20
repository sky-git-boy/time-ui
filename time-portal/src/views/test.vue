<template>
  <div id="simple-calendar-app">
    <div class="vx-card" style="padding: 25px">
      <div slot="header" class="mb-4">
        <div class="no-gutter">
          <div class="w-full flex justify-center">
            <vs-tabs alignment="center">
              <vs-tab label="总览">
                <vs-row style="padding-top: 15px">
                  <vs-col type="flex" vs-w="6">
                    <vs-card style="height: 285px"/>
                  </vs-col>
                  <vs-col vs-w="6">
                    <vs-card>
                      <vue-apex-charts :options="lineChartSimple.chartOptions" :series="lineChartSimple.series" type="line" height="250px"/>
                    </vs-card>
                  </vs-col>
                </vs-row>
                <vs-row style="padding-top: 15px">
                  <vs-col type="flex" vs-w="6">
                    <vs-card>
                      <vue-apex-charts :options="columnChart.chartOptions" :series="columnChart.series" type="bar" height="237px"/>
                    </vs-card>
                  </vs-col>
                  <vs-col vs-w="6">
                    <vs-card>
                      <vue-apex-charts :options="pieChart.chartOptions" :series="pieChart.series" type="pie" height="250px"/>
                    </vs-card>
                  </vs-col>
                </vs-row>
              </vs-tab>
              <vs-tab label="任务">
                <vs-row style="padding-top: 15px">
                  <vs-col type="flex" vs-w="6">
                    <vs-card style="height: 285px"/>
                  </vs-col>
                  <vs-col vs-w="6">
                    <vs-card>
                      <vue-apex-charts :options="lineChartSimple.chartOptions" :series="lineChartSimple.series" type="line" height="250px"/>
                    </vs-card>
                  </vs-col>
                </vs-row>
                <vs-row style="padding-top: 15px">
                  <vs-col type="flex" vs-w="6">
                    <vs-card>
                      <vue-apex-charts :options="columnChart.chartOptions" :series="columnChart.series" type="bar" height="237px"/>
                    </vs-card>
                  </vs-col>
                  <vs-col vs-w="6">
                    <vs-card>
                      <vue-apex-charts :options="pieChart.chartOptions" :series="pieChart.series" type="pie" height="250px"/>
                    </vs-card>
                  </vs-col>
                </vs-row>
              </vs-tab>
            </vs-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    VueApexCharts
  },
  data() {
    return {
      themeColors: ['#FF9F43', '#28C76F', '#EA5455', '#87ceeb', '#7367F0'],
      lineChartSimple: {
        series: [{
          name: 'Desktops',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
          chart: {
            height: 350,
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
            text: '最近已完成趋势',
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
      },
      pieChart: {
        series: [44, 55, 13, 43],
        chartOptions: {
          labels: ['Team A', 'Team B', 'Team C', 'Team D'],
          colors: this.themeColors,
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
      },
      columnChart: {
        series: [{
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }],
        chartOptions: {
          colors: this.themeColors,
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '55%'
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
          yaxis: {
            title: {
              text: '$ (thousands)'
            }
          },
          fill: {
            opacity: 1

          },
          tooltip: {
            y: {
              formatter: function(val) {
                return '$ ' + val + ' thousands'
              }
            }
          }
        }
      }

    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
