<template>
  <mindmap v-if="initSuccess" v-model="dataJson" style="height:650px" @click="handleClick" @updateNodeName="handleUpdate"/>
</template>

<script>
import mindmap from '@hellowuxin/mindmap'
import { getGoal } from '@/api/goal'

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
      initSuccess: false
    }
  },
  computed: {
  },
  created() {
    this.getGoalOne()
  },
  methods: {
    getGoalOne() {
      getGoal().then(res => {
        if (res.data.dataJson !== undefined) {
          this.dataJson[0] = JSON.parse(res.data.dataJson)
        }
        this.initSuccess = true
      })
    },
    handleUpdate(data, id) {
      console.log(data)
    },
    handleClick(data, id) {
      console.log(data)
      console.log(id)
    }
  }
}
</script>
