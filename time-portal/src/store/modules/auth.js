import { requestLogin, getUserInfo } from '@/api/user'
import router from '@/router'
import { setUserToken, isAuthenticated } from '@/utils/auth'

const state = {
  isUserLoggedIn: () => {
    return localStorage.getItem('userInfo') && isAuthenticated()
  }
}

const mutations = {}

const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      requestLogin(payload.userDetails)
        .then((response) => {
          // If there's user data in response
          if (response.data) {
            var data = response.data
            // Set accessToken
            // localStorage.setItem("accessToken", response.data.accessToken);
            const phone = data.username
            const token = data.access_token
            const accessTime = data.expire
            const refreshToken = data.refreshToken
            setUserToken(token, accessTime, refreshToken)

            // Update user details
            getUserInfo(phone).then(res => {
              const data = res.data
              debugger
              localStorage.setItem('userInfo', JSON.stringify({
                displayName: data.userName,
                email: data.email,
                photoURL: data.picture
              }))
              // Navigate User to homepage
              router.push(router.currentRoute.query.to || '/')
              resolve(response)
            }).catch(e => {
              reject({ message: e.message })
            })
          } else {
            reject({ message: '密码或手机号错误！！！' })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
