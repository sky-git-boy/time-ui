<template>
  <div class="nav-box">
    <span :class="currNav === 'Tomato' ? 'active nav' : 'nav'" @mousedown="toPage('Tomato')">番茄钟</span>
    <span :class="currNav === 'Music' ? 'active nav' : 'nav'" @mousedown="toPage('Music')">白噪音</span>
  </div>
</template>

<script>
export default {
  name: "HeadNav",

  data() {
    return {
      currNav: ""
    };
  },

  methods: {
    // 切换路由
    toPage(page) {
      if (this.$route.name !== page) {
        this.$router.replace({ name: page });
        this.currNav = page;
      }
    }
  },

  watch: {
    // 监听路由变化，改变样式
    $route(to) {
      this.currNav = to.name;
    }
  },

  mounted() {
    // 初始化
    this.currNav = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/tomato/config.scss";

.nav-box {
  position: absolute;
  margin-top: 60px;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .nav {
    margin: 0 30px;
    font-weight: bold;
    font-size: 20px;
    color: $cl-font3;
    text-shadow: 2px 2px 4px $cl-aux1;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: $cl-font2;
      text-shadow: 0px 5px 10px $cl-shallow1;
    }

    &.active {
      color: $cl-main1;
    }
  }
}
</style>
