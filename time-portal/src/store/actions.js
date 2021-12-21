/* =========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
==========================================================================================*/

import axios from 'axios'
import {
  DECREASE_SEC,
  DECREASE_MIN,
  CHANGE_STATUS_TO_STOP,
  CHANGE_STATUS_TO_START,
  CHANGE_STATUS_TO_RESTART,
  CHANGE_STATUS_TO_END,
  CHANGE_CURRENT_TIME,
  UPDATE_PROPRESS,
  SAVE_SONG,
  PLAYER_READY_STATE,
  CLEAR_AUDIO,
  PLAY_OR_PAUSE,
  UPDATE_SONG,
  LOAD_WHITE_NOISE,
  INIT_TOMATO
} from './mutations-types.js'

let countDown = null
let progessInterval = null

const actions = {

  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////
  updateSidebarWidth({
    commit
  }, width) {
    commit('UPDATE_SIDEBAR_WIDTH', width)
  },
  updateI18nLocale({
    commit
  }, locale) {
    commit('UPDATE_I18N_LOCALE', locale)
  },
  toggleContentOverlay({
    commit
  }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({
    commit
  }, val) {
    commit('UPDATE_THEME', val)
  },
  updateUserRole({
    commit
  }, val) {
    commit('UPDATE_USER_ROLE', val)
  },
  updateWindowWidth({
    commit
  }, width) {
    commit('UPDATE_WINDOW_WIDTH', width)
  },

  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  updateStarredPage({
    commit
  }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  //  The Navbar
  arrangeStarredPagesLimited({
    commit
  }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({
    commit
  }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // local 数据初始化
  loaclDataInit({
    commit
  }) {
    commit(INIT_TOMATO)
  },

  // 倒计时开始 || 对state中时间进行判断，提交不同的 Mutation
  startTime({
    state,
    commit
  }) {
    if (state.time.tomatoStatus === 1) {
      commit(CHANGE_STATUS_TO_START)
    }
    if (state.time.tomatoStatus === 2) {
      commit(CHANGE_STATUS_TO_END)
    }
    countDown = setInterval(() => {
      if (state.time.sec === 0 && state.time.min === 0) {
        // 工作番茄结束
        if (state.time.tomatoStatus === 1) {
          commit(CHANGE_CURRENT_TIME, 'toRest')
          // 如果自动进行休息（默认设置）
          if (state.sidebar.setting.isAutoRest.state) {
            commit(CHANGE_STATUS_TO_END)
            // eslint-disable-next-line no-console
            console.log('自动进入休息番茄')
          } else {
            commit(CHANGE_STATUS_TO_RESTART)
            clearInterval(countDown)
          }
          // 休息番茄结束
        } else if (state.time.tomatoStatus === 2) {
          commit(CHANGE_CURRENT_TIME, 'restart')
          commit(CHANGE_STATUS_TO_RESTART)
          clearInterval(countDown)
        }
        // 结束了一分钟
      } else if (state.time.sec === 0 && state.time.min !== 0) {
        commit(DECREASE_MIN)
        commit(DECREASE_SEC)
        // 结束了一秒
      } else {
        commit(DECREASE_SEC)
      }
    }, 1000)
  },

  // 暂停 || 清除 interval，设置状态
  stopTime({
    commit
  }) {
    clearInterval(countDown)
    commit(CHANGE_STATUS_TO_STOP)
  },

  // 重新开始 || 清楚 interval、设置状态、
  restartTime({
    commit
  }) {
    clearInterval(countDown)
    commit(CHANGE_STATUS_TO_RESTART)
    commit(CHANGE_CURRENT_TIME, 'restart')
  },

  // 跳过休息 || 清除 interval、重置状态
  jumpTime({
    commit
  }) {
    clearInterval(countDown)
    commit(CHANGE_STATUS_TO_RESTART)
    commit(CHANGE_CURRENT_TIME, 'restart')
  },

  /**
   * 以下为歌曲部分
   */
  // 异步获取歌曲 || axios Get请求
  async getSong({
    state,
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: 'https://api.uomg.com/api/rand.music',
        params: {
          sort: '热歌榜',
          format: 'json'
        }
      })
        .then(async(response) => {
          const res = response.data.data
          // 准备音乐
          const audio = await dispatch('readyAudio', res)
          // 保存歌曲到list中 || commit mutation
          commit(SAVE_SONG, {
            res,
            audio
          })
          // 设置播放状态 || commit mutation
          commit(PLAYER_READY_STATE, true)
          resolve(state.song)
        })
        .catch(() => {
          reject(Error('歌曲获取失败'))
        })
    })
  },

  // 创建audio对象，保存必要的值
  readyAudio({
    state
  }, res) {
    return new Promise((resolve, reject) => {
      // 创建Audio对象
      const audio = new Audio()
      audio.src = res.url
      // eslint-disable-next-line no-console
      console.log(state.song.list)
      const loop = setInterval(() => {
        let count = 0
        count += 1
        if (count > 50) {
          clearInterval(loop)
          reject(Error('请检查网络是否良好！'))
        }
        if (audio.readyState === 4) {
          // 音乐准备好了
          clearInterval(loop)
          resolve(audio)
        }
      }, 100)
    })
  },
  // 更新进度条 || 一秒更新一次
  updateProgress({
    state,
    commit
  }) {
    if (!state.song.audio.paused) {
      commit(UPDATE_PROPRESS)
      progessInterval = setInterval(() => {
        commit(UPDATE_PROPRESS)
      }, 1000)
    } else {
      clearInterval(progessInterval)
    }
  },

  // 下一曲
  async nextSong({
    state,
    commit,
    dispatch
  }) {
    // 清空src，设置状态
    commit(CLEAR_AUDIO)
    commit(PLAYER_READY_STATE, false)
    // 判断歌曲在list中位置
    if (state.song.currSong.index < state.song.list.length - 1) {
      // 播放下一首
      const index = state.song.currSong.index + 1
      const audio = await dispatch('readyAudio', state.song.list[index])
      commit(PLAYER_READY_STATE, true)
      commit(UPDATE_SONG, {
        audio,
        index
      })
    } else {
      await dispatch('getSong')
    }
    commit(PLAY_OR_PAUSE, {
      isPlay: true
    })
  },

  // 上一曲
  async prevSong({
    state,
    commit,
    dispatch
  }) {
    // 清空src，设置状态
    commit(CLEAR_AUDIO)
    commit(PLAYER_READY_STATE, false)
    // 判断歌曲在list中位置
    if (state.song.currSong.index > 1) {
      // 播放上一首
      const index = state.song.currSong.index - 1
      const audio = await dispatch('readyAudio', state.song.list[index])
      commit(UPDATE_SONG, {
        audio,
        index
      })
      commit(PLAYER_READY_STATE, true)
      commit(PLAY_OR_PAUSE, {
        isPlay: true
      })
    } else {
      // eslint-disable-next-line no-console
      console.log('前面没歌了')
    }
  },

  // 改变音乐和白噪声
  toggleNoiseOrMusic({
    commit
  }, payload) {
    // 判断要切换到哪个
    if (payload.switch === 'noise') {
      // 将要切换到白噪声
      commit(LOAD_WHITE_NOISE)
    } else if (payload.switch === 'music') {
      // 要切换到音乐
    }
  }
}

export default actions
