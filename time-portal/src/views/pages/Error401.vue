<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
      <img src="@/assets/images/pages/not-authorized.png" alt="graphic-not-authorized" class="mx-auto mb-4">
      <h1 class="sm:mx-0 mx-4 sm:mb-12 mb-8 text-5xl d-theme-heading-color">You are not authorized!</h1>
      <p class="sm:mx-0 mx-4 sm:mb-12 mb-8 d-theme-text-inverse">paraphonic unassessable foramination Caulopteris worral Spirophyton encrimson esparcet aggerate chondrule restate whistler shallopy biosystematy area bertram plotting unstarting quarterstaff.</p>
      <div class="flex">
        <vs-button size="large" to="/" style="margin-right: 40px">Back to Home</vs-button>
        <vs-button size="large" @click="logout">Back to Login</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
  methods: {
    logout() {
      removeToken()
      localStorage.removeItem('userInfo')
      this.$router.push('/pages/login').catch(() => {})
    }
  }
}
</script>
