<template>
  <mindmap v-if="initSuccess" v-model="dataJson" style="height:650px" @updateNodeName="handleUpdate"/>
</template>

<script>
import mindmap from '@hellowuxin/mindmap'
import { getGoal, updateGoal, addGoal } from '@/api/goal'

export default {
  components: { mindmap },
  data() {
    return {
      dataJson: [
        {
          'name': '2022年计划',
          'left': false,
          'children': []
        }
      ],
      addFlag: false, // 新增修改标识
      form: {}, // 表单数据
      initSuccess: false,
      otimer: null
    }
  },
  computed: {
  },
  created() {
    this.getGoalOne()
    this.otimer = setInterval(this.handleUpdate, 10000)
  },
  destroyed() {
    clearInterval(this.otimer)
  },
  methods: {
    getGoalOne() {
      getGoal().then(res => {
        if (res.data !== null && res.data.dataJson !== undefined) {
          this.dataJson[0] = JSON.parse(res.data.dataJson)
        }
        this.initSuccess = true
      })
    },
    handleUpdate(data, id) {
      this.form = {}
      this.form.dataJson = JSON.stringify(this.dataJson[0])
      getGoal().then(res => {
        if (res.data === null) { // 新增
          addGoal(this.form)
        } else { // 修改
          this.form.goldId = res.data.goldId
          updateGoal(this.form)
        }
      })
    }
  }
}
</script>
