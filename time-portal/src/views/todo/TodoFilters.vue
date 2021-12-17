<template>
  <div class="todo__filters-container">

    <vs-divider/>

    <!-- 时间条件 -->
    <div class="px-6 py-4">
      <h5>Time</h5>
      <template v-for="filter in todoFilters">
        <div
          :class="{'text-primary': todoFilter == filter.filter}"
          :key="filter.filter"
          class="flex mt-6 cursor-pointer"
          @click="applyTodoFilter('all')"
        >
          <feather-icon
            :icon="filter.icon"
            :svg-classes="[{'text-primary stroke-current': todoFilter == filter.filter}, 'h-6 w-6']"
          />
          <span class="text-lg ml-3">{{ filter.filterName }}</span>
        </div>
      </template>
    </div>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoFilters: [
        { filterName: '所有', filter: 'starred', icon: 'LayersIcon' },
        { filterName: '今天', filter: 'important', icon: 'SunIcon' },
        { filterName: '明天', filter: 'done', icon: 'SunriseIcon' },
        { filterName: '最近七天', filter: 'trashed', icon: 'CalendarIcon' }
      ]
    }
  },
  computed: {
    todoTags() {
      return this.$store.state.todo.todoTags
    },
    todoFilter() {
      return this.$store.state.todo.todoFilter
    }
  },
  methods: {
    applyTodoFilter(filterName) {
      this.$store.dispatch('todo/applyTodoFilter', filterName)
      this.$emit('closeSidebar', false)
    }
  }
}
</script>
