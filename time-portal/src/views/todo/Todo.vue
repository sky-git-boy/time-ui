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
      <todo-add-new/>
      <VuePerfectScrollbar :settings="settings" class="todo-scroll-area">
        <!-- 分割线 -->
        <vs-divider/>

        <!-- 时间条件 -->
        <div class="px-6 py-4">
          <h5>Time</h5>
          <template v-for="filter in todoFilters">
            <div
              :class="{'text-primary': todoFilter == filter.filter}"
              :key="filter.filter"
              class="flex mt-6 cursor-pointer"
              @click="applyTodoFilter(filter.el-table-filter__list)"
            >
              <feather-icon
                :icon="filter.icon"
                :svg-classes="[{'text-primary stroke-current': todoFilter == filter.filter}, 'h-6 w-6']"
              />
              <span class="text-lg ml-3">{{ filter.filterName }}</span>
            </div>
          </template>
        </div>
        <!-- 分割线 -->
        <vs-divider/>

        <!-- 标签 -->
        <div class="px-6 py-4">
          <h5>Tags</h5>
          <div class="todo__lables-list">
            <div
              v-for="(tag, index) in todoTags"
              :key="index"
              class="todo__label flex items-center mt-6 cursor-pointer"
              @click="applyTodoFilter(tag.value)"
            >
              <div :class="'bg-' + tag.color" class="h-4 w-4 rounded-full mr-4"/>
              <span :class="{'text-primary': todoFilter == tag.value}" class="text-lg">{{ tag.text }}</span>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>

    <div
      :class="{ 'sidebar-spacer': clickNotClose }"
      class="app-fixed-height border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light app-fixed-height"
    >
      <!-- 搜索 -->
      <div
        class="flex items-center app-search-container border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light"
      >
        <!-- TOGGLE SIDEBAR BUTTON -->
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleTodoSidebar(true)"
        />

        <!-- SEARCH BAR -->
        <vs-input
          v-model="searchQuery"
          size="large"
          icon-pack="feather"
          icon="icon-search"
          placeholder="Search..."
          class="vs-input-no-border vs-input-no-shdow-focus no-icon-border w-full"
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
            v-for="(todoItem, index) in todoList"
            :key="String(todoFilter) + String(todoItem.id)"
            :style="[{ transitionDelay: index * 0.1 + 's' }]"
            class="cursor-pointer todo_todo-item"
          >
            <todo-item
              :todo-item-id="todoItem.id"
              @showDisplayPrompt="showDisplayPrompt($event)"
            />
          </li>
        </transition-group>
      </VuePerfectScrollbar>
      <!-- /TODO LIST -->
    </div>

    <!-- EDIT TODO DIALOG -->
    <todo-edit
      v-if="displayPrompt"
      :display-prompt="displayPrompt"
      :todo-item-id="todoIdToEdit"
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
      todoIdToEdit: 0,
      isSidebarActive: true,
      windowWidth: window.innerWidth,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3
      },
      todoFilters: [
        { filterName: '所有', filter: 'starred', icon: 'LayersIcon' },
        { filterName: '今天', filter: 'important', icon: 'SunIcon' },
        { filterName: '明天', filter: 'done', icon: 'SunriseIcon' },
        { filterName: '最近七天', filter: 'trashed', icon: 'CalendarIcon' }
      ],
      todoTags: [
        { text: 'none', value: '0', color: 'primary' },
        { text: 'work', value: '1', color: 'warning' },
        { text: 'business', value: '2', color: 'success' },
        { text: 'personal', value: '3', color: 'danger' }
      ]
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
    },
    searchQuery: {
      get() {
        return this.$store.state.todo.todoSearchQuery
      },
      set(val) {
        this.$store.dispatch('todo/setTodoSearchQuery', val)
      }
    }
  },
  watch: {
    todoFilter() {
      this.$refs.todoListPS.$el.scrollTop = 0
    }
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize)
    })
    this.setSidebarWidth()
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    applyTodoFilter(filterName) {
      this.$store.dispatch('todo/applyTodoFilter', filterName)
      this.$emit('closeSidebar', false)
    },
    showDisplayPrompt(itemId) {
      this.todoIdToEdit = itemId
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
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/todo.scss";
</style>
