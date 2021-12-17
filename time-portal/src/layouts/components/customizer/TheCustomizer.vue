<!-- =========================================================================================
    File Name: TheCustomizer.vue
    Description: Template Customizer
    Component Name: TheCustomizer
========================================================================================== -->

<template>
  <div id="theme-customizer">
    <vs-button color="primary" type="filled" class="customizer-btn" icon-pack="feather" icon="icon-settings" @click.stop="active=!active"/>
    <vs-sidebar v-model="active" hidden-background position-right click-not-close class="items-no-padding">
      <div class="h-full">
        <div class="customizer-header mt-6 flex items-center justify-between px-6">
          <div>
            <h4>THEME CUSTOMIZER</h4>
            <small>Customize & Preview in Real Time</small>
          </div>
          <feather-icon icon="XIcon" class="cursor-pointer" @click.stop="active = false"/>
        </div>
        <vs-divider class="mb-0"/>

        <VuePerfectScrollbar :settings="settings" class="scroll-area--customizer pt-4 pb-6">
          <div class="px-6">
            <!-- THEME COLORS -->
            <div>
              <h5 class="mb-4">Theme Color</h5>
              <ul class="clearfix">
                <li v-for="color in themeColors" :style="{backgroundColor: color}" :class="{'shadow-outline': color == primaryColor}" :key="color" class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left" @click="updatePrimaryColor(color)"/>
                <li :style="{backgroundColor: customPrimaryColor}" :class="{'shadow-outline': customPrimaryColor == primaryColor}" class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left" @click="updatePrimaryColor(customPrimaryColor)"/>
                <li class="float-left"><input v-model="customPrimaryColor" class="w-10 cursor-pointer h-10 rounded-lg m-2" type="color" ></li>

              </ul>
            </div>
            <vs-divider/>

            <!-- THEME -->
            <div class="mt-4">
              <!-- <vs-switch v-model="theme_dark" vs-icon-off="wb_sunny" vs-icon-on="brightness_2" color="dark" /> -->
              <h5 class="mb-2">Dark Mode</h5>
              <div>
                <vs-radio v-model="theme" class="mr-4" vs-value="light">Light</vs-radio>
                <vs-radio v-model="theme" class="mr-4" vs-value="dark">Dark</vs-radio>
                <vs-radio v-model="theme" vs-value="semi-dark">Semi Dark</vs-radio>
              </div>
            </div>
            <vs-divider/>

            <!-- COLLAPSE SIDEBAR -->
            <div class="mt-4 flex justify-between">
              <h5>Collapse Sidebar</h5>
              <vs-switch v-model="reduced_sidebar"/>
            </div>

            <vs-divider/>

            <!-- NAVBAR COLOR -->
            <div class="mt-4">
              <h5>Navbar Color</h5>
              <ul class="clearfix">

                <!-- WHITE COLOR -->
                <li
                  :class="navbarColorOptionClasses('#fff')"
                  class="w-10 m-2 h-10 rounded-lg bg-white float-left cursor-pointer border border-solid border-grey-light"
                  @click="navbarColorLocal = '#fff' "/>

                <!-- THEME COLORS -->
                <li
                  v-for="color in themeColors"
                  :class="navbarColorOptionClasses(color)"
                  :style="{backgroundColor: color}"
                  :key="color"
                  class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                  @click="navbarColorLocal = color" />

                <!-- CUSTOM COLOR -->
                <li
                  :class="navbarColorOptionClasses(navbarColorOptionClasses)"
                  :style="{backgroundColor: customNavbarColor}"
                  class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                  @click="navbarColorLocal = customNavbarColor" />

                <li class="float-left">
                  <input v-model="customNavbarColor" class="w-10 cursor-pointer h-10 rounded-lg m-2" type="color" >
                </li>
              </ul>
            </div>
            <vs-divider/>

            <!-- NAVBAR TYPE -->
            <div class="mt-4">
              <h5 class="mb-2">Navbar Type</h5>
              <div>
                <vs-radio v-model="navbarTypeLocal" class="mr-4" vs-value="navbar-hidden">Hidden</vs-radio>
                <vs-radio v-model="navbarTypeLocal" class="mr-4" vs-value="navbar-static">Static</vs-radio>
                <vs-radio v-model="navbarTypeLocal" class="mr-4" vs-value="navbar-sticky">Sticky</vs-radio>
                <vs-radio v-model="navbarTypeLocal" vs-value="navbar-floating">Floating</vs-radio>
              </div>
            </div>
            <vs-divider/>

            <!-- FOOTER TYPE -->
            <div class="mt-4">
              <h5 class="mb-2">Footer Type</h5>
              <div>
                <vs-radio v-model="footerTypeLocal" class="mr-4" vs-value="hidden">Hidden</vs-radio>
                <vs-radio v-model="footerTypeLocal" class="mr-4" vs-value="static">Static</vs-radio>
                <vs-radio v-model="footerTypeLocal" vs-value="sticky">Sticky</vs-radio>
              </div>
            </div>
            <vs-divider/>

            <!-- SHOW SCROLL TO TOP -->
            <div class="mt-4 flex justify-between">
              <h5 class="mb-2">Hide Scroll To Top</h5>
              <vs-switch v-model="hideScrollToTopLocal"/>
            </div>
            <vs-divider/>

            <!-- ROUTER ANIMATION -->
            <div class="mt-4">
              <h5 class="mb-2">Router Animation {{ routerTransitionLocal }}</h5>
              <vs-select v-model="routerTransitionLocal">
                <vs-select-item v-for="(item,index) in routerTransitionsList" :key="index" :value="item.value" :text="item.text" />
              </vs-select>
            </div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    navbarType: {
      type: String,
      required: true
    },
    navbarColor: {
      type: String,
      required: true,
      default: '#fff'
    },
    footerType: {
      type: String,
      required: true
    },
    routerTransition: {
      type: String,
      required: true
    },
    hideScrollToTop: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      active: false,
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      customPrimaryColor: '#3DC9B3',
      customNavbarColor: '#3DC9B3',
      routerTransitionsList: [
        { text: 'Zoom Fade', value: 'zoom-fade' },
        { text: 'Slide Fade', value: 'slide-fade' },
        { text: 'Fade Bottom', value: 'fade-bottom' },
        { text: 'Fade', value: 'fade' },
        { text: 'Zoom Out', value: 'zoom-out' },
        { text: 'None', value: 'none' }
      ],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.60
      }
    }
  },
  computed: {
    theme: {
      get() {
        return this.$store.state.theme
      },
      set(val) {
        this.$store.dispatch('updateTheme', val)
      }
    },
    reduced_sidebar: {
      get() { return this.$store.state.reduceButton },
      set(val) { this.$store.commit('TOGGLE_REDUCE_BUTTON', val) }
    },
    navbarTypeLocal: {
      get() {
        return 'navbar-' + this.navbarType
      },
      set(val) {
        this.$emit('updateNavbar', val.replace('navbar-', ''))
      }
    },
    navbarColorLocal: {
      get() { return this.navbarColor },
      set(val) {
        if (this.navbarType == 'static') return
        this.$emit('updateNavbarColor', val)
      }
    },
    footerTypeLocal: {
      get() { return this.footerType },
      set(val) { this.$emit('updateFooter', val) }
    },
    routerTransitionLocal: {
      get() { return this.routerTransition },
      set(val) { this.$emit('updateRouterTransition', val) }
    },
    primaryColor: {
      get() { return this.$store.state.themePrimaryColor },
      set(val) { this.$store.commit('UPDATE_PRIMARY_COLOR', val) }
    },
    hideScrollToTopLocal: {
      get() { return this.hideScrollToTop },
      set(val) { this.$emit('toggleHideScrollToTop', val) }
    },

    // Navbar color options classes
    navbarColorOptionClasses() {
      return (color) => {
        const classes = {}
        if (color == this.navbarColorLocal) classes['shadow-outline'] = true
        if (this.navbarTypeLocal == 'static') classes['cursor-not-allowed'] = true
        return classes
      }
    }
  },
  methods: {
    updatePrimaryColor(color) {
      this.primaryColor = color
      this.$vs.theme({ primary: color })
    }
  }
}
</script>

<style lang="scss">
#theme-customizer {
    .vs-sidebar{
        position: fixed;
        z-index: 52000;
        width: 400px;
        max-width: 90vw;

    }
}

.customizer-btn{
    position: fixed;
    top:50%;
    right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 50000;

    .vs-icon{
        animation: spin 1.5s linear infinite;
    }
}

.scroll-area--customizer {
    height: calc(100% - 5rem);
}
</style>
