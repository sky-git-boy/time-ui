<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
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
                <div class="vx-card__title">
                  <h4 class="mb-4">注册</h4>
                  <p>填写下表以创建新帐户.</p>
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
                  <span class="text-danger text-sm">{{ errors.first('手机号') }}</span>

                  <vs-input
                    v-validate="'required|email'"
                    v-model="email"
                    data-vv-validate-on="blur"
                    name="邮箱"
                    type="email"
                    label-placeholder="邮箱"
                    placeholder="邮箱"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('邮箱') }}</span>

                  <vs-input
                    v-validate="'required|min:6|max:10'"
                    ref="password"
                    v-model="password"
                    type="password"
                    data-vv-validate-on="blur"
                    name="密码"
                    label-placeholder="密码"
                    placeholder="密码"
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
                  <span class="text-danger text-sm">{{ errors.first('确认密码') }}</span>

                  <vs-button type="border" to="/pages/login" class="mt-6">登录</vs-button>
                  <vs-button :disabled="!validateForm" class="float-right mt-6" @click="registerUser">注册</vs-button>
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

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: []
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.phone != '' && this.email != '' && this.password != '' && this.confirm_password != '' && this.isTermsConditionAccepted === true
    }
  },
  created() {
    slide().then(res => {
      this.slideList = res.data
    })
  },
  methods: {
    registerUser() {
      if (!this.validateForm) return false
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.notifyAlreadyLogedIn()
        return
      }
      const payload = {
        userDetails: {
          email: this.email,
          password: this.password,
          phone: this.phone
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('auth/registerUser', payload)
    },
    notifyAlreadyLogedIn() {
      this.$vs.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })
    }
  }
}
</script>
