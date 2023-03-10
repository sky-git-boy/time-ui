/* =========================================================================================
  File Name: main.js
  Description: main vue(js) file
==========================================================================================*/

import Vue from 'vue'
import App from './App.vue'
import 'animate.css'
import 'font-awesome/scss/font-awesome.scss'
// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' // Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// VeeValidate
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN'
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
})

// Tailwind
import '@/assets/css/main.css'
import './permission.js'
// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// Vuesax Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Feather font icon
require('./assets/css/iconfont.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
