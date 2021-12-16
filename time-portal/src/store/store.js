/*=========================================================================================
  File Name: store.js
  Description: Vuex store
==========================================================================================*/

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import state from './state'
Vue.use(Vuex)
import moduleCalendar from './calendar/moduleCalendar.js'
import moduleTodo from './todo/moduleTodo.js'
import auth from './modules/auth.js'

export default new Vuex.Store({
  getters: {
    /**
     * 以下为TODO和番茄钟部分
     */
    doneTodos: (state) => state.todos.filter((todo) => todo.done),
    undoneTodos: (state) => state.todos.filter((todo) => !todo.done),
    // 格式化分
    formatMin: (state) => {
      const {
        min
      } = state.time;
      let strMin = '';
      if (min < 10 && min > -1) {
        strMin = `0${min}`;
      } else if (min >= 10) {
        strMin = `${min}`;
      } else {
        strMin = '00';
      }
      return strMin;
    },
    // 格式化秒
    formatSec: (state) => {
      const {
        sec
      } = state.time;
      let strSec = '';
      if (sec < 10 && sec >= 0) {
        strSec = `0${sec}`;
      } else {
        strSec = `${sec}`;
      }
      return strSec;
    },
  },
  mutations,
  state,
  actions,
  modules: {
    calendar: moduleCalendar,
    todo: moduleTodo,
    auth: auth,
  },
  strict: process.env.NODE_ENV !== 'production'
})
