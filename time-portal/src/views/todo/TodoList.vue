<template>
  <div class="layout v-application">
    <!--使用draggable组件-->
    <div class="board">
      <!-- 待办 -->
      <div class="board-column pa-2">
        <div class="flex">
          <div>
            <h5 class="text-lg">待办</h5>
          </div>
          <button type="button" @click="handleAdd('0')">
            <feather-icon :svg-classes="['h-6 w-6']" class="cursor-pointer plusIcon" icon="PlusIcon"/>
          </button>
        </div>

        <draggable
          v-model="todoArr"
          group="site"
          animation="300"
          drag-class="dragClass"
          ghost-class="ghostClass"
          chosen-class="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group id="0" class="board-group">
            <div v-for="item in todoArr" :key="item.taskId" class="item flex">
              <div>
                <div class="font-weight-bold">{{ item.title }}</div>
                <div class="font-desc">{{ item.description }}</div>
              </div>
              <div>
                <button type="button">
                  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                    <feather-icon
                      :svg-classes="['w-5', 'h-5']"
                      icon="MoreVerticalIcon"
                      class="cursor-pointer moreIcon"
                    />
                    <vs-dropdown-menu class="vx-navbar-dropdown">
                      <ul style="min-width: 6rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="handleUpdate(item.taskId)"
                        >
                          <feather-icon icon="EditIcon" svg-classes="w-3 h-3"/>
                          <span class="ml-3">编辑</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="handleDel(item.taskId)"
                        >
                          <feather-icon icon="DeleteIcon" svg-classes="w-3 h-3"/>
                          <span class="ml-3">删除</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </button>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>

      <!-- 进行中 -->
      <div class="board-column pa-2">
        <div class="flex">
          <div>
            <h5 class="text-lg">进行中</h5>
          </div>
          <button type="button" @click="handleAdd('1')">
            <feather-icon :svg-classes="['h-6 w-6']" class="cursor-pointer plusIcon" icon="PlusIcon"/>
          </button>
        </div>

        <draggable
          v-model="doingArr"
          group="site"
          animation="300"
          drag-class="dragClass"
          ghost-class="ghostClass"
          chosen-class="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group id="1" class="board-group">
            <div v-for="item in doingArr" :key="item.taskId" class="item flex">
              <div>
                <div class="font-weight-bold todo-title">{{ item.title }}</div>
                <div class="font-desc">{{ item.description }}</div>
              </div>
              <div>
                <button type="button">
                  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                    <feather-icon
                      :svg-classes="['w-5', 'h-5']"
                      icon="MoreVerticalIcon"
                      class="cursor-pointer moreIcon"
                    />
                    <vs-dropdown-menu class="vx-navbar-dropdown">
                      <ul style="min-width: 6rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="handleUpdate(item.taskId)"
                        >
                          <feather-icon icon="EditIcon" svg-classes="w-3 h-3"/>
                          <span class="ml-3">编辑</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="handleDel(item.taskId)"
                        >
                          <feather-icon icon="DeleteIcon" svg-classes="w-3 h-3"/>
                          <span class="ml-3">删除</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </button>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>

      <!-- 已完成 -->
      <div class="board-column pa-2">
        <div class="flex">
          <div>
            <h5 class="text-lg">已完成</h5>
          </div>
          <button type="button" @click="handleAdd('2')">
            <feather-icon :svg-classes="['h-6 w-6']" class="cursor-pointer plusIcon" icon="PlusIcon"/>
          </button>
        </div>

        <draggable
          v-model="doneArr"
          group="site"
          animation="300"
          drag-class="dragClass"
          ghost-class="ghostClass"
          chosen-class="chosenClass"
          @change="onChange"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group id="2" class="board-group">
            <div v-for="item in doneArr" :key="item.taskId" class="item flex">
              <div>
                <div class="font-weight-bold todo-title">{{ item.title }}</div>
                <div class="font-desc">{{ item.description }}</div>
              </div>
              <div>
                <button type="button">
                  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                    <feather-icon
                      :svg-classes="['w-5', 'h-5']"
                      icon="MoreVerticalIcon"
                      class="cursor-pointer moreIcon"
                    />
                    <vs-dropdown-menu class="vx-navbar-dropdown">
                      <ul style="min-width: 6rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="handleUpdate(item.taskId)"
                        >
                          <feather-icon icon="EditIcon" svg-classes="w-3 h-3"/>
                          <span class="ml-3">编辑</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="handleDel(item.taskId)"
                        >
                          <feather-icon icon="DeleteIcon" svg-classes="w-3 h-3"/>
                          <span class="ml-3">删除</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </button>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>

    <!-- Add Task -->
    <div class="px-6 pb-2 pt-6">
      <vs-prompt
        :title="title"
        :active.sync="activePrompt"
        :model="form"
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
                  v-validate="'required'"
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
// 导入draggable组件
import draggable from 'vuedraggable'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { addTask, kanBan, updateTask, delTask, getTaskById } from '@/api/task.js'

