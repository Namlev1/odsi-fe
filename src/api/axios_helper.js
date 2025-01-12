import axios from 'axios';

axios.defaults.baseURL='http://localhost:8080'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token")
}

export const setAuthToken = (token) => {
  return window.localStorage.setItem("auth_token", token)
}

export const isAuthenticated = () => {
  return getAuthToken() !== null && getAuthToken() !== "null";
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