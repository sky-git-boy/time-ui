<template>
  <div class="app-container">
    <!-- 查询条件开始 -->
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="88px">
      <el-form-item label="音乐名称" prop="musicName">
        <el-input
          v-model="queryParams.musicName"
          placeholder="请输入名称"
          clearable
          size="small"
          style="width:200px"
        />
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="正常"
          clearable
          size="small"
          style="width:200px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button :disabled="single" type="success" icon="el-icon-edit" size="mini" @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button :disabled="multiple" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>
    <!-- 表格工具按钮结束 -->

    <!-- 数据表格开始 -->
    <el-table v-loading="loading" :data="musicTableList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="白噪音Id" align="center" prop="musicId" width="120px" />
      <el-table-column label="名称" align="center" prop="musicName" />
      <el-table-column label="音频" prop="musicUrl" align="center" >
        <template slot-scope="scope">
          <el-popover
            ref="popover5"
            placement="top"
          >
            <audio controls>
              <source :src="scope.row.musicUrl">
            </audio>
          </el-popover>
          <el-button v-popover:popover5>音频</el-button>
        </template>
      </el-table-column>
      <el-table-column label="背景图" prop="picUrl" align="center" >
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" class="logoImg">
        </template>
      </el-table-column>
      <el-table-column :formatter="statusFormatter" label="状态" prop="status" align="center" width="133px" />
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180px" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 添加修改弹出层开始 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="600px"
      center
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  :value="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="musicName">
              <el-input v-model="form.musicName" placeholder="请输入名称" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="音频" prop="musicUrl">
              <!-- 上传音频 -->
              <el-upload
                :headers="headers"
                :on-remove="handleRemove2"
                :file-list="fileList3"
                :on-success="handleUploadSuccess2"
                :on-error="handleUploadError"
                class="upload-demo"
                name="file"
                action="admin/upload/image"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 上传图片 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片" prop="picUrl">
              <el-upload
                :headers="headers"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                action="admin/upload/image"
                accept="image/*"
                name="file"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加修改弹出层结束 -->
  </div>
</template>

<script>

// 引入api
import { listMusicForPage, addMusic, updateMusic, getMusicById, deleteMusicByIds } from '@/api/music'
export default {
  // 定义页面数据
  data() {
    return {
      // 是否启用遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 分页数据总条数
      total: 0,
      // 字典表格数据
      musicTableList: [],
      // 弹出层标题
      title: '',
      url: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: undefined,
        musicName: undefined
      },
      // 表单数据
      form: {
        picUrl: undefined,
        musicUrl: undefined,
        musicName: undefined,
        status: '0'
      },
      // 声明上传路径
      uploadPath: undefined,
      // 控件里面的文件列表
      fileList: [],
      // 音频
      fileList3: [],
      // 头
      headers: {
        Authorization: sessionStorage.token
      },
      // 文件列表的json对象
      fileListJsonObj: [],
      fileListJsonObj2: []
    }
  },
  // 勾子
  created() {
    // 使用全局的根据字典类型查询字典数据的方法查询字典数据
    this.getDataByType('sys_normal_disable').then(res => {
      this.statusOptions = res.data
    })
    // 查询表格数据
    this.getMusicList()
  },
  // 方法
  methods: {
    // 查询表格数据
    getMusicList() {
      this.loading = true // 打开遮罩
      listMusicForPage(this.queryParams).then(res => {
        this.musicTableList = res.data
        this.total = res.total
        this.loading = false// 关闭遮罩
      })
    },
    // 条件查询
    handleQuery() {
      this.getMusicList()
    },
    // 重置查询条件
    resetQuery() {
      this.resetForm('queryForm')
      this.getMusicList()
    },
    // 数据表格的多选择框选择时触发
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.musicId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 分页pageSize变化时触发
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      // 重新查询
      this.getMusicList()
    },
    // 点击上一页  下一页，跳转到哪一页面时触发
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      // 重新查询
      this.getMusicList()
    },
    // 翻译状态
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 打开添加的弹出层
    handleAdd() {
      this.open = true
      this.reset()
      this.title = '添加轮播图'
    },
    // 打开修改的弹出层
    handleUpdate(row) {
      this.title = '修改轮播图'
      const music = row.musicId || this.ids
      this.open = true
      this.reset()
      // 根据music查询一个
      this.loading = true
      getMusicById(music).then(res => {
        this.form = res.data
        this.form.status = res.data.status
        this.fileList = [{ 'url': res.data.picUrl }]
        this.loading = false
      })
    },
    // 执行删除
    handleDelete(row) {
      const musics = row.musicId || this.ids
      this.$confirm('此操作将永久删除该白噪音, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteMusicByIds(musics).then(res => {
          this.loading = false
          this.msgSuccess('删除成功')
          this.getMusicList()// 全查询
        }).catch(() => {
          this.msgError('删除失败')
          this.loading = false
        })
      }).catch(() => {
        this.msgError('删除已取消')
        this.loading = false
      })
    },
    // 保存
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 做添加
          this.loading = true
          if (this.form.musicId === undefined) {
            addMusic(this.form).then(res => {
              this.msgSuccess('保存成功')
              this.loading = false
              this.getMusicList()// 列表重新查询
              this.open = false// 关闭弹出层
            }).catch(() => {
              this.loading = false
            })
          } else { // 做修改
            updateMusic(this.form).then(res => {
              this.msgSuccess('修改成功')
              this.loading = false
              this.getMusicList()// 列表重新查询
              this.open = false// 关闭弹出层
            }).catch(() => {
              this.loading = false
            })
          }
        }
      })
    },
    // 取消
    cancel() {
      this.open = false
      this.title = ''
    },
    // 重置表单
    reset() {
      this.resetForm('form')
      this.form = {
        picUrl: undefined,
        musicUrl: undefined,
        status: '0',
        musicName: undefined
      }
    },
    // 文件上传的相关方法
    // 移除回调
    handleRemove(file, fileList) {
      this.fileListJsonObj.filter(i1 => {
        if (file.response.data.url === i1.url) {
          this.fileListJsonObj.splice(this.fileListJsonObj.indexOf(i1), 1)
        }
      })
    },
    handleRemove2(file, fileList3) {
      this.fileListJsonObj2.filter(i1 => {
        if (file.response.data.url === i1.url) {
          this.fileListJsonObj.splice(this.fileListJsonObj.indexOf(i1), 1)
        }
      })
    },
    // 上传成功之后的回调
    handleUploadSuccess(response, file, fileList) {
      this.fileListJsonObj.push(response.data)
      this.form.picUrl = response.msg
    },
    handleUploadSuccess2(response, file, fileList3) {
      this.fileListJsonObj2.push(response.data)
      this.form.musicUrl = response.msg
    },
    // 上传失败之后的回调
    handleUploadError() {
      this.msgError('上传失败')
    }
  }
}
</script>

<style>
  .logoImg {
    width: 100px;
    height: auto;
    max-height: 100px;
  }
</style>
