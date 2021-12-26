<template>
  <div class="px-4 py-4 list-item-component" @click="displayPrompt">
    <div class="vx-row">
      <div
        class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col"
      >
        <div class="flex items-center">
          <div @click.stop>
            <vs-checkbox
              v-model="isDone"
              class="w-8 m-0 vs-checkbox-small"
            />
          </div>
          <h6 :class="{ 'line-through': isDone }" class="todo-title" >
            {{ todoItem.title }}
          </h6>
        </div>
        <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
          <vs-chip>
            <div
              :class="'bg-' + tags.color"
              class="h-2 w-2 rounded-full mr-1"
            />
            <span>{{ tags.text }}</span>
          </vs-chip>
          <vs-chip v-if="todoItem.status == '3'">
            <div
              :class="'bg-danger'"
              class="h-2 w-2 rounded-full mr-1"
            />
            <span style="color: #F00">已过期</span>
          </vs-chip>
        </div>
      </div>

      <div class="vx-col w-full sm:w-1/6 ml-auto flex sm:justify-end">
        <feather-icon
          :svg-classes="[
            { 'text-success stroke-current': isImportant },
            'w-5',
            'h-5 mr-4'
          ]"
          icon="InfoIcon"
          class="cursor-pointer"
          @click.stop="toggleIsImportant"
        />
        <feather-icon
          icon="TrashIcon"
          class="cursor-pointer"
          svg-classes="w-5 h-5"
          @click.stop="handleDel"
        />
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <p :class="{ 'line-through': isDone }" class="mt-2 truncate">
          {{ todoItem.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { updateTask, delTask } from '@/api/task.js'
export default {
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    isImportant: {
      get() {
        return this.todoItem.important == '1'
      },
      set(value) {
        value ? this.todoItem.important = '1' : this.todoItem.important = '0'
      }
    },
    tags() {
      const tags = this.$store.state.todo.todoTags
      return tags.find(tag => {
        return tag.value === this.todoItem.tags
      })
    },
    isDone: {
      get() {
        return this.todoItem.status == '2'
      },
      set(value) {
        !value ? this.todoItem.status = '0' : this.todoItem.status = '2'
      }
    }
  },
  watch: {
    isDone() {
      this.handleUpdate()
    },
    isImportant() {
      this.handleUpdate()
    }
  },
  methods: {
    toggleIsImportant() {
      this.isImportant = !this.isImportant
    },
    handleUpdate() {
      updateTask(this.todoItem).then()
        .catch(e => {
          this.$vs.notify({
            title: 'Fail',
            text: e.data,
            color: 'danger'
          })
        })
    },
    handleDel() {
      this.$vs.loading()
      delTask(this.todoItem.taskId).then(() => {
        this.$emit('getTaskList')
        this.$vs.notify({
          title: 'Success',
          text: '删除成功',
          color: 'success'
        })
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.notify({
          title: 'Fail',
          text: e.data,
          color: 'danger'
        })
        this.$vs.loading.close()
      })
    },
    displayPrompt() {
      this.$emit('showDisplayPrompt', this.todoItem)
    }
  }
}
</script>
