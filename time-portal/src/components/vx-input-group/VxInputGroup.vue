<template>
  <div class="vx-input-group flex">

    <!-- SLOT: PREPEND -->
    <div v-if="this.$slots.prepend" :class="prependClasses" class="vx-input-group-prepend flex">
      <slot name="prepend"/>
    </div>

    <!-- SLOT: DEFAULT -->
    <div class="vx-input-group-default flex-grow">
      <slot/>
    </div>

    <!-- SLOT: APPEND -->
    <div v-if="this.$slots.append" :class="appendClasses" class="vx-input-group-append flex">
      <slot name="append"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VxInputGroup',
  props: {
    prependClasses: {
      type: String
    },
    appendClasses: {
      type: String
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxInputGroup.scss";
</style>
