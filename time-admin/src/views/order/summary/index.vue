<template>
  <div class="app-container">
    <!-- 选择月份开始 -->
    <el-card class="box-card" style="padding: 18px;">
      <span style="font-weight: bold">统计月份</span>
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="请选择统计月份"/>
    </el-card>
    <!-- 选择月份结束 -->

    <!-- 金额汇总开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>金额汇总</span>
      </div>
      <div style="padding: 14px;">
        <el-row style="flex: 1;">
          <el-col :span="8">
            <el-card class="body-card">
              <div style="padding: 14px;">
                <span>上月收入(元)</span>
                <div class="bottom clearfix">
                  <span>0.00</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="body-card">
              <div style="padding: 14px;">
                <span>本月收入(元)</span>
                <div class="bottom clearfix">
                  <span>0.00</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="body-card">
              <div style="padding: 14px;">
                <span>收入比(元)</span>
                <div class="bottom clearfix">
                  <span>0.00</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card style="margin-top: 25px;">
          <div style="padding: 14px;">
            <span>总收入</span>
            <div class="bottom clearfix">
              <span>0.00</span>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
    <!-- 金额汇总结束 -->

    <!-- 收入清单开始 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>收入清单</span>
      </div>
    </el-card>
    <!-- 收入清单结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: undefined
    }
  }
}
</script>

<style>
  .box-card {
    padding: 18px 0;
    margin-bottom: 20px
  }
  .body-card {
    width: 300px;
  }
</style>
