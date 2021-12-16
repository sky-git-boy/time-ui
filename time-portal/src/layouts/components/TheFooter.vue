<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
========================================================================================== -->

<template>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <span>THE TIME MANAGER SYSTEM</span>
    <span class="md:flex hidden items-center">
      <span>CREATR BY SKY</span>
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String
    }
  }
};
</script>
