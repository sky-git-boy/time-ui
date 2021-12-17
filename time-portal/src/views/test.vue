<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="px-6 pb-2 pt-6">
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePrompt: false,

      // task fields
      title: '',
      desc: '',
      isDone: false,
      isImportant: false,
      isStarred: false,
      tags: [],
      todoTags: [
        { text: 'none', value: '0', color: 'primary' },
        { text: 'work', value: '1', color: 'warning' },
        { text: 'business', value: '2', color: 'success' },
        { text: 'personal', value: '3', color: 'danger' }
      ],
      // task obj
      taskObj: {}
    }
  },
  computed: {
    todoArrayLength() {
      return this.$store.getters['todo/todoArrayLength']
    },
    validateForm() {
      return !this.errors.any() && this.title != ''
    }
  },
  methods: {
    addTodo() {
      // update todo in store and clear all fields in dialog
      const newId = this.todoArrayLength
      this.taskObj.id = newId
      this.taskObj.title = this.title
      this.taskObj.desc = this.desc
      this.taskObj.isDone = this.isDone
      this.taskObj.isImportant = this.isImportant
      this.taskObj.isStarred = this.isStarred
      this.taskObj.tags = this.tags
      this.taskObj.isTrashed = false

      this.$store.dispatch('todo/addTodo', this.taskObj)
      this.clearFields()
    },
    clearFields() {
      // clear all fileds in todo
      this.title = ''
      this.desc = ''
      this.isDone = false
      this.isImportant = false
      this.isStarred = false
      this.tags = []
    },
    submitTodo() {
      this.$validator.validateAll().then(result => {
        if (result) this.addTodo()
      })
    }
  }
}
</script>
