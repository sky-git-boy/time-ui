<template>
  <div class="bg-box">
    <div :style="{ backgroundImage: 'url(' + getNoisePic() + ')' }" class="bg"/>
    <div class="content">
      <vs-button type="line" color="primary" @click="handleLeft">
        <feather-icon icon="ChevronLeftIcon" />
      </vs-button>
      <div
        :class="isPlay ? 'active outer' : 'outer'"
        :style="{ backgroundImage: 'url(' + getNoisePic() + ')' }"
        @click="togglePlay"
      >
        <div class="inner">
          <audio id="myAudio" :src="getNoiseMusic()"/>
        </div>
      </div>
      <vs-button type="line" color="primary" @click="handleRight">
        <feather-icon icon="ChevronRightIcon" />
      </vs-button>
    </div>
  </div>
</template>

<script>
import { getNoiseList } from '@/api/noise'
export default {
  name: 'Music',
  data() {
    return {
      index: 0,
      // 播放标识
      isPlay: false,
      // 白噪音列表
      noiseList: {}
    }
  },
  created() {
    getNoiseList().then(res => {
      this.noiseList = res.data
    })
  },
  methods: {
    togglePlay() {
      if (!this.isPlay) {
        document.getElementById('myAudio').play()
        this.isPlay = true
      } else {
        document.getElementById('myAudio').load()
        this.isPlay = false
      }
    },
    handleLeft() {
      if (this.index > 0) { this.index-- }
    },
    handleRight() {
      if (this.index < this.noiseList.length) { this.index++ }
    },
    getNoiseMusic() {
      return this.noiseList[this.index] === undefined ? 'https://personal-time.oss-cn-shenzhen.aliyuncs.com/noice/bigsurf.mp3' : this.noiseList[this.index].musicUrl
    },
    getNoisePic() {
      return this.noiseList[this.index] === undefined ? 'https://personal-time.oss-cn-shenzhen.aliyuncs.com/img/bigsurf.jpg' : this.noiseList[this.index].picUrl
    }
  }
}
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

select {
  background: transparent;
  outline: none;
  border: none;
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
