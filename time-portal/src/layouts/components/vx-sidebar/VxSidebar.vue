<!-- =========================================================================================
    File Name: VxSidebar.vue
    Description: Sidebar Component
    Component Name: VxSidebar
========================================================================================== -->

<template>
  <div class="parentx">
    <vs-sidebar
      v-hammer:swipe.left="onSwipeLeft"
      ref="mainSidebar"
      :parent="parent"
      :hidden-background="clickNotClose"
      :reduce="reduce"
      v-model="isSidebarActive"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
      default-index="-1"
      class="sidebarx main-menu-sidebar items-no-padding"
    >
      <div @mouseenter="sidebarMouseEntered" @mouseleave="sidebarMouseLeave">
        <div
          slot="header"
          class="header-sidebar flex items-end justify-between"
        >
          <div class="logo flex items-center">
            <div @click="$router.push('/tomato')">
              <img v-if="logo" :src="logo" alt="logo" class="w-10 mr-4" >
            </div>
            <span
              v-show="isMouseEnter || !reduce"
              v-if="title"
              class="logo-text"
            >{{ title }}</span
            >
          </div>
          <div>
            <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)"
              />
            </template>
            <template v-else-if="!showCloseButton && !sidebarItemsMin">
              <feather-icon
                v-show="!reduce"
                id="btnSidebarToggler"
                icon="DiscIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                @click="toggleReduce(true)"
              />
              <feather-icon
                v-show="reduce"
                id="btnSidebarToggler"
                icon="CircleIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                @click="toggleReduce(false)"
              />
            </template>
          </div>
        </div>

        <div v-show="showShadowBottom" class="shadow-bottom"/>

        <VuePerfectScrollbar
          ref="mainSidebarPs"
          :settings="settings"
          class="scroll-area--main-sidebar pt-2"
          @ps-scroll-y="psSectionScroll"
        >
          <template v-for="(sidebarItem, index) in sidebarItems">
            <!-- GROUP ITEM HEADER -->
            <span
              v-if="sidebarItem.header && !sidebarItemsMin"
              :key="`header-${index}`"
              class="navigation-header truncate"
            >{{ sidebarItem.header }}</span
            >
            <template v-else-if="!sidebarItem.header">
              <!-- IF IT'S SINGLE ITEM -->
              <vx-sidebar-item
                v-if="!sidebarItem.submenu"
                ref="sidebarLink"
                :key="`sidebarItem-${index}`"
                :index="index"
                :to="sidebarItem.slug != 'external' ? sidebarItem.url : ''"
                :href="sidebarItem.slug == 'external' ? sidebarItem.url : ''"
                :icon="sidebarItem.icon"
                :target="sidebarItem.target"
                :is-disabled="sidebarItem.isDisabled"
              >
                <span v-show="!sidebarItemsMin" class="truncate">{{
                  sidebarItem.name
                }}</span>
                <vs-chip
                  v-if="sidebarItem.tag && (isMouseEnter || !reduce)"
                  :color="sidebarItem.tagColor"
                  class="ml-auto"
                >{{ sidebarItem.tag }}</vs-chip
                >
              </vx-sidebar-item>

              <!-- IF HAVE SUBMENU / DROPDOWN -->
              <template v-else>
                <vx-sidebar-group
                  ref="sidebarGrp"
                  :key="`group-${index}`"
                  :open-hover="openGroupHover"
                  :group="sidebarItem"
                  :group-index="index"
                  :open="isGroupActive(sidebarItem)"
                />
              </template>
            </template>
          </template>
        </VuePerfectScrollbar>
      </div>
    </vs-sidebar>
    <div
      v-hammer:swipe.right="onSwipeRightSidebarSwipeArea"
      v-if="!isSidebarActive"
      id="sidebar-swipe-area"
      class="sidebar-swipe-area"
    />
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VxSidebarGroup from './VxSidebarGroup.vue'
import VxSidebarItem from './VxSidebarItem.vue'

export default {
  name: 'VxSidebar',
  components: {
    VxSidebarGroup,
    VxSidebarItem,
    VuePerfectScrollbar
  },
  props: {
    sidebarItems: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    parent: {
      type: String
    },
    openGroupHover: {
      type: Boolean,
      default: false
    },
    reduceNotRebound: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    clickNotClose: false, // disable close sidebar on outside click
    reduce: false, // determines if sidebar is reduce - component property
    showCloseButton: false, // show close button in smaller devices
    isMouseEnter: false,
    settings: {
      // perfectscrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    windowWidth: window.innerWidth, // width of windows
    showShadowBottom: false
  }),
  computed: {
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive
      },
      set(val) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', val)
      }
    },
    reduceSidebar() {
      return Boolean(this.reduce && this.reduceButton)
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton
      },
      set(val) {
        this.$store.commit('TOGGLE_REDUCE_BUTTON', val)
      }
    },
    sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin
    },
    isGroupActive() {
      return sidebarItem => {
        const path = this.$route.fullPath
        let open = false
        const func = function(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach(item => {
              if (path == item.url) {
                open = true
              } else if (item.submenu) {
                func(item)
              }
            })
          }
        }
        func(sidebarItem)
        return open
      }
    }
  },
  watch: {
    reduce(val) {
      if (val == true) {
        this.$store.dispatch('updateSidebarWidth', 'reduced')
      } else {
        this.$store.dispatch('updateSidebarWidth', 'default')
      }

      setTimeout(function() {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    },
    reduceButton() {
      this.setSidebarWidth()
    },
    $route() {
      if (this.isSidebarActive && this.showCloseButton) { this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false) }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleWindowResize)
    })
    this.setSidebarWidth()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    sidebarMouseEntered() {
      if (this.reduce) this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', false)
      this.isMouseEnter = true
    },
    sidebarMouseLeave() {
      if (this.reduce) {
        this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', true)
      }
      this.isMouseEnter = false
    },
    toggleReduce(val) {
      this.reduceButton = val
      this.setSidebarWidth()
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth
      this.setSidebarWidth()
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        if (this.windowWidth < 992) { this.$store.commit('UPDATE_WINDOW_BREAKPOINT', 'md') } else this.$store.commit('UPDATE_WINDOW_BREAKPOINT', 'lg')

        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)
        if (this.reduceButton) this.reduce = false
        // this.reduceButton = false;
        this.showCloseButton = true
        this.clickNotClose = false
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar')
        this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', false)
      } else {
        this.$store.commit('UPDATE_WINDOW_BREAKPOINT', 'xl')
        if (this.reduceButton) this.reduce = true
        else this.reduce = false

        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
        if (this.reduceButton && !this.isMouseEnter) { this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', true) } else this.$store.commit('UPDATE_SIDEBAR_ITEMS_MIN', false)

        this.clickNotClose = true
        this.showCloseButton = false
        if (this.reduceSidebar) { this.$store.dispatch('updateSidebarWidth', 'reduced') } else this.$store.dispatch('updateSidebarWidth', 'default')
      }
    },
    psSectionScroll() {
      if (this.$refs.mainSidebarPs.$el.scrollTop > 0) { this.showShadowBottom = true } else this.showShadowBottom = false
    },
    onSwipeLeft() {
      if (this.isSidebarActive && this.showCloseButton) { this.isSidebarActive = false }
    },
    onSwipeRightSidebarSwipeArea() {
      if (!this.isSidebarActive && this.showCloseButton) { this.isSidebarActive = true }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxSidebar.scss";
</style>
