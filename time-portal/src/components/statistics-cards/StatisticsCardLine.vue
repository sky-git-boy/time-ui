<!-- =========================================================================================
    File Name: StatisticsCard.vue
    Description: Statistics card component
========================================================================================== -->

<template>
  <vx-card class="overflow-hidden">
    <div slot="no-body">
      <div :class="{'flex justify-between flex-row-reverse items-center': iconRight}" class="p-6 pb-0">
        <feather-icon :icon="icon" :class="[`text-${color}`, {'mb-4': !iconRight}]" :style="{background: `rgba(var(--vs-${color}),.15)`}" class="p-3 inline-flex rounded-full"/>
        <div>
          <h2 class="mb-1 font-bold">{{ statistic }}</h2>
          <span>{{ statisticTitle }}</span>
        </div>
      </div>

      <div :id="chartData.id" class="line-area-chart">
        <vue-apex-charts ref="apexChart" :type="type" :options="chartData.chartOptions" :series="chartData.series" height="100" width="100%"/>
      </div>
    </div>
  </vx-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default{
  components: {
    VueApexCharts
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    statistic: {
      type: [Number, String],
      required: true
    },
    statisticTitle: {
      type: String
    },
    chartData: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    chartType: {
      type: String,
      default: 'line-chart'
    },
    type: {
      type: String,
      default: 'line'
    },
    iconRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    themePrimaryColor() {
      return this.$store.state.themePrimaryColor
    }
  },
  watch: {
    themePrimaryColor() {
      this.$refs.apexChart.updateOptions({ theme: { monochrome: { color: this.getHex() }}})
    }
  },
  created() {
    if (this.type == 'area') {
      this.chartData.chartOptions['theme'] = {
        monochrome: {
          enabled: true,
          color: this.getHex(this.color),
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      }
    }
  },
  methods: {
    getHex() {
      let rgb = window.getComputedStyle(document.documentElement).getPropertyValue(`--vs-${this.color}`)
      rgb = rgb.split(',')
      return '#' + ((1 << 24) + (Number(rgb[0]) << 16) + (Number(rgb[1]) << 8) + Number(rgb[2])).toString(16).slice(1)
    }
  }
}
</script>
