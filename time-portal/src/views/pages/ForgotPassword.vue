<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <swiper :options="swiperOption">
                <swiper-slide v-for="item in slideList" :key="item.id">
                  <img :src="item.picUrl" alt="register" class="mx-auto">
                </swiper-slide>
                <div slot="button-prev" class="swiper-button-prev swiper-button-white"/>
                <div slot="button-next" class="swiper-button-next swiper-button-white"/>
              </swiper>
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">重置密码</h4>
                  <p>请输入您的联系方式，我们将向您发送有关如何重置密码的说明.</p>
                </div>
                <vs-input
                  v-model="phone"
                  type="phone"
                  label-placeholder="手机号"
                  class="w-full mb-8"
                />
                <vs-input v-model="yzm" type="code" label-placeholder="验证码" class="w-full mb-8" />
                <vs-button
                  type="border"
                  to="/pages/login"
                  class="px-4 w-full md:w-auto"
                >返回登录</vs-button>
                <vs-button
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                >重置密码</vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { slide } from '@/api/slide'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      phone: '',
      yzm: '',
      photos: [],
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: []
    }
  },
  created() {
    slide().then(res => {
      this.slideList = res.data
    })
  }
}
</script>
