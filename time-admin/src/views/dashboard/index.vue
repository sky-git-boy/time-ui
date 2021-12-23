<template>
  <div class="dashboard-editor-container">

    <panel-group :all-count="allCount" @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <system-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import SystemChart from './components/SystemChart'
import BarChart from './components/BarChart'
import { getLineChart, getAllCount } from '@/api/stat.js'

const lineChartData = {
  newVisitis: {
    days: ['一', '二', '三', '四', '五', '六', '日'],
    expectedData: [10, 12, 11, 13, 10, 8, 10],
    actualData: [0, 0, 0, 0, 0, 0, 0]
  },
  messages: {
    days: ['一', '二', '三', '四', '五', '六', '日'],
    expectedData: [20, 19, 12, 14, 16, 13, 14],
    actualData: [0, 0, 0, 0, 0, 0, 0]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart,
    SystemChart
  },
  data() {
    return {
      allCount: {},
      lineChartData: lineChartData.newVisitis
    }
  },
  created() {
    getLineChart().then(res => {
      var data = res.data
      lineChartData.newVisitis.actualData = data.loginCount
      lineChartData.messages.actualData = data.smsCount
      lineChartData.newVisitis.days = data.days
      lineChartData.messages.days = data.days
    })
    getAllCount().then(res => {
      this.allCount = res.data
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
