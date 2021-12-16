<template>
  <div
    :class="isPlay ? 'active outer' : 'outer'"
    @click="togglePlay"
    :style="{ backgroundImage: 'url(' + noise.content.picurl + ')' }"
  >
    <div class="inner"></div>
  </div>
</template>

<script>
export default {
  name: "WhiteNoise",
  data() {
    return {
      isPlay: false
    };
  },
  props: {
    noise: {
      type: Object
    }
  },
  methods: {
    togglePlay() {
      if (this.noise.audio.paused) {
        this.$emit("togle-noise-play", true);
        this.isPlay = true;
      } else {
        this.$emit("togle-noise-play", false);
        this.isPlay = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/tomato/config.scss";
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 240px;
  background-color: $cl-aux2;
  background-size: cover;
  border-radius: 50%;
  border: 12px solid $cl-aux1;
  transition: all 0.3s ease;
  cursor: pointer;

  &.active {
    animation: rotate 6s linear 0.2s infinite;
  }

  .inner {
    width: 18px;
    height: 18px;
    border: 3px solid $cl-aux1;
    background-color: $cl-font3;
    border-radius: 50%;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
