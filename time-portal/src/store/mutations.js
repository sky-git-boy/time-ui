/* =========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
==========================================================================================*/
import {
  DECREASE_SEC,
  DECREASE_MIN,
  TIME_OVER,
  CHANGE_STATUS_TO_RESTART,
  CHANGE_STATUS_TO_START,
  CHANGE_STATUS_TO_STOP,
  CHANGE_STATUS_TO_END,
  CHANGE_CURRENT_TIME,
  INIT_TOMATO
} from './mutations-types'

const mutations = {

  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////

  UPDATE_SIDEBAR_WIDTH(state, width) {
    state.sidebarWidth = width
  },
  UPDATE_SIDEBAR_ITEMS_MIN(state, val) {
    state.sidebarItemsMin = val
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val
  },
  TOGGLE_CONTENT_OVERLAY(state, val) {
    state.bodyOverlay = val
  },
  TOGGLE_IS_SIDEBAR_ACTIVE(state, value) {
    state.isSidebarActive = value
  },
  UPDATE_THEME(state, val) {
    state.theme = val
  },
  UPDATE_WINDOW_BREAKPOINT(state, val) {
    state.breakpoint = val
  },
  UPDATE_PRIMARY_COLOR(state, val) {
    state.themePrimaryColor = val
  },
  UPDATE_USER_ROLE(state, val) {
    state.userRole = val
    localStorage.setItem('userRole', val)
  },
  // UPDATE_STATUS_CHAT(state, value) {
  //     state.AppActiveUser.status = value;
  // },
  UPDATE_WINDOW_WIDTH(state, width) {
    state.windowWidth = width
  },

  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  UPDATE_STARRED_PAGE(state, payload) {
    // find item index in search list state
    const index = state.navbarSearchAndPinList.data.findIndex((item) => item.index == payload.index)
    // update the main list
    state.navbarSearchAndPinList.data[index].highlightAction = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList.data[index])
    } else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.index == payload.index)
      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // The Navbar
  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp = false
    const lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited = state.starredPages.slice(0, 10)
    state.starredPages = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })
    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },

  /**
   * ========= 以下为 番茄钟页面的 mutation
   */
  // 初始化时间
  [INIT_TOMATO](state) {
    state.time.min = state.sidebar.setting.workTomato.time
  },
  // 倒计时-分钟 || 直接减一即可，异步进行计算的部分在action中
  [DECREASE_MIN](state) {
    state.time.min -= 1
  },
  // 倒计时-秒 || 直接减一
  [DECREASE_SEC](state) {
    const {
      sec
    } = state.time
    if (sec === 0) {
      state.time.sec = 59
    } else {
      state.time.sec -= 1
    }
  },

  // 设置当前计时
  [CHANGE_CURRENT_TIME](state, payload) {
    if (payload === 'restart') {
      state.time.min = state.sidebar.setting.workTomato.time
      state.time.sec = state.time.initSec
      state.time.tomatoStatus = 1
    } else if (payload === 'toRest') {
      state.time.min = state.sidebar.setting.restTomato.time
      state.time.sec = state.time.restSec
      state.time.tomatoStatus = 2
    } else {
      // eslint-disable-next-line no-console
      console.error('程序出问题了，CHANGE_CURRENT_TIME 必须有payload')
    }
  },

  // 时间到 || 给标志
  [TIME_OVER](state) {
    state.time.isTimeOver = !state.time.isTimeOver
  },

  [CHANGE_STATUS_TO_RESTART](state) {
    state.time.status = 1
  },
  [CHANGE_STATUS_TO_START](state) {
    state.time.status = 2
  },
  [CHANGE_STATUS_TO_STOP](state) {
    state.time.status = 3
  },
  [CHANGE_STATUS_TO_END](state) {
    state.time.status = 4
  }
}

export default mutations
