/* =========================================================================================
  File Name: state.js
  Description: Vuex Store - state
==========================================================================================*/

import navbarSearchAndPinList from '@/layouts/components/navbarSearchAndPinList'
import themeConfig from '@/../themeConfig.js'
import colors from '@/../themeConfig.js'
import img from '../assets/images/profile/pages/page-01.jpg'

const state = {
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: 'default',
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || 'light',
  navbarSearchAndPinList: navbarSearchAndPinList,
  img: img,
  AppActiveUser: {
    id: 0,
    name: 'John Doe',
    about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    img: 'avatar-s-11.png',
    status: 'online'
  },

  themePrimaryColor: colors.primary,

  starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  userRole: null,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar component
  windowWidth: null,

  // 这里为非长期保存参数，只在整个番茄钟周期中使用到
  time: {
    min: 0, // 当前番茄时间
    sec: 0,
    // initMin: 25, // 初始化工作番茄时间，已经转移至state.sidebar
    initSec: 0,
    // restMin: 0, // 休息番茄时间，已经转移至state.sidebar
    restSec: 0,
    isTimeOver: false, // 整个番茄时钟结束
    // isAutoRest: true, // 是否自动进入休息番茄，已经转移至state.sidebar
    tomatoStatus: 1, // （番茄状态） 1 工作状态、2 休息状态
    status: 1 // （按钮状态） 1 番茄未开始、2 番茄已经开始、3 番茄暂停、4 休息番茄-只有跳过按钮
  },

  colors: {
    color1: '#ff4e88',
    color2: '#ff6700',
    color3: '#ffe300',
    color4: '#02e079',
    color5: '#325bf0',
    color6: '#a04cf7'
  }
}

export default state
