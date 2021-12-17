<template>
  <vs-prompt
    :is-valid="validateForm"
    :active.sync="activePrompt"
    title="Edit Task"
    accept-text= "Submit"
    cancel-text = "Remove"
    button-cancel = "border"
    @cancel="removeTodo"
    @accept="submitTodo"
    @close="init"
  >
    <div>
      <form>
        <div class="vx-row">
          <div class="vx-col w-1/6 self-center">
            <vs-checkbox v-model="isDoneLocal" class="w-8"/>
          </div>

          <div class="vx-col ml-auto flex">
            <feather-icon :svg-classes="[{'text-success stroke-current': isImportantLocal}, 'w-5', 'h-5 mr-4']" icon="InfoIcon" class="cursor-pointer" @click.prevent="toggleIsImportant"/>

            <feather-icon :svg-classes="[{'text-warning stroke-current': isStarredLocal}, 'w-5', 'h-5 mr-4']" icon="StarIcon" class="cursor-pointer" @click.prevent="toggleIsStarred"/>

            <vs-dropdown class="cursor-pointer" vs-custom-content>

              <feather-icon icon="TagIcon" svg-classes="h-5 w-5"/>

              <vs-dropdown-menu style="z-index: 200001">
                <ul style="min-width: 6.5rem">
                  <li v-for="tag in todoTags" :key="tag.value">
                    <vs-radio :color="tag.color" :vs-value="tag.value" v-model="tags" io @click.stop>{{ tag.text }}</vs-radio>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-input v-validate="'required'" v-model="titleLocal" name="title" class="w-full mb-4 mt-5" placeholder="Title" />
            <vs-textarea v-model="descLocal" rows="5" label="Add description" />
          </div>
        </div>

      </form>
    </div>
  </vs-prompt>
</template>

<script>
export default {
  props: {
    displayPrompt: {
      type: Boolean,
      required: true
    },
    todoItemId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      titleLocal: this.$store.state.todo.todoArray[this.todoItemId].title,
      descLocal: this.$store.state.todo.todoArray[this.todoItemId].desc,
      isDoneLocal: this.$store.state.todo.todoArray[this.todoItemId].isDone,
      isImportantLocal: this.$store.state.todo.todoArray[this.todoItemId].isImportant,
      isStarredLocal: this.$store.state.todo.todoArray[this.todoItemId].isStarred,
      tagsLocal: this.$store.state.todo.todoArray[this.todoItemId].tags
    }
  },
  computed: {
    activePrompt: {
      get() {
        return this.displayPrompt
      },
      set(value) {
        this.$emit('hideDisplayPrompt', value)
      }
    },
    todoTags() {
      return this.$store.state.todo.todoTags
    },
    validateForm() {
      return this.titleLocal !== ''
    },
    isTrashed: {
      get() {
        return this.$store.state.todo.todoArray[this.todoItemId].isTrashed
      },
      set(value) {
        this.$store.dispatch('todo/moveToTrash', { id: this.todoItemId, value: value })
      }
    }
  },
  methods: {
    toggleIsImportant() {
      this.isImportantLocal = !this.isImportantLocal
    },
    toggleIsStarred() {
      this.isStarredLocal = !this.isStarredLocal
    },
    removeTodo() {
      this.isTrashed = true
    },
    init() {
      this.titleLocal = this.$store.state.todo.todoArray[this.todoItemId].title
      this.descLocal = this.$store.state.todo.todoArray[this.todoItemId].desc
      this.isDoneLocal = this.$store.state.todo.todoArray[this.todoItemId].isDone
      this.isImportantLocal = this.$store.state.todo.todoArray[this.todoItemId].isImportant
      this.isStarredLocal = this.$store.state.todo.todoArray[this.todoItemId].isStarred
      this.tagsLocal = this.$store.state.todo.todoArray[this.todoItemId].tags
    },
    submitTodo() {
      this.$store.dispatch('todo/setTodoTitle', { id: this.todoItemId, title: this.titleLocal })
      this.$store.dispatch('todo/setTodoDesc', { id: this.todoItemId, desc: this.descLocal })
      this.$store.dispatch('todo/toggleIsImportant', { id: this.todoItemId, value: this.isImportantLocal })
      this.$store.dispatch('todo/toggleIsStarred', { id: this.todoItemId, value: this.isStarredLocal })
      this.$store.dispatch('todo/updateTags', { id: this.todoItemId, newTags: this.tagsLocal })
      this.$store.dispatch('todo/toggleIsDone', { id: this.todoItemId, value: this.isDoneLocal })
    }
  }
}
</script>
