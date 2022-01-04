<template>
  <div class="vx-card mb-4 no-gutter w-full justify-center" style="padding: 25px">
    <vs-tabs alignment="center">
      <vs-tab label="总览" @click="handleClick1()"/>
      <vs-tab label="任务" @click="handleClick2()"/>
      <vs-tab label="奖惩" @click="handleClick3()"/>
    </vs-tabs>
    <div v-show="activeAll">
      <vs-card>
        <div id="mixChart" />
      </vs-card>
    </div>

    <div v-show="activeTask">
      <vs-row style="padding-top: 15px">
        <vs-col type="flex" vs-w="6">
          <vx-card class="text-center bg-primary-gradient greet-user" style="height: 272px">
            <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
            <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
            <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svg-classes="h-8 w-8"/>
            <h1 class="mb-6 text-white">{{ user_displayName }},</h1>
            <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">您已经完成 <strong>{{ pieData[2] }}件</strong> 待办任务！！！ </p>
            <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">延长生命最好的办法，是从夜里偷取一个小时，来弥补白天的不够。</p>
          </vx-card>
        </vs-col>
        <vs-col vs-w="6">
          <vs-card>
            <div id="lineChart" />
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-row style="padding-top: 15px">
        <vs-col type="flex" vs-w="6">
          <vs-card>
            <div id="columnChart" />
          </vs-card>
        </vs-col>
        <vs-col vs-w="6">
          <vs-card>
            <div id="pieChart" />
          </vs-card>
        </vs-col>
      </vs-row>
    </div>

    <div v-show="activeReward">
      <vs-row>
        <vs-col type="flex" vs-w="6">
          <vx-card title="奖励">
            <vx-timeline :data="rewardData"/>
          </vx-card>
        </vs-col>
        <vs-col vs-w="6">
          <vx-card title="惩罚">
            <vx-timeline :data="punishData"/>
          </vx-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import { getPieChart, getColumnChart, getLineChartSimple, getMixedChart, getRewardInfo } from '@/api/stat'
import VxTimeline from '@/components/timeline/VxTimeline.vue'
export default {
  components: {
    VxTimeline
  },
  data() {
    return {
      lineData: [],
      lineDays: [],

      pieData: [],

      columnData: [],
      columnDays: [],

      months: [],
      taskCountM: [],
      eventCountM: [],
      journalCountM: [],

      rewardData: [
        {
          id: '0',
          type: '0',
          content: 'Task1 Finished',
          createTime: '2022-01-03 13:00:38'
        },
        {
          id: '1',
          type: '0',
          content: 'Task2 Finished',
          createTime: '2022-01-03 13:00:38'
        }
      ],

      punishData: [
        {
          id: '2',
          type: '1',
          content: 'Task1 Update Found',
          createTime: '2022-01-03 13:00:38'
        },
        {
          id: '3',
          type: '1',
          content: 'Task2 Update Found',
          createTime: '2022-01-03 13:00:38'
        }
      ],

      activeAll: true,
      activeTask: false,
      activeReward: false,

      flag: false,
      click1Count: 0,
      click2Count: 0,

      query: {
        type: '0'
      }
    }
  },
  computed: {
    // PROFILE
    user_displayName() {
      return JSON.parse(localStorage.getItem('userInfo')).displayName
    }
  },
  mounted() {
    getMixedChart().then(res => {
      this.months = res.data.months
      this.taskCountM = res.data.taskCountM
      this.eventCountM = res.data.eventCountM
      this.journalCountM = res.data.journalCountM
      this.initMixChart()
    }).catch(e => {
      this.initMixChart()
    })
  },
  created() {
    getLineChartSimple().then(res => {
      this.lineData = res.data.count
      this.lineDays = res.data.days
    })
    getPieChart().then(res => {
      this.pieData = res.data.statusCount
    })
    getColumnChart().then(res => {
      this.columnData = res.data.count
      this.columnDays = res.data.days
    })
    getRewardInfo(this.query).then(res => {
      this.rewardData = res.data
    })
    this.query = { type: '1' }
    getRewardInfo(this.query).then(res => {
      this.punishData = res.data
    })
  },
  methods: {
    initMixChart() {
      var options = {
        series: [{
          name: '个人任务',
          type: 'column',
          data: this.taskCountM
        }, {
          name: '个人日记',
          type: 'area',
          data: this.journalCountM
        }, {
          name: '日历事件',
          type: 'line',
          data: this.eventCountM
        }],
        chart: {
          height: 500,
          type: 'line',
          stacked: false
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },

        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: this.months,
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: ''
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0)
              }
              return y
            }
          }
        }
      }

      var chart = new ApexCharts(document.querySelector('#mixChart'), options)
      chart.render()
    },

    initLineChart() {
      var options = {
        series: [{
          name: '完成数',
          data: this.lineData
        }],
        chart: {
          height: 240,
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
          text: '最近已完成趋势',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 1
          }
        },
        xaxis: {
          categories: this.lineDays
        }
      }
      var chart = new ApexCharts(document.querySelector('#lineChart'), options)
      chart.render()
    },

    initPieChart() {
      var options = {
        series: this.pieData,
        chart: {
          height: 260,
          width: 380,
          type: 'pie'
        },
        title: {
          text: '各状态数',
          align: 'left'
        },
        labels: ['待办', '进行中', '已完成', '已过期'],
        responsive: [{
          breakpoint: 380,
          options: {
            chart: {
              width: 380
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

    initColumnChart() {
      var options = {
        series: [{
          name: '任务数',
          data: this.columnData
        }],
        chart: {
          type: 'bar',
          height: 250
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        title: {
          text: '近七日任务数',
          align: 'left'
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
          categories: this.columnDays
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val
            }
          }
        }
      }

      var chart = new ApexCharts(document.querySelector('#columnChart'), options)
      chart.render()
    },

    handleClick1() {
      this.activeAll = true
      this.activeTask = false
      this.activeReward = false
      if (this.click1Count == 0) {
        this.initMixChart()
        this.click1Count++
      }
    },
    handleClick2() {
      this.activeAll = false
      this.activeTask = true
      this.activeReward = false
      if (this.click2Count == 0) {
        this.initLineChart()
        this.initPieChart()
        this.initColumnChart()
        this.click2Count++
      }
    },
    handleClick3() {
      this.activeAll = false
      this.activeTask = false
      this.activeReward = true
    }
  }
}
</script>

<style lang="scss">
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
</style>
