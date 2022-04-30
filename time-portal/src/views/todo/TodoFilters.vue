<template>
  <div class="todo__filters-container">
    <!-- 分割线 -->
    <vs-divider/>

    <!-- 时间条件 -->
    <div class="px-6 py-4">
      <h5>Time</h5>
      <template v-for="filter in todoFilters">
        <div
          :class="{'text-primary': filterId == filter.filter}"
          :key="filter.filter"
          class="flex mt-6 cursor-pointer"
          @click="queryByTime(filter.filter)"
        >
          <feather-icon
            :icon="filter.icon"
            :svg-classes="[{'text-primary stroke-current': filterId == filter.filter}, 'h-6 w-6']"
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
          @click="queryByTag(tag.value)"
        >
          <div :class="'bg-' + tag.color" class="h-4 w-4 rounded-full mr-4"/>
          <span :class="{'text-primary': tagId == tag.value}" class="text-lg">{{ tag.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index.js'

export default {
  data() {
    return {
      filterId: 0,
      tagId: 0,
      todoFilters: [
        { filterName: '所有', filter: 0, icon: 'LayersIcon' },
        { filterName: '今天', filter: 1, icon: 'SunIcon' },
        { filterName: '明天', filter: 2, icon: 'SunriseIcon' },
        { filterName: '最近七天', filter: 3, icon: 'CalendarIcon' }
      ],
      // 查询条件
      queryParams: { }
    }
  },
  computed: {
    todoTags() {
      return this.$store.state.todo.todoTags
    }
  },
  methods: {
    // 标签查询
    queryByTag(tagValue) {
      this.tagId = tagValue
      this.clearfield()
      this.queryParams.tags = tagValue
      this.$emit('queryBy', this.queryParams)
    },
    // 时间查询
    queryByTime(filter) {
      this.filterId = filter
      this.clearfield()
      // 开始/结束时间（yyyy-MM-dd HH:mm:ss
      const time = new Date() // 获取当前时间
      time.setDate(time.getDate() + 1) // 明日
      if (filter == 1) { // 查询今日待办
        this.queryParams.qEndTime = parseTime(time, '{y}-{m}-{d}')
        time.setDate(time.getDate() - 1)
        this.queryParams.beginTime = parseTime(time, '{y}-{m}-{d}')
      } else if (filter == 2) { // 查询明日待办
        this.queryParams.beginTime = parseTime(time, '{y}-{m}-{d}')
        time.setDate(time.getDate() + 1)
        this.queryParams.qEndTime = parseTime(time, '{y}-{m}-{d}')
      } else if (filter == 3) { // 查询近七日待办
        this.queryParams.qEndTime = parseTime(time, '{y}-{m}-{d}')
        time.setDate(time.getDate() - 7)
        this.queryParams.beginTime = parseTime(time, '{y}-{m}-{d}')
      }
      this.$emit('queryBy', this.queryParams)
    },
    clearfield() {
      this.queryParams = {}
    }
  }
}
</script>
