<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
========================================================================================== -->

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'

export default {
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val)
    }
  },
  async created() {
    try {
      // await this.$auth.renewTokens();
    } catch (e) {
      console.log(e)
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme)
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize)
    })
    this.$store.dispatch('updateWindowWidth', window.innerWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    toggleClassInBody(className) {
      if (className == 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      } else if (className == 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      } else {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
      }
    },
    handleWindowResize(event) {
      this.$store.dispatch('updateWindowWidth', event.currentTarget.innerWidth)
    }
  }
}

</script>

<style>
  ::-webkit-scrollbar {
      width: 5px; /* 纵向滚动条*/
      height: 5px; /* 横向滚动条 */
      background-color: #fff;
  }

  /*定义滚动条轨道 内阴影*/
  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: #ccc;
  }

  /*定义滑块 内阴影*/
  ::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color:rgba(255, 255, 255, 0);
      border-radius: 10px;
  }
</style>
