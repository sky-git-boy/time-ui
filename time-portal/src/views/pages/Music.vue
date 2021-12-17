<template>
  <div class="bg-box">
    <div :style="{ backgroundImage: 'url(' + noise.content.picurl + ')' }" class="bg"/>
    <div class="content">
      <WhiteNoise :noise="noise" @togle-noise-play="toggleNoisePlay($event)"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import WhiteNoise from '@/components/music/WhiteNoise.vue'

export default {
  name: 'Music',
  components: {
    WhiteNoise
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['noise'])
  },
  mounted() {
    this.loadWhiteNoise()
  },
  methods: {
    ...mapMutations(['playOrPauseNoise', 'loadWhiteNoise']),

    toggleNoisePlay(e) {
      this.playOrPauseNoise({ isPlay: e })
    },

    toggleNoiseMusic() {
      this.playOrPauseNoise({ isPlay: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/tomato/config.scss";

.bg-box {
  position: relative;
  padding-top: 54px;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: $cl-aux5;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    filter: blur(24px) brightness(108%);
    -webkit-filter: blur(24px) brightness(108%);
    z-index: 1;
  }

  .content {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .footer {
    position: fixed;
    display: flex;
    justify-content: center;
    width: inherit;
    bottom: 0;
    width: 100%;
    height: 90px;
    z-index: 2;

    .box {
      width: 120px;
      height: 48px;
      border-radius: 100px;
      background-color: $cl-main1;
      text-align: center;
      box-shadow: 0 8px 24px -6px $cl-main1;
      cursor: pointer;

      .txt {
        color: $cl-aux1;
        font-size: 22px;
        font-weight: 500;
        line-height: 48px;
        user-select: none;
      }
    }
  }
}
</style>
