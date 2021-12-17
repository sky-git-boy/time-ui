<template>
  <div class="px-4 py-4 list-item-component" @click="displayPrompt">
    <div class="vx-row">
      <div
        class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col"
      >
        <div class="flex items-center">
          <vs-checkbox
            v-model="isDone"
            class="w-8 m-0 vs-checkbox-small"
            @click.stop
          />
          <h6 :class="{ 'line-through': isDone }" class="todo-title">
            {{ title }}
          </h6>
        </div>
        <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
          <vs-chip v-for="(tag, index) in tags" :key="index">
            <div
              :class="'bg-' + todoLabelColor(tag)"
              class="h-2 w-2 rounded-full mr-1"
            />
            <span>{{ tag | capitalize }}</span>
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
          v-if="!isTrashed"
          icon="TrashIcon"
          class="cursor-pointer"
          svg-classes="w-5 h-5"
          @click.stop="moveToTrash"
        />
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <p :class="{ 'line-through': isDone }" class="mt-2 truncate">
          {{ desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoItemId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    isImportant: {
      get() {
        return this.$store.state.todo.todoArray[this.todoItemId].isImportant
      },
      set(value) {
        this.$store.dispatch('todo/toggleIsImportant', {
          id: this.todoItemId,
          value: value
        })
      }
    },
    isStarred: {
      get() {
        return this.$store.state.todo.todoArray[this.todoItemId].isStarred
      },
      set(value) {
        this.$store.dispatch('todo/toggleIsStarred', {
          id: this.todoItemId,
          value: value
        })
      }
    },
    isTrashed: {
      get() {
        return this.$store.state.todo.todoArray[this.todoItemId].isTrashed
      },
      set(value) {
        this.$store.dispatch('todo/moveToTrash', {
          id: this.todoItemId,
          value: value
        })
      }
    },
    title() {
      return this.$store.state.todo.todoArray[this.todoItemId].title
    },
    desc() {
      return this.$store.state.todo.todoArray[this.todoItemId].desc
    },
    tags() {
      return this.$store.state.todo.todoArray[this.todoItemId].tags
    },
    isDone: {
      get() {
        return this.$store.state.todo.todoArray[this.todoItemId].isDone
      },
      set(value) {
        var payload = { id: this.todoItemId, value: value }
        this.$store.dispatch('todo/toggleIsDone', payload)
      }
    },
    todoLabelColor() {
      return label => {
        const tags = this.$store.state.todo.todoTags
        return tags.find(tag => {
          return tag.value === label
        }).color
      }
    }
  },
  methods: {
    toggleIsImportant() {
      this.isImportant = !this.isImportant
    },
    toggleIsStarred() {
      this.isStarred = !this.isStarred
    },
    moveToTrash() {
      this.isTrashed = !this.isTrashed
    },
    editTodo() {
      alert()
    },
    displayPrompt() {
      this.$emit('showDisplayPrompt', this.todoItemId)
    }
  }
}
</script>
