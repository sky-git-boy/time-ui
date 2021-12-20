<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table
      :sst="true"
      :total="total"
      :max-items="queryParams.pageSize"
      :data="list"
      search
      pagination
      no-data-text=""
      @change-page="handleChangePage"
      @search="handleSearch"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <!-- 新增按钮 -->
        <div class="flex flex-wrap-reverse items-center">
          <div
            class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="activePrompt = true"
          >
            <feather-icon icon="PlusIcon" svg-classes="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

        <!-- 查询 -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span
              class="mr-2"
            >{{ queryParams.pageNum * queryParams.pageSize - (queryParams.pageSize - 1) }} -
              {{
                total - queryParams.pageNum * queryParams.pageSize > 0
                  ? queryParams.pageNum * queryParams.pageSize
                  : total
              }}
              of {{ total }}</span
              >
            <feather-icon icon="ChevronDownIcon" svg-classes="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="queryParams.pageSize = 4; getJournalList()">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="queryParams.pageSize = 8; getJournalList()">
              <span>8</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="queryParams.pageSize = 12; getJournalList()">
              <span>12</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <!-- 数据展示 -->
      <div class="vx-row">
        <div
          v-for="item in list"
          :key="item.recordId"
          class="vx-col w-full md:w-1/4 sm:w-1/2 mb-base"
          @click="handleUpdate(item.recordId)"
        >
          <vx-card class="text-center" style="height: 200px" >
            <h5>{{ item.title.toUpperCase() }}</h5>
            <small>{{ item.description }}</small>
          </vx-card>
        </div>
      </div>
    </vs-table>

    <!-- 添加修改弹出层 -->
    <vs-prompt
      :is-valid="validateForm"
      :active.sync="activePrompt"
      title="Diary"
      accept-text="Submit"
      button-cancel="border"
      @cancel="clearFields"
      @accept="submit"
      @close="clearFields"
    >
      <div>
        <form>
          <div class="vx-row">
            <div :model="form" class="vx-col w-full">
              <vs-input
                v-model="form.title"
                :color="validateForm ? 'success' : 'danger'"
                label-placeholder="title"
                class="w-full mb-4 mt-5"
                placeholder="Title"
              />
              <vs-textarea v-model="form.description" :color="validateForm ? 'success' : 'danger'" rows="5" label="Description" />
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import { listJournalForPage, addJournal, getJournalById, updateJournal } from '@/api/journal.js'
export default {
  data() {
    return {
      isMounted: false,
      // 分页数据总条数
      total: 0,
      // 列表数据
      list: [],
      // 弹出层
      activePrompt: false,
      // 表单
      form: {},
      // 查询条件
      queryParams: {
        pageNum: 1,
        pageSize: 4,
        title: undefined
      }
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.form.title !== '' && this.form.description !== ''
    }
  },
  created() {
    this.getJournalList()
  },
  methods: {
    formatData(data) {
      // formats data received from API
      const formattedData = data.map(item => {
        const fields = item.fields
        const obj = {}
        for (const key of Object.keys(fields)) {
          obj[key] =
            Number(fields[key].integerValue) ||
            Number(fields[key].doubleValue) ||
            fields[key].stringValue
        }
        return obj
      })
      return formattedData
    },
    // 获取列表
    getJournalList() {
      this.$vs.loading()
      listJournalForPage(this.queryParams).then(res => {
        this.list = res.data
        this.total = res.total
        this.$vs.loading.close()// 关闭遮罩
      })
    },
    // 执行添加
    handleAdd() {
      this.$vs.loading()
      addJournal(this.form).then(() => {
        this.$vs.loading.close()
        this.getJournalList()// 列表重新查询
        this.activePrompt = false
      }).catch(() => {
        this.$vs.loading.close()
      })
      this.clearFields()
    },
    // 清空
    clearFields() {
      // clear all fileds in todo
      this.form = {}
    },
    // 提交
    submit() {
      this.$vs.loading()
      if (this.form.recordId === undefined) {
        addJournal(this.form).then(() => { // 做添加
          this.$vs.loading.close()
          this.getJournalList()
          this.$vs.notify({
            title: 'Success',
            text: '添加成功',
            color: 'success'
          })
          this.open = false
        }).catch(() => {
          this.$vs.notify({
            title: 'Fail',
            text: '添加失败',
            color: 'danger'
          })
          this.$vs.loading.close()
        })
      } else { // 做修改
        updateJournal(this.form).then(() => {
          this.$vs.loading.close()
          this.getJournalList()
          this.open = false
          this.$vs.notify({
            title: 'Success',
            text: '修改成功',
            color: 'success'
          })
        }).catch(() => {
          this.$vs.notify({
            title: 'Fail',
            text: '修改失败',
            color: 'danger'
          })
          this.$vs.loading.close()
        })
      }
    },
    // 条件查询
    handleSearch(searching) {
      this.queryParams.pageNum = 1
      this.queryParams.title = searching
      this.getJournalList()
    },
    // 页面跳转
    handleChangePage(page) {
      this.queryParams.pageNum = page
      this.getJournalList()
    },
    // 修改
    handleUpdate(id) {
      this.activePrompt = true
      this.$vs.loading()
      this.reset()
      getJournalById(id).then(res => {
        this.form = res.data
        this.$vs.loading.close()
      })
    },
    // 重置表单
    reset() {
      this.form = {
        title: undefined,
        description: undefined
      }
    }
  }
}
</script>

<style lang="scss">
h5 {
  margin-bottom: 10px;
}
.knowledge-base-jumbotron-content {
  background-image: url("../../assets/images/pages/knowledge-base-cover.jpg");
  background-size: cover;
}
#data-list-list-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