export default {
  // 注册draggable组件
  components: {
    draggable,
    flatPickr
  },
  data() {
    return {
      // 重要
      isImportant: false,
      // 打开弹出层
      activePrompt: false,
      // 拖拽的taskId
      dragTaskId: '',
      // 弹出层标题
      title: '',
      // 拖拽
      drag: false,
      // 时间配置
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i'
      },
      tags: [],
      // 标签
      todoTags: [
        { text: 'none', value: '0', color: 'primary' },
        { text: 'work', value: '1', color: 'warning' },
        { text: 'business', value: '2', color: 'success' },
        { text: 'personal', value: '3', color: 'danger' }
      ],
      // 表单
      form: {},
      // 定义要被拖拽对象的数组
      // 待办
      todoArr: [],
      // 进行中
      doingArr: [],
      // 已完成
      doneArr: []
    }
  },
  created() {
    this.getTaskList()
  },
  methods: {
    // 通过状态获取任务列表
    getTaskList() {
      this.$vs.loading() // 打开遮罩
      kanBan(this.form).then(res => {
        this.todoArr = res.data.todo
        this.doingArr = res.data.doing
        this.doneArr = res.data.done
        this.$vs.loading.close()// 关闭遮罩
      })
    },
    // 添加
    handleAdd(status) {
      this.isImportant = false
      this.activePrompt = true // 打开弹出层
      this.clearFields()
      this.title = 'Add Task'
      this.form.status = status
      if (this.form.tags === undefined) { this.form.tags = '0' }
    },
    // 修改
    handleUpdate(id) {
      this.activePrompt = true // 打开弹出层
      this.clearFields()
      this.title = 'Update Task'
      this.$vs.loading()
      getTaskById(id).then(res => {
        this.form = res.data
        if (this.form.important === '0') { this.isImportant = false } else { this.isImportant = true }
        this.$vs.loading.close()
      })
    },
    // 提交
    handleSubmit() {
      this.$vs.loading()
      if (this.isImportant) { this.form.important = '1' } else { this.form.important = '0' }
      if (this.form.taskId === undefined) { // 添加
        addTask(this.form).then(() => {
          this.clearFields()
          this.getTaskList()// 列表重新查询
          this.activePrompt = false// 关闭弹出层
          this.$vs.loading.close()
        }).catch(() => {
          this.$vs.loading.close()
        })
      } else { // 做修改
        updateTask(this.form).then(() => {
          this.clearFields()
          this.getTaskList()
          this.activePrompt = false
          this.$vs.loading.close()
        }).catch(() => {
          this.$vs.loading.close()
        })
      }
    },
    // 删除
    handleDel(id) {
      delTask(id).then(() => {
        this.$vs.notify({
          title: 'Success',
          text: '删除成功',
          color: 'success'
        })
        this.getTaskList()
      }).catch(e => {
        this.$vs.notify({
          title: 'Fail',
          text: e.data,
          color: 'danger'
        })
      })
    },
    onChange(evt) {
      let flag
      // 获取拖拽对象的id
      if (evt.added === undefined) {
        flag = evt.removed.element.taskId
      } else {
        flag = evt.added.element.taskId
      }
      this.dragTaskId = flag
    },
    // 开始拖拽事件
    onStart() {
      this.drag = true
      this.dragTaskId = ''
      this.form.status = ''
    },
    // 拖拽结束事件
    onEnd(evt) {
      this.form.taskId = this.dragTaskId
      this.form.status = evt.to.id
      // 修改任务状态
      updateTask(this.form).then(() => {
        this.clearFields()
        this.drag = false
      })
    },
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

<style scoped>
/**
    鼠标移入hover动画效果
 */
.item:hover {
  transform: translateY(-5px);
  transition: all 0.5s ease 0s;
  -webkit-transform: translateY(-5px);
}

/**
    鼠标移开恢复特效
 */
/* .item {
  transition: all 0.5s ease 0s;
} */

/*定义要拖拽元素的样式*/
* {
  margin: 0;
}
button {
  border: 0;
  background-color: inherit;
}
.plusIcon:hover {
  background-color: rgb(223, 238, 245);
  border-radius: 90px;
}
.moreIcon:hover {
  background-color: rgb(241, 241, 241);
  border-radius: 90px;
}
.flex {
  display: flex !important;
  justify-content: space-between;
}
.font-desc {
  width: 270px;
  white-space: nowrap;
  color: rgb(119,119,119);
  overflow: hidden;
  text-overflow: ellipsis;
}
.font-weight-bold {
  color: rgb(31,31,31)
}
.board .board-column {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 180px;
}
.board-column-actions {
  position: absolute;
  top: 12px;
  right: 6px;
}
.v-application .flex-grow-1 {
  flex-grow: 1 !important;
}
.board-group {
  min-height: 100%;
}

.ghostClass {
  background-color: rgb(238, 237, 253) !important;
  opacity: 1 !important;
}
.chosenClass {
  /* background-color: rgb(238, 237, 253) !important; */
  opacity: 1 !important;
}
.dragClass {
  background-color: rgb(201, 202, 203) !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.board-column {
  width: 30%;
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  float: left;
  margin-right: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.v-application .pa-2 {
  padding: 16px !important;
}

.item {
  margin-bottom: 10px;
  padding: 16px 12px;
  background-color: #fff;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0 3px 10px -2px rgb(85 85 85 / 8%),
    0 2px 20px 0 rgb(85 85 85 / 6%), 0 1px 30px 0 rgb(85 85 85 / 3%);
}

.item:hover {
  /* background-color: rgb(238, 238, 238); */
  cursor: move;
}

.item + .item {
  border-top: none;
  margin-top: 6px;
}

h5 {
  display: block;
  font-size: 1em;
  margin-block-start: 1.67em;
  margin-block-end: 1.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.theme--light.v-application {
  background: #edf2f7;
  color: rgba(0, 0, 0, 0.87);
}

.v-application {
  font-family: Quicksand, sans-serif;
  line-height: 1.5;
}
</style>
