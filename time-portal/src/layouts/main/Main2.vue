<template>
  <div class="layout--main">
    <head-nav/>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
export default {
  components: {
    HeadNav
  }
}
</script>

<style>
</style>
