<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto" >
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title">
                  <h4 class="mb-4">注册</h4>
                  <p>填写下表以创建新帐户.</p>
                </div>
                <div class="clearfix">
                  <vs-input
                    v-validate="'required|alpha_dash|min:3'"
                    v-model="phone"
                    data-vv-validate-on="blur"
                    label-placeholder="手机号"
                    name="phone"
                    placeholder="手机号"
                    class="w-full"
                  />

                  <vs-input
                    v-validate="'required|email'"
                    v-model="email"
                    data-vv-validate-on="blur"
                    name="email"
                    type="email"
                    label-placeholder="邮箱"
                    placeholder="邮箱"
                    class="w-full mt-6"
                  />

                  <vs-input
                    v-validate="'required|min:6|max:10'"
                    ref="password"
                    v-model="password"
                    type="password"
                    data-vv-validate-on="blur"
                    name="password"
                    label-placeholder="密码"
                    placeholder="密码"
                    class="w-full mt-6"
                  />

                  <vs-input
                    v-validate="'min:6|max:10|confirmed:password'"
                    v-model="confirm_password"
                    type="password"
                    data-vv-validate-on="blur"
                    data-vv-as="password"
                    name="confirm_password"
                    label-placeholder="确认密码"
                    placeholder="确认密码"
                    class="w-full mt-6"
                  />

                  <vs-button type="border" to="/pages/login" class="mt-6">登录</vs-button>
                  <vs-button
                    :disabled="!validateForm"
                    class="float-right mt-6"
                    @click="registerUser"
                  >注册</vs-button>
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
export default {
  data() {
    return {
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true
    }
  },
  computed: {
    validateForm() {
      return (
        this.phone != '' &&
        this.email != '' &&
        this.password != '' &&
        this.confirm_password != '' &&
        this.isTermsConditionAccepted === true
      )
    }
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
