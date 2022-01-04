<template>
  <ul class="vx-timeline">
    <li v-for="item in data" :key="item.id">
      <div :class="getItemColor(item.type)" class="timeline-icon">
        <feather-icon :icon="getItemIcon(item.type)" svg-classes="text-white stroke-current w-5 h-5" />
      </div>
      <div class="timeline-info">
        <p class="font-semibold">{{ item.content }}</p>
      </div>
      <small class="text-grey activity-e-time">{{ item.createTime }}</small>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VxTimeline',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    getItemColor(type) {
      return type == '0' ? 'bg-success' : 'bg-warning'
    },
    getItemIcon(type) {
      return type == '0' ? 'CheckIcon' : 'AlertCircleIcon'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxTimeline.scss";
</style>
