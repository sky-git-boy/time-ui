import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '@/router/index'
import { getToken } from '@/utils/auth'
// import { codeMap } from '@/config/constants'

// 创建axios实例
const service = axios.create({
  baseURL: '/', // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    // eslint-disable-next-line
    if (sessionStorage.token != undefined) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data// response.data 里面的数据才是后台返回给我们的数据 400 401 200 500
    if (res.code === 401) {
      // 身份过期
      MessageBox.confirm('用户登录身份已过期，请重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/logout').then(() => {
          // 跳转到登录页面 重新登录
          location.reload()
        })
      })
    } else if (res.code === 500) {
      Notification.error({
        title: '服务器内部出现异常，请联系管理员'
      })
      return Promise.reject('error')// 记录错
    } else if (res.code === 400) {
      Notification.error({
        title: res.msg
      })
      return Promise.reject('error')// 记录错
    } else if (res.code !== 200) {
      Notification.error({
        title: res.msg
      })
      return Promise.reject('error')// 记录错
    } else {
      // 以上验证通过之后再放行
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.message !== 'Request failed with status code 403') {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.message === 'Request failed with status code 403') {
      router.push({ path: '/401' })
    }
    return Promise.reject(error)
  }
)

export default service
