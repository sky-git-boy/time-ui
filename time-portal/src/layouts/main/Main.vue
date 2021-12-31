<template>
  <div :class="[navbarClasses, footerClasses, { 'app-page': isAppPage }]" class="layout--main">
    <vx-sidebar
      :sidebar-items="sidebarItems"
      :logo="require('@/assets/images/logo/logo.png')"
      title="时间轮"
      parent=".layout--main"
    />

    <div id="content-area" :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]">
      <div id="content-overlay"/>

      <div class="content-wrapper">
        <the-navbar :navbar-color="navbarColor" />
        <div class="router-view">
          <div :class="{ 'mt-0': navbarType == 'hidden' }" class="router-content">
            <div class="content-area__content">
              <back-to-top v-if="!hideScrollToTop" bottom="5%" visibleoffset="500">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg" />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle"/>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <for-test/>

      <the-footer/>
    </div>
  </div>
</template>

<script>
import VxSidebar from '@/layouts/components/vx-sidebar/VxSidebar.vue'
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import themeConfig from '@/../themeConfig.js'
import sidebarItems from '@/layouts/components/vx-sidebar/sidebarItems.js'
import BackToTop from 'vue-backtotop'
import ForTest from '@/views/ForTest.vue'
export default {
  components: {
    VxSidebar,
    TheNavbar,
    TheFooter,
    BackToTop,
    ForTest
  },
  data() {
    return {
      navbarType: themeConfig.navbarType || 'floating',
      navbarColor: themeConfig.navbarColor || '#fff',
      footerType: themeConfig.footerType || 'static',
      routerTransition: themeConfig.routerTransition || 'none',
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      sidebarItems: sidebarItems,
      disableCustomizer: themeConfig.disableCustomizer,
      windowWidth: window.innerWidth, // width of windows
      hideScrollToTop: themeConfig.hideScrollToTop,
      disableThemeTour: themeConfig.disableThemeTour
    }
  },
  computed: {
    isAppPage() {
      if (this.$route.path.includes('/apps/')) return true
      else return false
    },
    isThemeDark() {
      return this.$store.state.theme == 'dark'
    },
    sidebarWidth() {
      return this.$store.state.sidebarWidth
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay
    },
    contentAreaClass() {
      if (this.sidebarWidth == 'default') return 'content-area-default'
      else if (this.sidebarWidth == 'reduced') return 'content-area-reduced'
      else if (this.sidebarWidth) return 'content-area-full'
    },
    navbarClasses() {
      return {
        'navbar-hidden': this.navbarType == 'hidden',
        'navbar-sticky': this.navbarType == 'sticky',
        'navbar-static': this.navbarType == 'static',
        'navbar-floating': this.navbarType == 'floating'
      }
    },
    footerClasses() {
      return {
        'footer-hidden': this.footerType == 'hidden',
        'footer-sticky': this.footerType == 'sticky',
        'footer-static': this.footerType == 'static'
      }
    }
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark(val) {
      if (this.navbarColor == '#fff' && val) {
        this.updateNavbarColor('#10163a')
      } else {
        this.updateNavbarColor('#fff')
      }
    }
  },
  created() {
    this.setSidebarWidth()
    if (this.navbarColor == '#fff' && this.isThemeDark) {
      this.updateNavbarColor('#10163a')
    } else {
      this.updateNavbarColor(this.navbarColor)
    }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title
    },
    updateNavbarColor(val) {
      this.navbarColor = val
      if (val == '#fff') this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar')
        this.disableThemeTour = true
      } else if (this.windowWidth < 1200) {
        this.$store.dispatch('updateSidebarWidth', 'reduced')
      } else {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val
    }
  }
}
</script>
