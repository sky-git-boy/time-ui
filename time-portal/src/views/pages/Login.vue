<template>
  <div
    id="page-login"
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <swiper :options="swiperOption">
                <swiper-slide v-for="item in slideList" :key="item.id">
                  <img :src="item.picUrl" alt="register" class="mx-auto">
                </swiper-slide>
                <div slot="button-prev" class="swiper-button-prev swiper-button-white"/>
                <div slot="button-next" class="swiper-button-next swiper-button-white"/>
              </swiper>
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">登录</h4>
                  <p>欢迎使用时间轮，请登录你的账号.</p>
                </div>
                <vs-input
                  v-model="username"
                  name="username"
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="手机号"
                  class="w-full no-icon-border"
                />

                <vs-input
                  v-model="password"
                  type="password"
                  name="password"
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="密码"
                  class="w-full mt-6 no-icon-border"
                />

                <div class="flex flex-wrap justify-between my-5">
                  <router-link to="/pages/forgot-password">忘记密码</router-link>
                </div>

                <vs-button type="border" @click="registerUser">注册</vs-button>
                <vs-button class="float-right" @click="handleLogin">登录</vs-button>
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
      username: '',
      password: '',
      swiperOption: {
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: []
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
    registerUser() {
      this.$router.push('/pages/register')
    },
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    handleLogin() {
      if (!this.checkLogin()) return

      this.$vs.loading()

      const payload = {
        userDetails: {
          username: this.username,
          password: this.password
        }
      }

      this.$store.dispatch('auth/login', payload)
        .then(() => { this.$vs.loading.close() })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
