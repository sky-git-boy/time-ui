<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
========================================================================================== -->

<template>
  <footer :class="classes" class="the-footer flex-wrap justify-between">
    <span>THE TIME MANAGER SYSTEM</span>
    <span class="md:flex hidden items-center">
      <span>CREATR BY SKY</span>
    </span>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
