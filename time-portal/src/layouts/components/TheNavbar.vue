<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar :color="navbarColor" :class="classObj" class="vx-navbar navbar-custom">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <template v-if="breakpoint != 'md'">
          <!-- STARRED PAGES - FIRST 10 -->
          <ul class="vx-navbar__starred-pages">
            <draggable
              v-model="starredPagesLimited"
              :group="{ name: 'pinList' }"
              class="flex cursor-move"
            >
              <li v-for="page in starredPagesLimited" :key="page.url" class="starred-page">
                <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                  <feather-icon
                    :icon="page.labelIcon"
                    svg-classes="h-6 w-6"
                    class="p-2 cursor-pointer"
                    @click="$router.push(page.url)"
                  />
                </vx-tooltip>
              </li>
            </draggable>
          </ul>

          <!-- STARRED PAGES MORE -->
          <div v-if="starredPagesMore.length" class="vx-navbar__starred-pages--more-dropdown">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <feather-icon icon="ChevronDownIcon" svg-classes="h-4 w-4" class="cursor-pointer p-2"/>
              <vs-dropdown-menu>
                <ul class="vx-navbar__starred-pages-more--list">
                  <draggable
                    v-model="starredPagesMore"
                    :group="{ name: 'pinList' }"
                    class="cursor-move"
                  >
                    <li
                      v-for="page in starredPagesMore"
                      :key="page.url"
                      class="starred-page--more flex items-center cursor-pointer"
                      @click="$router.push(page.url)"
                    >
                      <feather-icon :icon="page.labelIcon" svg-classes="h-5 w-5" class="ml-2 mr-1"/>
                      <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                    </li>
                  </draggable>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <div class="bookmark-container">
            <feather-icon
              :svg-classes="[
                'stoke-current text-warning',
                { 'text-white': navbarColor != '#fff' }
              ]"
              icon="StarIcon"
              class="cursor-pointer p-2"
              @click.stop="
                showBookmarkPagesDropdown = !showBookmarkPagesDropdown
              "
            />
            <div
              v-click-outside="outside"
              v-if="showBookmarkPagesDropdown"
              class="absolute bookmark-list w-1/3 xl:w-1/4 mt-4"
            >
              <vx-auto-suggest
                :auto-focus="true"
                :data="navbarSearchAndPinList"
                input-classses="w-full"
                show-action
                show-pinned
                background-overlay
                @selected="selected"
                @actionClicked="actionClicked"
              />
            </div>
          </div>
        </template>

        <vs-spacer/>

        <!-- NOTIFICATIONS -->
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer ml-4">
          <feather-icon
            :badge="unreadNotifications.length"
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
          />
          <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">{{ unreadNotifications.length }} 条</h3>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              :settings="settings"
              class="scroll-area--nofications-dropdown p-0 mb-10"
            >
              <ul class="bordered-items">
                <li
                  v-for="ntf in unreadNotifications"
                  :key="ntf.noticeId"
                  class="flex justify-between px-4 py-4 notification cursor-pointer"
                >
                  <div class="flex items-start">
                    <feather-icon
                      :icon="ntf.remark"
                      :svg-classes="[
                        `text-${randomCatory(ntf.remark)}`,
                        'stroke-current mr-1 h-6 w-6'
                      ]"
                    />
                    <div class="mx-2">
                      <span
                        :class="[`text-${randomCatory(ntf.remark)}`]"
                        class="font-medium block notification-title"
                      >{{ ntf.noticeTitle }}</span>
                      <small>{{ ntf.noticeContent }}</small>
                    </div>
                  </div>
                  <small class="mt-1 whitespace-no-wrap">
                    {{ elapsedTime(ntf.createTime) }}
                  </small>
                </li>
              </ul>
            </VuePerfectScrollbar>
            <div
              class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
            >
              <span>下拉查看所有通知</span>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <!-- <small>{{ activeUserInfo.userRole }}</small> -->
            <!-- <small>超级用户</small> -->
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
              <img
                key="localImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              >
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/profile')"
                >
                  <feather-icon icon="UserIcon" svg-classes="w-4 h-4"/>
                  <span class="ml-2">个人主页</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/plus-user')"
                >
                  <feather-icon icon="AwardIcon" svg-classes="w-4 h-4"/>
                  <span class="ml-2">Plus 会员</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/todo')"
                >
                  <feather-icon icon="CheckSquareIcon" svg-classes="w-4 h-4"/>
                  <span class="ml-2">Todo</span>
                </li>
                <vs-divider class="m-1"/>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon icon="LogOutIcon" svg-classes="w-4 h-4"/>
                  <span class="ml-2">退出</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import { notice } from '@/api/notice'

