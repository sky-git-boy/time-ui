<template>
  <div class="app-container">
    <!-- 查询条件开始 -->
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="88px">
      <el-form-item label="收费编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入收费编号"
          clearable
          size="small"
          style="width:240px"
        />
      </el-form-item>
      <el-form-item label="收费项目" prop="orderItem">
        <el-select
          v-model="queryParams.orderItem"
          placeholder="一个月"
          clearable
          size="small"
          style="width:240px"
        >
          <el-option
            v-for="dict in orderItemOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收费类型" prop="orderType">
        <el-select
          v-model="queryParams.orderType"
          placeholder="微信"
          clearable
          size="small"
          style="width:240px"
        >
          <el-option
            v-for="dict in orderTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收费状态" prop="orderStatus">
        <el-select
          v-model="queryParams.orderStatus"
          placeholder="未支付"
          clearable
          size="small"
          style="width:240px"
        >
          <el-option
            v-for="dict in orderStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收费时间">
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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询条件结束 -->

    <!-- 表格工具按钮开始 -->
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-download" size="mini" @click="handleDownLoad">导出</el-button>
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->

    <!-- 数据表格开始 -->
    <el-table v-loading="loading" :data="orderTableList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="收费ID" align="center" prop="orderId" />
      <el-table-column label="收费项目" align="center" prop="orderItem" />
      <el-table-column label="总金额" align="center" prop="orderAmount" />
      <el-table-column label="收费状态" align="center" prop="orderStatus" />
      <el-table-column label="收费类型" align="center" prop="orderType" />
      <el-table-column label="用户" align="center" prop="userId" />
      <el-table-column label="收费时间" align="center" prop="payTime" width="200" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="200" />
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据表格结束 -->
    <!-- 分页控件开始 -->
    <el-pagination
      :current-page="queryParams.pageNum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="queryParams.pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 分页控件结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否启用遮罩层
      loading: false,
      // 分页数据总条数
      total: 0,
      // 订单表格数据
      orderTableList: [],
      // 收费项目数据字典
      orderItemOptions: [],
      // 收费状态数据字典
      orderStatusOptions: [],
      // 收费类型数据字典
      payTypeOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderItem: undefined,
        orderId: undefined,
        createBy: undefined,
        orderStatus: undefined,
        payType: undefined
      }
    }
  },
  // 勾子
  created() {

  },
  // 方法
  methods: {

  }
}
</script>

<style>

</style>
