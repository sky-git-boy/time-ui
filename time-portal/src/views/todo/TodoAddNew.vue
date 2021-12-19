<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button class="w-full" @click="handleAdd">Add Task</vs-button>
    <div class="px-6 pb-2 pt-6">
      <vs-prompt
        :active.sync="activePrompt"
        :model="form"
        title="Add Task"
        accept-text="Submit"
        button-cancel="border"
        @cancel="clearFields"
        @accept="handleSubmit"
        @close="clearFields"
      >
        <div>
          <form>
            <div class="vx-row">
              <!-- 结束时间 -->
              <div class="vx-col">
                <flat-pickr
                  :config="configdateTimePicker"
                  v-model="form.endTime"
                  placeholder="End Time"
                />
              </div>

              <div class="vx-col ml-auto flex">
                <!-- 是否重要 -->
                <feather-icon
                  :svg-classes="[
                    { 'text-success stroke-current': isImportant },
                    'w-5',
                    'h-5 mr-4'
                  ]"
                  icon="InfoIcon"
                  class="cursor-pointer"
                  @click.prevent="isImportant = !isImportant"
                />

                <!-- 标签列表 -->
                <vs-dropdown class="cursor-pointer" vs-custom-content>
                  <feather-icon icon="TagIcon" svg-classes="h-5 w-5" @click.prevent/>
                  <vs-dropdown-menu style="z-index: 200001">
                    <ul style="min-width: 6.5rem">
                      <li v-for="tag in todoTags" :key="tag.value">
                        <vs-radio :color="tag.color" :vs-value="tag.value" v-model="form.tags">{{ tag.text }}</vs-radio>
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>

            <!-- 任务主体 -->
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-input
                  v-model="form.title"
                  name="title"
                  class="w-full mb-4 mt-5"
                  placeholder="Title"
                />
                <vs-textarea v-model="form.description" rows="5" label="Add description" />
              </div>
            </div>
          </form>
        </div>
      </vs-prompt>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { addTask } from '@/api/task.js'

export default {
  components: { flatPickr },
  data() {
    return {
      // 重要
      isImportant: false,
      // 打开弹出层
      activePrompt: false,
      // 时间配置
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i'
      },
      // 标签
      todoTags: [
        { text: 'none', value: '0', color: 'primary' },
        { text: 'work', value: '1', color: 'warning' },
        { text: 'business', value: '2', color: 'success' },
        { text: 'personal', value: '3', color: 'danger' }
      ],
      // 表单
      form: {}
    }
  },
  methods: {
    // 添加
    handleAdd() {
      this.isImportant = false
      this.activePrompt = true // 打开弹出层
      this.clearFields()
      if (this.form.tags === undefined) { this.form.tags = '0' }
      if (this.isImportant) { this.form.important = '1' } else { this.form.important = '0' }
    },
    // 提交
    handleSubmit() {
      this.$vs.loading()
      addTask(this.form).then(() => {
        this.clearFields()
        this.activePrompt = false// 关闭弹出层
        this.$emit('getTaskList')
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success',
          text: '添加成功',
          color: 'success'
        })
      }).catch(() => {
        this.$vs.notify({
          title: 'Fail',
          text: '添加失败',
          color: 'danger'
        })
        this.$vs.loading.close()
      })
    },
    // 删除
    // 重置表单
    clearFields() {
      this.form = {
        taskId: undefined,
        title: undefined,
        description: undefined,
        status: undefined,
        important: undefined,
        tags: undefined,
        endTime: undefined
      }
    }
  }
}
</script>
