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
                  <p>请输入您的联系方式，我们将向您发送有关重置密码的短信.</p>
                </div>
                <div class="clearfix">
                  <vs-input
                    v-validate="'required|alpha_dash|min:11'"
                    v-model="phone"
                    data-vv-validate-on="blur"
                    label-placeholder="手机号"
                    name="手机号"
                    placeholder="手机号"
                    class="w-full" />

                  <div class="flex">
                    <vs-input
                      v-model="yzm"
                      data-vv-validate-on="blur"
                      name="验证码"
                      type="yzm"
                      label-placeholder="验证码"
                      placeholder="验证码"
                      class="w-3/5 mt-6"/>
                    <vs-button :disabled="sendFlag" class="w-2/5 mt-6" @click="handleSend">
                      {{ buttonText }}
                    </vs-button>
                  </div>

                  <vs-input
                    v-validate="'required|min:6|max:10'"
                    ref="password"
                    v-model="password"
                    type="password"
                    data-vv-validate-on="blur"
                    name="密码"
                    label-placeholder="新密码"
                    placeholder="新密码"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('密码') }}</span>

                  <vs-input
                    v-validate="'min:6|max:10|confirmed:password'"
                    v-model="confirm_password"
                    type="password"
                    data-vv-validate-on="blur"
                    data-vv-as="password"
                    name="确认密码"
                    label-placeholder="确认密码"
                    placeholder="确认密码"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('确认密码') }}<br></span>

                  <vs-button type="border" to="/pages/login" class="mt-6">登录</vs-button>
                  <vs-button :disabled="!validateForm" class="float-right mt-6" @click="handleSubmit">重置密码</vs-button>
                </div>
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
import { sendResetMail, resetPwd } from '@/api/resetpwd'
import router from '@/router'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      // 手机号
      phone: '',
      // 验证码
      yzm: '',
      // 密码
      password: '',
      // 确认密码
      confirm_password: '',
      // 发送标识
      sendFlag: false,
      // 倒计时
      wait: 120,
      // 发送验证码按钮value
      buttonText: '发送验证码',
      // 配置轮播图
      swiperOption: {
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      // 轮播图
      slideList: []
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.phone != '' && this.yzm != '' && this.password != '' && this.confirm_password != ''
    }
  },
  created() {
    const params = {
      status: '0'
    }
    slide(params).then(res => {
      this.slideList = res.data
    })
  },
  methods: {
    // 提交
    handleSubmit() {
      const data = {
        phone: this.phone,
        yzm: this.yzm,
        password: this.password
      }
      // 重置密码
      resetPwd(data).then(res => {
        if (res.code == 200) {
          this.$vs.notify({
            title: 'Success',
            text: '重置密码成功',
            color: 'success'
          })
          router.push({
            path: '/pages/login'
          })
        }
      }).catch(e => {
        this.$vs.notify({
          title: 'Fail',
          text: '重置密码失败',
          color: 'danger'
        })
      })
    },
    handleSend() {
      if (this.phone !== '') {
        const data = {
          phone: this.phone
        }
        sendResetMail(data).then(res => {
          if (res.code == 200) {
            this.countDowm()
          } else {
            this.$vs.notify({
              title: 'Fail',
              text: '消息发送失败',
              color: 'danger'
            })
          }
        })
      }
    },
    countDowm() {
      if (this.wait == 0) {
        this.sendFlag = false
        this.buttonText = '发送验证码'
        this.wait = 120
      } else {
        this.sendFlag = true
        this.buttonText = this.wait + 's'
        this.wait--
        setTimeout(this.countDowm, 1000)
      }
    }
  }
}
</script>
