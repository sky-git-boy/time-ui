<template>
  <div v-loading="loading" class="app-container">
    <div style="color:red;text-align:center">*注意默认只查询当天的统计数据，如果要查询其它的，请选择范围查询</div>
    <br>
    <!-- 查询条件开始 -->
    <el-card class="cardmargin">
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="dateRange"
            size="small"
            style="width:240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 查询条件结果 -->
    <el-card class="cardmargin">
      合计收入:￥<span>{{ totalRevenue }}</span>
    </el-card>
    <!-- 图表开始 -->
    <el-card>
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12">
          <div>
            <pie-chart ref="p1" :prop-pie-data="revenueOverview" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div>
            <pie-chart ref="p2" :prop-pie-data="incomeChanel" />
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 图表结束 -->

  </div>
</template>

<script>
import PieChart from './components/PieChart'
import { orderStatusChart, orderTypeChart, orderCount } from '@/api/stat'

export default {
  components: {
    PieChart
  },
  data() {
    return {
      // 遮罩
      loading: false,
      // 查询参数
      queryParams: {},
      // 日期范围
      dateRange: undefined,
      // 数组结构
      totalRevenue: 0.00, // 合计收入
      // 声明图表的数据
      revenueOverview: { // 收支概况
        title: '订单状态',
        data: [
          { name: '已支付', value: 4 },
          { name: '未支付', value: 2 }
        ]
      },
      incomeChanel: { // 收入渠道
        title: '订单类型',
        data: [
          { name: '一个月', value: 1 },
          { name: '半年', value: 1 },
          { name: '一年', value: 1 },
          { name: '永久', value: 1 }
        ]
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      var search = this.addDateRange(this.queryParams, this.dateRange)
      orderCount(search).then(res => {
        this.totalRevenue = res.data
        orderTypeChart(search).then(res => {
          this.revenueOverview.data = res.data
          orderStatusChart(search).then(res => {
            this.incomeChanel.data = res.data
            this.loading = false
          })
        })
      })
    },
    handleQuery() {
      this.loadData()
    },
    resetQuery() {
      this.resetForm('queryForm')
      this.dateRange = []
      this.loadData()
    }
  }
}
</script>
<style  scoped>
  .cardmargin{
    margin-bottom: 3px;
  }
  .spancls{
    display: inline-block;
    margin-left: 80px;
  }
  .spanred{
    color: red;
  }
</style>