export default {
  name: 'TheNavbar',
  directives: {
    'click-outside': {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      },

      unbind: function(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      category: ['success', 'danger', 'primary', 'warning', 'dark'],
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: '',
      showFullSearch: false,
      unreadNotifications: [],
      randomCat: undefined,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    }
  },
  computed: {
    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth
    },
    breakpoint() {
      return this.$store.state.breakpoint
    },

    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == 'default') return 'navbar-default'
      else if (this.sidebarWidth == 'reduced') return 'navbar-reduced'
      else if (this.sidebarWidth) return 'navbar-full'
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList
    },
    starredPages() {
      return this.$store.state.starredPages
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10)
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list)
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10)
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesMore', list)
      }
    },

    // PROFILE
    user_displayName() {
      // return 'SKY'
      return JSON.parse(localStorage.getItem('userInfo')).displayName
    },
    activeUserImg() {
      // return null
      return JSON.parse(localStorage.getItem('userInfo')).photoURL || this.$store.state.AppActiveUser.img
    }
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown) { this.showBookmarkPagesDropdown = false }
    }
  },
  created() {
    notice().then(res => {
      this.unreadNotifications = res.data
    })
  },
  methods: {
    randomCatory(remark) {
      if (remark === 'MessageSquareIcon') {
        return this.category[2]
      } else if (remark === 'PackageIcon') {
        return this.category[0]
      } else if (remark === 'AlertOctagonIcon') {
        return this.category[1]
      } else if (remark === 'MailIcon') {
        return this.category[3]
      }
      return this.category[4]
    },
    logout() {
      removeToken()
      localStorage.removeItem('userInfo')
      this.$router.push('/pages/login').catch(() => {})
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
    },
    selected(item) {
      this.$router.push(item.url)
      this.showFullSearch = false
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', {
        index: item.index,
        val: !item.highlightAction
      })
    },
    showNavbarSearch() {
      this.showFullSearch = true
    },
    showSearchbar() {
      this.showFullSearch = true
    },
    elapsedTime(startTime) {
      const x = new Date(startTime)
      const now = new Date()
      var timeDiff = now - x
      timeDiff /= 1000

      var seconds = Math.round(timeDiff)
      timeDiff = Math.floor(timeDiff / 60)

      var minutes = Math.round(timeDiff % 60)
      timeDiff = Math.floor(timeDiff / 60)

      var hours = Math.round(timeDiff % 24)
      timeDiff = Math.floor(timeDiff / 24)

      var days = Math.round(timeDiff % 365)
      timeDiff = Math.floor(timeDiff / 365)

      var years = timeDiff

      if (years > 0) {
        return years + (years > 1 ? ' 年 ' : ' 年 ') + '前'
      } else if (days > 0) {
        return days + (days > 1 ? ' 天 ' : ' 天 ') + '前'
      } else if (hours > 0) {
        return hours + (hours > 1 ? ' 小时 ' : ' 小时 ') + '前'
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' 分钟 ' : ' 分钟 ') + '前'
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} 秒前` : '刚刚')
      }

      return 'Just Now'
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false
    }
  }
}

</script>
