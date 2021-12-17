<!-- =========================================================================================
    File Name: FeatherIcon.vue
    Description: Feather icon component. Creates feather icon based on 'icon' prop
    Component Name: FeatherIcon
========================================================================================== -->

<script>
import * as icons from 'vue-feather-icons'

export default {
  name: 'FeatherIcon',
  props: {
    icon: { type: String, required: true },
    svgClasses: { type: [String, Object, Array], default: '' },
    badge: {}
  },
  methods: {
    clickFeather(event) {
      this.$emit('click', event)
    },
    mouseoverFeather(event) {
      this.$emit('mouseover', event)
    },
    mouseoutFeather(event) {
      this.$emit('mouseout', event)
    }
  },
  render(h) {
    const svg = h(icons[this.icon], { class: this.svgClasses })
    const badgeEl = h('span', { class: 'feather-icon-badge bg-primary text-white h-5 w-5 absolute rounded-full text-xs flex items-center justify-center', style: 'top: -7px; right: -5px' }, [this.badge])
    const attr = {
      class: ['feather-icon select-none relative'],
      on: {
        click: this.clickFeather,
        mouseover: this.mouseoverFeather,
        mouseout: this.mouseoutFeather
      }
    }
    const children = [svg]
    if (this.badge) children.push(badgeEl)
    return h('span', attr, children)
  }
}

</script>

<style lang="scss">
@import "../assets/scss/vuesax/components/featherIcon.scss"
</style>
