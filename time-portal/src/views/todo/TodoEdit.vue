<template>
  <vs-prompt
    :active.sync="activePrompt"
    title="Edit Task"
    accept-text= "Submit"
    button-cancel = "border"
    @accept="handleUpdate"
  >
    <div>
      <form>
        <div class="vx-row">
          <div class="vx-col w-1/6 self-center flex">
            <vs-checkbox v-model="isDone" class="w-8"/>
            <!-- 结束时间 -->
            <flat-pickr
              :config="configdateTimePicker"
              v-model="todoItem.endTime"
              placeholder="End Time"
            />
          </div>

          <div class="vx-col ml-auto flex">
            <feather-icon :svg-classes="[{'text-success stroke-current': isImportant}, 'w-5', 'h-5 mr-4']" icon="InfoIcon" class="cursor-pointer" @click.prevent="toggleIsImportant"/>

            <vs-dropdown class="cursor-pointer" vs-custom-content>

              <feather-icon icon="TagIcon" svg-classes="h-5 w-5"/>

              <vs-dropdown-menu style="z-index: 200001">
                <ul style="min-width: 6.5rem">
                  <li v-for="tag in todoTags" :key="tag.value">
                    <vs-radio :color="tag.color" :vs-value="tag.value" v-model="todoItem.tags" io @click.stop>{{ tag.text }}</vs-radio>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-input v-model="todoItem.title" name="title" class="w-full mb-4 mt-5" label-placeholder="Title" />
            <vs-textarea v-model="todoItem.description" rows="5" label="Add description" />
          </div>
        </div>

      </form>
    </div>
  </vs-prompt>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { updateTask } from '@/api/task.js'
export default {
  components: { flatPickr },
  props: {
    displayPrompt: {
      type: Boolean,
      required: true
    },
    todoItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 时间配置
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i'
      }
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
    isDone: {
      get() {
        return this.todoItem.status == '2'
      },
      set(value) {
        !value ? this.todoItem.status = '0' : this.todoItem.status = '2'
      }
    },
    isImportant: {
      get() {
        return this.todoItem.important == '1'
      },
      set(value) {
        value ? this.todoItem.important = '1' : this.todoItem.important = '0'
      }
    },
    todoTags() {
      return this.$store.state.todo.todoTags
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
    }
  }
}
</script>
