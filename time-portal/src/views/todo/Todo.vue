<template>
  <div
    id="todo-app"
    class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
      v-model="isSidebarActive"
      class="items-no-padding"
      parent="#todo-app"
    >
      <!-- 添加任务组件 -->
      <todo-add-new @getTaskList="getTaskList()"/>

      <VuePerfectScrollbar :settings="settings" class="todo-scroll-area">
        <todo-filters @closeSidebar="toggleTodoSidebar" @queryBy="queryBy($event)"/>
      </VuePerfectScrollbar>
    </vs-sidebar>

    <div
      :class="{ 'sidebar-spacer': clickNotClose }"
      class="app-fixed-height border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light app-fixed-height"
    >
      <!-- 搜索 -->
      <div
        :model="queryParams"
        class="flex items-center app-search-container border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light"
      >
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleTodoSidebar(true)"
        />
        <vs-input
          v-model="queryParams.title"
          size="large"
          icon-pack="feather"
          icon="icon-search"
          placeholder="Search..."
          class="vs-input-no-border vs-input-no-shdow-focus no-icon-border w-full"
          @input="query"
        />
      </div>

      <!-- TODO 列表 -->
      <VuePerfectScrollbar
        ref="todoListPS"
        :settings="settings"
        class="todo-content-scroll-area"
      >
        <transition-group
          class="todo-list"
          name="list-enter-up"
          tag="ul"
          appear
        >
          <li
            v-for="(todoItem, index) in taskList"
            :key="String(todoFilter) + String(todoItem.taskId)"
            :style="[{ transitionDelay: index * 0.1 + 's' }]"
            class="cursor-pointer todo_todo-item"
          >
            <todo-item
              :todo-item="todoItem"
              @showDisplayPrompt="showDisplayPrompt($event)"
              @getTaskList="getTaskList()"
            />
          </li>
        </transition-group>
      </VuePerfectScrollbar>
    </div>

    <!-- 修改任务 -->
    <todo-edit
      v-if="displayPrompt"
      :display-prompt="displayPrompt"
      :todo-item="todoItem"
      @hideDisplayPrompt="hidePrompt"
    />
  </div>
</template>

<script>
import TodoAddNew from './TodoAddNew.vue'
import TodoItem from './TodoItem.vue'
import TodoFilters from './TodoFilters.vue'
import TodoEdit from './TodoEdit.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { getList } from '@/api/task.js'

export default {
  components: {
    TodoAddNew,
    TodoItem,
    TodoFilters,
    TodoEdit,
    VuePerfectScrollbar
  },
  data() {
    return {
      clickNotClose: true,
      displayPrompt: false,
      todoItem: {},
      isSidebarActive: true,
      windowWidth: window.innerWidth,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3
      },
      todoFilters: [
        { filterName: '所有', filter: '1', icon: 'LayersIcon' },
        { filterName: '今天', filter: '2', icon: 'SunIcon' },
        { filterName: '明天', filter: '3', icon: 'SunriseIcon' },
        { filterName: '最近七天', filter: '4', icon: 'CalendarIcon' }
      ],
      todoTags: [
        { text: 'none', value: '0', color: 'primary' },
        { text: 'work', value: '1', color: 'warning' },
        { text: 'business', value: '2', color: 'success' },
        { text: 'personal', value: '3', color: 'danger' }
      ],
      taskList: [],
      queryParams: {}
    }
  },
  computed: {
    todo() {
      return this.$store.state.todo.todoArray
    },
    todoFilter() {
      return this.$store.state.todo.todoFilter
    },
    todoList() {
      return this.$store.getters['todo/todoList']
    }
  },
  watch: {
    todoFilter() {
      this.$refs.todoListPS.$el.scrollTop = 0
    }
  },
  created() {
    this.getTaskList()
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize)
    })
    this.setSidebarWidth()
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    // 文字查询
    query() {
      this.queryParams.description = this.queryParams.title
      this.getTaskList()
    },
    // 条件查询
    queryBy(params) {
      this.queryParams = params
      this.getTaskList()
    },
    // 获取任务列表
    getTaskList() {
      getList(this.queryParams).then(res => {
        this.taskList = res.data
      })
    },
    applyTodoFilter(filterName) {
      this.$store.dispatch('todo/applyTodoFilter', filterName)
      this.$emit('closeSidebar', false)
    },
    // 展示编辑弹出层
    showDisplayPrompt(item) {
      this.todoItem = item
      this.displayPrompt = true
    },
    hidePrompt() {
      this.displayPrompt = false
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false
      } else {
        this.isSidebarActive = this.clickNotClose = true
      }
    },
    toggleTodoSidebar(value = false) {
      if (!value && this.clickNotClose) return
      this.isSidebarActive = value
    },
    // 清空查询条件
    clearField() {
      this.queryParams = {}
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/todo.scss";
</style>
