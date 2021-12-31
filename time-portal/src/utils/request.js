import axios from 'axios'
import router from '@/router'
import { getToken } from '@/utils/auth'

const request = axios.create({
  baseURL: 'http://time-server',
  timeout: 20000
})

// http request 拦截器
request.interceptors.request.use(
  config => {
    // this.$vs.loading();
    // let curTime = new Date();
    // const accessExpiration = window.localStorage.getItem("AccessExpiration");
    // let refreshExpiration = window.localStorage.getItem("RefreshExpiration");
    // let {expire, updateTime} = accessExpiration

    // let activeTime = (curTime - updateTime)
    // debugger
    // console.log("activeTime", activeTime,expire,new Date(curTime),new Date(updateTime));
    // let accesstime = new Date(Date.parse(accessExpiration));
    // let refreshtime = new Date(Date.parse(refreshExpiration));

    const token = getToken()
    // if (token && curTime > accesstime && curTime < refreshtime) {
    //   //重新请求token  TODO
    // } else if (token && curTime > accesstime && curTime > refreshtime) {
    //   //跳转到登录页 TODO this无$router
    //   router.push({
    //     path: "/pages/login",
    //     //query: { redirect: router.currentRoute.fullPath }
    //   });
    // } else if (token && curTime < accesstime && curTime < refreshtime) {
    //   // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   config.headers.Authorization = token;
    // }
    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  error => {
    console.log('请求失败：', error)

    // this.$vs.loading.close();
    // this.$vs.notify({
    //   title: "Error",
    //   text: error.message,
    //   iconPack: "feather",
    //   icon: "icon-alert-circle",
    //   color: "danger",
    // });
    return Promise.reject(error)
  }
)

// http response 拦截器
request.interceptors.response.use(
  response => {
    // this.$vs.loading.close();
    return response.data
    // TODO 401处理
    // if (response.data.code == 0 || response.headers.success === "true") {
    //   return response.data;
    // } else {
    //   Message({
    //     showClose: true,
    //     message: response.data.msg || decodeURI(response.headers.msg),
    //     type: "error",
    //   });
    //   if (response.data.data && response.data.data.reload) {
    //     store.commit("user/LoginOut");
    //   }
    //   return Promise.reject(response.data.msg);
    // }
  },
  error => {
    // this.$vs.loading.close()
    if (error.response != undefined) {
      if (error.response.status === 429) {
        this.$vs.notify({
          text: '请求太频繁，请稍后再试！',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger',
          position: 'top-center'
        })
      } else if (error.response.status === 401) {
        router.push({
          path: '/pages/error-401'
          // query: { redirect: router.currentRoute.fullPath }
        })
      } else if (error.response.status === 403) {
        router.push({
          path: '/pages/error-401'
          // query: { redirect: router.currentRoute.fullPath }
        })
      }
      return Promise.reject(error)
    } else {
      return
    }
  }
)

export default request
