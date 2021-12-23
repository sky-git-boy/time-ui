import Cookies from 'js-cookie'

const TokenKey = 'accessToken'
const AccessTimeKey = 'AccessExpiration'
const RefreshTimeKey = 'RefreshExpiration'

// token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// AccessToken过期时间
export function getAccessTime() {
  localStorage.getItem(AccessTimeKey)
}

export function setAccessTime(accessTime) {
  return localStorage.setItem(AccessTimeKey, accessTime)
}

export function removeAccessTime() {
  return localStorage.setItem(AccessTimeKey, '')
}

// RefreshToken过期时间
export function getRefreshTime() {
  localStorage.getItem(RefreshTimeKey)
}

export function setRefreshTime(refreshTime) {
  return localStorage.setItem(RefreshTimeKey, refreshTime)
}

export function removeRefreshTime() {
  return localStorage.setItem(RefreshTimeKey, '')
}

export function setUserToken(token, accessTime, refreshTime) {
  setToken(token)
  setAccessTime(accessTime)
  setRefreshTime(refreshTime)
}

export function removeUserToken() {
  removeToken()
  removeAccessTime()
  removeRefreshTime()
}

export function isAuthenticated() {
  return (
    new Date(Date.now()) < new Date(localStorage.getItem('AccessExpiration')) &&
    getToken()
  )
}

