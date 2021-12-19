<template>
  <div class="content c-edition">
    <div class="img-center"/>
    <div class="time-box">
      <span class="time">{{ formatMin }}:{{ formatSec }}</span>
      <div class="control-box">
        <i
          v-show="time.status === 1 || time.status === 3"
          class="btn fa fa-play"
          @click="handleStart"
        />
        <i v-show="time.status === 2" class="btn fa fa-pause" @click="handleStop"/>
        <i v-show="time.status === 3" class="btn fa fa-undo" @click="handleRestart"/>
        <i v-show="time.status === 4" class="btn fa fa-forward" @click="handleJump"/>
      </div>
    </div>
    <div class="img-bottom"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Tomato',

  computed: {
    ...mapState(['time']),

    ...mapGetters(['formatMin', 'formatSec'])
  },

  created() {
    this.$store.dispatch({
      type: 'loaclDataInit'
    })
  },

  methods: {
    handleStart() {
      this.$store.dispatch({
        type: 'startTime'
      })
    },
    handleStop() {
      this.$store.dispatch({
        type: 'stopTime'
      })
    },
    handleRestart() {
      this.$store.dispatch({
        type: 'restartTime'
      })
    },
    handleJump() {
      this.$store.dispatch({
        type: 'jumpTime'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/tomato/config.scss";
@import "@/assets/scss/vuesax/tomato/mixins.scss";

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 160px;
  width: 100%;
  height: 580px;
  background-color: $cl-aux5;

  .img-center {
    width: 90%;
    height: 90%;
    background: center / contain no-repeat
        url("../../assets/images/tomato/irregularity-1.svg"),
      center / contain no-repeat
        url("../../assets/images/tomato/irregularity-2.svg"),
      center / contain no-repeat
        url("../../assets/images/tomato/irregularity-3.svg");
    z-index: 10;
  }

  .img-bottom {
    position: fixed;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: 50vh;
    background: bottom / contain no-repeat
      url("../../assets/images/tomato/bottom.svg");

    @include respond-to(lg) {
      background: bottom / cover no-repeat
        url("../../assets/images/tomato/bottom.svg");
    }
  }

  .time-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background-color: $cl-aux1;
    z-index: 100;

    .time {
      color: $cl-main1;
      font-size: 66px;
      line-height: 110px;
    }

    .control-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 60%;
      height: 42px;

      .btn {
        display: block;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        border: 2px solid $cl-main1;
        text-align: center;
        line-height: 38px;
        color: $cl-main1;
        font-size: 20px;
        -webkit-user-select: none; /*webkit浏览器*/
        -moz-user-select: none; /*火狐*/
        -ms-user-select: none; /*IE10*/
        user-select: none;
        cursor: pointer;
      }
    }
  }
}
</style>
