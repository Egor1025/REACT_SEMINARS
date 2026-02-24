import axios, { type AxiosRequestHeaders } from 'axios'

export const axiosClient = axios.create()

axiosClient.interceptors.request.use((config) => {
  config.baseURL = 'https://jsonplaceholder.typicode.com'
  config.headers = {
    ...(config.headers || {}),
    Authorization: 'Bearer demo-token'
  } as AxiosRequestHeaders
  return config
})

export default axiosClient
