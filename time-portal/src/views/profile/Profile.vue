<template>
  <div id="container">
    <!-- 未办事项 -->
    <div>
      <h4 style="padding: 0 15px;"><b>未办事项</b></h4>
      <vs-row style="padding-top: 15px">
        <vs-col v-for="item in taskList" :key="item.taskId" type="flex" vs-w="4">
          <vs-card actionable class="cardx">
            <div slot="header">
              <h3>
                {{ item.title }}
              </h3>
            </div>
            <div>
              <span>{{ item.description }}</span>
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-button v-for="tag in tags" v-show="tag.value == item.tags" :key="tag.calue" :color="tag.color" @click.stop>
                  <span>{{ tag.text | capitalize }}</span>
                </vs-button>
              </vs-row>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>

    <!-- 图表 -->
    <div id="echart" />

    <!-- 动态 -->
    <div>
      <h4 style="padding: 0 15px 20px;"><b>动态</b></h4>
      <ul class="activity-timeline">
        <li>
          <div class="timeline-icon bg-primary">
            <feather-icon icon="PlusIcon" svg-classes="text-white stroke-current w-5 h-5"/>
          </div>
          <div class="timeline-info info">
            <p class="font-semibold">Client Meeting</p>
            <small class="text-grey activity-e-time">25 mins ago</small>
          </div>
          <span class="activity-desc">Bonbon macaroon jelly beans gummi bears jelly lollipop apple</span>
        </li>
        <li>
          <div class="timeline-icon bg-warning">
            <feather-icon icon="AlertCircleIcon" svg-classes="text-white stroke-current w-5 h-5"/>
          </div>
          <div class="timeline-info info">
            <p class="font-semibold">Email Newsletter</p>
            <small class="text-grey activity-e-time">15 days ago</small>
          </div>
          <span class="activity-desc">Cupcake gummi bears soufflé caramels candy</span>
        </li>
        <li>
          <div class="timeline-icon bg-danger">
            <feather-icon icon="CheckIcon" svg-classes="text-white stroke-current w-5 h-5"/>
          </div>
          <div class="timeline-info info">
            <p class="font-semibold">Plan Webinar</p>
            <small class="text-grey activity-e-time">20 days ago</small>
          </div>
          <span class="activity-desc">Candy ice cream cake. Halvah gummi bears</span>
        </li>
        <li>
          <div class="timeline-icon bg-success">
            <feather-icon icon="CheckIcon" svg-classes="text-white stroke-current w-5 h-5"/>
          </div>
          <div class="timeline-info">
            <p class="font-semibold">Launch Website</p>
            <span class="activity-desc">Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.</span>
          </div>
          <small class="text-grey activity-e-time">25 days ago</small>
        </li>
        <li>
          <div class="timeline-icon bg-primary">
            <feather-icon icon="CheckIcon" svg-classes="text-white stroke-current w-5 h-5"/>
          </div>
          <div class="timeline-info">
            <p class="font-semibold">Marketing</p>
            <span class="activity-desc">Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.</span>
          </div>
          <small class="text-grey activity-e-time">28 days ago</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { doneCount, getList } from '@/api/task'
export default {
  data() {
    return {
      blogContributeCount: [],
      taskList: [],
      queryParams: { status: '0' }
    }
  },
  computed: {
    isImportant: {
      get() {
        return false
      },
      set(value) {
        value
      }
    },
    tags() {
      return this.$store.state.todo.todoTags
    }
  },
  mounted() {
    setTimeout(this.initDate, 500)
  },
  created() {
    doneCount().then(res => {
      this.blogContributeCount = res.data
    })
    getList(this.queryParams).then(res => {
      this.taskList = res.data
      console.log(res.data)
    })
  },
  methods: {
    // 加载图表
    initDate: function() {
      const chart = echarts.init(document.getElementById('echart'))

      const option = {
        title: {
          top: 30,
          text: '完成数',
          subtext: '一年内完成事项的数量',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.data[0] + '<br>完成数：' + params.data[1]
          }
        },
        legend: {
          top: '40',
          left: '50',
          data: ['完成数', 'Top 12'],
          textStyle: {
            // 设置字体颜色
            color: '#000'
          }
        },
        calendar: [
          {
            top: 120,
            left: 'center',
            range: '2021',
            splitLine: {
              show: true,
              lineStyle: {
                // 设置月份分割线的颜色
                color: 'rgb(248,248,248)',
                width: 4,
                type: 'solid'
              }
            },
            yearLabel: { show: false },
            dayLabel: {
              nameMap: ['一', '', '三', '', '五', '', '日'], // 设置中文显示
              textStyle: {
                // 设置显示颜色
                color: '#000'
              }
            },
            monthLabel: {
              nameMap: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], // 设置中文显示
              textStyle: {
                // 设置月显示颜色
                color: '#000'
              }
            },
            itemStyle: {
              normal: {
                // 设置背景颜色
                color: 'rgb(238,238,238)',
                borderWidth: 1,
                // 设置方块分割线段颜色
                borderColor: 'rgb(255,255,255)'
              }
            }
          }
        ],
        series: [
          {
            name: '完成数',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: this.blogContributeCount,
            // 根据值设置原点大小
            symbolSize: function(val) {
              if (val[1] == 0) {
                return val[1]
              } else {
                let size = 8 + val[1] * 2
                if (size > 18) size = 18
                return size
              }
            },
            itemStyle: {
              normal: {
                // 设置圆点颜色
                color: 'rgb(148,139,242)'
              }
            }
          }
        ]
      }

      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
  #echart {
    /* padding-left: 20px; */
    padding-top: 10px;
    width: auto;
    height: 320px;
  }
  .button {
    margin-left: 5px;
  }
  .info {
    display: flex; /* 弹性布局 */
    margin-top: 10px;
    justify-content: space-between; /* 横向中间自动空间 */
  }
</style>
