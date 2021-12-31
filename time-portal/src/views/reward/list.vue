<template lang="html">
  <div>
    <vs-card>
      <vs-table :data="rules" >
        <template slot="header">
          <h3> 奖惩规则 </h3>
          <vs-button type="flat" size="small" @click="openSave()">添加</vs-button>
        </template>
        <template slot="thead">
          <vs-th>
            需完成任务数
          </vs-th>
          <vs-th>
            奖励内容
          </vs-th>
          <vs-th>
            惩罚内容
          </vs-th>
          <vs-th>
            状态
          </vs-th>
          <vs-th>
            操作
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr v-for="(item, index) in rules" :key="item.id" >
            <vs-td>
              {{ item.needCount }}
            </vs-td>

            <vs-td>
              {{ item.rewardContent }}
            </vs-td>

            <vs-td>
              {{ item.punishmentContent }}
            </vs-td>

            <vs-td>
              <p v-if="item.status == '0'">启用</p>
              <p v-else>禁用</p>
            </vs-td>

            <vs-td>
              <vs-button type="flat" size="small" @click="openUpdate(index)">修改</vs-button>
              <vs-button type="flat" size="small" @click="deleteRule(item.id)">删除</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>

    <vs-prompt
      :active.sync="activeUpdate"
      :model="rule"
      title="今日奖惩"
      @accept="submit"
    >
      <div style="margin-bottom: 20px">需完成任务数<vs-input v-model="rule.needCount" class="inputx"/></div>
      <div style="margin-bottom: 20px">
        状态：
        <vs-radio v-model="rule.status" style="margin-right: 20px" vs-value="0">启用</vs-radio>
        <vs-radio v-model="rule.status" vs-value="1">禁用</vs-radio>
      </div>
      <div style="margin-bottom: 20px">奖励内容<vs-textarea v-model="rule.rewardContent" width="300px"/></div>
      <div>惩罚内容<vs-textarea v-model="rule.punishmentContent" width="300px"/></div>
    </vs-prompt>
  </div>
</template>

<script>
import { saveOrUpdate, rulesList, deleteRules } from '@/api/rules'

export default {
  data: () => ({
    rules: [],
    rule: {},
    activeUpdate: false
  }),

  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      rulesList().then(res => {
        this.rules = res.data
      })
    },
    openUpdate(index) {
      this.rule = this.rules[index]
      this.activeUpdate = !this.activeUpdate
    },
    submit() {
      this.$vs.loading()
      saveOrUpdate(this.rule).then(res => {
        this.loadData()
        this.$vs.loading.close()
        this.$vs.notify({
          text: '操作成功', color: 'success'
        })
        this.activeUpdate = false
      })
    },
    deleteRule(id) {
      this.$vs.loading()
      deleteRules(id).then(res => {
        this.loadData()
        this.$vs.loading.close()
        this.$vs.notify({
          text: '操作成功', color: 'success'
        })
      })
    },
    openSave() {
      this.rule = {
        needCount: '',
        rewardContent: '',
        punishmentContent: '',
        status: '0'
      }
      this.activeUpdate = !this.activeUpdate
    }
  }
}
</script>
