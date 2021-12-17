<template>
  <ul class="vx-auto-suggest">
    <div class="flex items-center relative">
      <vs-input
        ref="input"
        :placeholder="placeholder"
        :class="inputClassses"
        v-model="searchQuery"
        class="z-50"
        icon-pack="feather"
        icon="icon-search"
        icon-no-border
        @keyup.esc="escPressed"
        @keyup.up="increaseIndex(false)"
        @keyup.down="increaseIndex"
        @keyup.enter="suggestionSelected"
        @focus="updateInputFocus"
        @blur="updateInputFocus(false)"/>
    </div>
    <ul ref="scrollContainer" :class="{'hidden': !inputFocused}" class="auto-suggest-suggestions-list z-50 rounded-lg mt-2 shadow-lg overflow-hidden" tabindex="-1" @mouseenter="insideSuggestions = true" @mouseleave="insideSuggestions = false" @focus="updateInputFocus" @blur="updateInputFocus(false)">
      <li
        v-for="(suggestion, index) in filteredData"
        ref="option"
        :key="index"
        :class="{'vx-auto-suggest__current-selected': currentSelected == index, 'pointer-events-none': suggestion.index < 0}"
        class="auto-suggest__suggestion flex items-center justify-between py-3 cursor-pointer"
        @mouseenter="currentSelected = index"
        @click="suggestionSelected">

        <div class="flex items-center">
          <feather-icon :icon="suggestion.labelIcon" svg-classes="h-5 w-5" class="mr-4"/>
          <span>{{ suggestion.label }}</span>
        </div>
        <feather-icon v-if="showAction" :icon="data.actionIcon" :svg-classes="[actionClasses(suggestion.highlightAction), 'h-5 w-5']" @click.stop="actionClicked"/>
      </li>
    </ul>
  </ul>
</template>

<script>
export default{
  props: {
    placeholder: {
      type: String,
      default: 'Search..'
    },
    data: {
      type: Object,
      required: true
    },
    showAction: {
      type: Boolean,
      default: false
    },
    inputClassses: {
      type: [String, Object, Array]
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    showPinned: {
      type: Boolean,
      default: false
    },
    backgroundOverlay: {
      type: Boolean,
      default: false
    },
    searchLimit: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      searchQuery: '',
      filteredData: [],
      currentSelected: -1,
      inputFocused: false,
      insideSuggestions: false
    }
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.bodyOverlay
    },
    actionClasses() {
      return (isHighlighted) => {
        if (isHighlighted) return `stroke-current text-${this.data.highlightColor}`
      }
    }
  },
  watch: {
    // UPDATE SUGGESTIONS LIST
    searchQuery(val) {
      if (val == '') {
        this.inputInit()
        if (this.bodyOverlay) this.$store.commit('TOGGLE_CONTENT_OVERLAY', false)
      } else {
        if (this.backgroundOverlay && !this.bodyOverlay) this.$store.commit('TOGGLE_CONTENT_OVERLAY', true)
        const exactEle = this.data.data.filter((item) => {
          return item.label.toLowerCase().startsWith(this.searchQuery.toLowerCase())
        })
        const containEle = this.data.data.filter((item) => {
          return !item.label.toLowerCase().startsWith(this.searchQuery.toLowerCase()) && item.label.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
        })
        this.filteredData = exactEle.concat(containEle).slice(0, this.searchLimit)
        if (!this.filteredData[0]) this.currentSelected = -1
      }

      // ADD: No result found
      if (!this.filteredData.length && this.searchQuery) {
        this.filteredData = [{
          highlightAction: false,
          index: -1,
          label: 'No results found.',
          labelIcon: 'AlertCircleIcon',
          url: null
        }]
      }
    },
    autoFocus(val) {
      if (val) this.focusInput()
      else this.searchQuery = ''
    },
    filteredData() {
      this.currentSelected = 0

      // Prevent selecting if first item in list dont have url e.g. 'No Reult'
      if (this.filteredData[0]) {
        if (!this.filteredData[0].url) {
          this.currentSelected = -1
        }
      }
    }
  },
  mounted() {
    if (this.autoFocus) this.focusInput()
  },
  methods: {
    escPressed() {
      this.$emit('closeSearchbar')
      this.searchQuery = ''
      this.filteredData = []
    },
    inputInit() {
      if (this.showPinned) {
        const starredData = this.data.data.filter((item) => item.highlightAction)
        this.filteredData = starredData
      } else {
        this.filteredData = []
      }
    },
    updateInputFocus(val = true) {
      if (val) {
        if (this.searchQuery == '') this.inputInit()
        setTimeout(() => {
          this.inputFocused = true
        }, 100)
      } else {
        if (this.insideSuggestions) return
        setTimeout(() => {
          this.inputFocused = false
        }, 100)
        this.escPressed()
      }
    },
    suggestionSelected() {
      if (this.bodyOverlay && this.filteredData[0].url) this.$store.commit('TOGGLE_CONTENT_OVERLAY', false)
      if (this.filteredData.length) {
        if (this.filteredData[0].url) {
          this.searchQuery = ''
          if (this.currentSelected >= 0) this.$emit('selected', this.filteredData[this.currentSelected])
          else this.$emit('selected', this.filteredData[0])
          this.filteredData = []
        }
      }
    },
    actionClicked() {
      this.$emit('actionClicked', this.filteredData[this.currentSelected])
      if (!this.filteredData[this.currentSelected].highlightAction) this.filteredData.splice(this.currentSelected, 1)
    },
    increaseIndex(val = false) {
      if (!val && this.currentSelected > 0) this.currentSelected--
      else if (val && (this.currentSelected < this.filteredData.length - 1) && (this.filteredData[this.currentSelected + 1].index > -1)) this.currentSelected++
      this.fixScrolling()
    },
    focusInput() {
      this.$refs.input.$el.querySelector('input').focus()
    },
    fixScrolling() {
      if (this.currentSelected > 0) {
        const liH = this.$refs.option[this.currentSelected].clientHeight
        const ulH = this.$refs.scrollContainer.clientHeight
        if (ulH - (liH * this.currentSelected) < liH) {
          this.$refs.scrollContainer.scrollTop = Math.round(((this.currentSelected + 1) - (ulH / liH) + 1) * liH)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxAutoSuggest.scss";
</style>
