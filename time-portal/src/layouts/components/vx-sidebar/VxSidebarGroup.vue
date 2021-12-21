<!-- =========================================================================================
	File Name: VxSidebarGroup.vue
	Description: Sidebar Group Component. Extends vuesax framework's 'vs-sidebar-group' component
	Component Name: VxSidebarGroup
========================================================================================== -->

<template>
  <div
    :class="[{'vs-sidebar-group-open' : openItems}, {'vs-sidebar-group-active': open}, {'disabled-item pointer-events-none': group.isDisabled}]"
    class="vs-sidebar-group"
    @mouseover="mouseover"
    @mouseout="mouseout">
    <div class="group-header w-full" @click="clickGroup">
      <span class="flex items-center w-full">
        <feather-icon v-if="group.icon || (this.groupIndex > Math.floor(this.groupIndex))" :icon="group.icon || 'CircleIcon'" :svg-classes="{ 'w-3 h-3' : this.groupIndex % 1 != 0 }" />
        <span v-show="!sidebarItemsMin" class="truncate mr-3 select-none">{{ group.name }}</span>
        <vs-chip v-if="group.tag && !sidebarItemsMin" :color="group.tagColor" class="ml-auto mr-4">{{ group.tag }}</vs-chip>
      </span>
      <feather-icon v-show="!sidebarItemsMin" :class="[{'rotate90' : openItems}, 'feather-grp-header-arrow']" icon="ChevronRightIcon" svg-classes="w-4 h-4" />
      <span class="vs-sidebar--tooltip">{{ group.name }}</span>
    </div>
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <li v-for="(groupItem, index) in group.submenu" :key="index">
        <vx-sidebar-group v-if="groupItem.submenu" :group="groupItem" :group-index="Number(`${groupIndex}.${index}`)" :open="isGroupActive(groupItem)" :open-hover="openHover" />
        <vx-sidebar-item v-else :index="groupIndex + '.' + index" :to="groupItem.url" :icon="itemIcon(groupIndex + '.' + index)" :target="groupItem.target" icon-small>
          <span class="truncate">{{ groupItem.name }}</span>
          <vs-chip v-if="groupItem.tag" :color="groupItem.tagColor" class="ml-auto">{{ groupItem.tag }}</vs-chip>
        </vx-sidebar-item>
      </li>
    </ul>
  </div>
</template>

<script>
import VxSidebarItem from './VxSidebarItem.vue'

export default {
  name: 'VxSidebarGroup',
  components: {
    VxSidebarItem
  },
  props: {
    openHover: {
      default: false,
      type: Boolean
    },
    open: {
      default: false,
      type: Boolean
    },
    group: {
      type: Object
    },
    groupIndex: {
      type: Number
    }
  },
  data: () => ({
    maxHeight: '0px',
    openItems: false
  }),
  computed: {
    sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin
    },
    styleItems() {
      return {
        maxHeight: this.maxHeight
      }
    },
    itemIcon() {
      return (index) => {
        if (!((index.match(/\./g) || []).length > 1)) return 'CircleIcon'
      }
    },
    isGroupActive() {
      return (sidebarItem) => {
        const path = this.$route.fullPath
        let open = false
        const func = function(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach((item) => {
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
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    '$route'() {
      if (this.sidebarItemsMin) return
      const scrollHeight = this.scrollHeight
      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = `${0}px`
        }, 50)
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = 'none'
        }, 300)
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight != '0px'
    },
    // OPEN AND CLOSES DROPDOWN MENU ON SIDEBAR COLLAPSE AND DEFAULT VIEW
    '$store.state.sidebarItemsMin'(val) {
      const scrollHeight = this.$refs.items.scrollHeight
      if (!val && this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = 'none'
        }, 300)
      } else {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = '0px'
        }, 50)
      }
      if (val && this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = '0px'
        }, 250)
      }
    }
  },
  mounted() {
    this.openItems = this.open
    if (this.open) {
      this.maxHeight = 'none'
    }
  },
  methods: {
    clickGroup() {
      if (!this.openHover) {
        const thisScrollHeight = this.$refs.items.scrollHeight
        if (this.maxHeight == '0px') {
          this.maxHeight = `${thisScrollHeight}px`
          setTimeout(() => {
            this.maxHeight = 'none'
          }, 300)
        } else {
          this.maxHeight = `${thisScrollHeight}px`
          setTimeout(() => {
            this.maxHeight = `${0}px`
          }, 50)
        }

        this.$parent.$children.map((child) => {
          if (child.isGroupActive) {
            if (child !== this && (!child.open) && child.maxHeight != '0px') {
              setTimeout(() => {
                child.maxHeight = `${0}px`
              }, 50)
            }
          }
        })
      }
    },
    mouseover() {
      if (this.openHover) {
        const scrollHeight = this.$refs.items.scrollHeight
        this.maxHeight = `${scrollHeight}px`
      }
    },
    mouseout() {
      if (this.openHover) {
        const scrollHeight = 0
        this.maxHeight = `${scrollHeight}px`
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxSidebarGroup.scss"
</style>
