import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

axios.defaults.baseURL='http://localhost:8080'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token")
}

export const setAuthToken = (token) => {
  return window.localStorage.setItem("auth_token", token)
}

export const removeAuthToken = () => {
  return window.localStorage.removeItem('auth_token')
}

export const isAuthenticated = () => {
  const token = getAuthToken()
  if (!token || token === 'null') {
    return false
  }

  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000 // current time in seconds
    return decodedToken.exp > currentTime
  } catch (e) {
    return false
  }
}
export const request = (method, url, data) => {
  let headers = {};
  if (isAuthenticated()){
    headers = {"Authorization": `Bearer ${getAuthToken()}`}
  }
  
  return axios({
    headers: headers,
    method: method,
    url: url,
    data: data
  })
}