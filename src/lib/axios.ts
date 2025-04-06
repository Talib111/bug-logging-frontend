import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// ----------------------------------------------------------------------
const backendUrl = () => {
    return 'http://localhost:8008/grievance-api/v1'
}

export type { AxiosRequestConfig, AxiosResponse }

export const BASE_URI = backendUrl()
const axiosInstance = axios.create({
  baseURL: BASE_URI,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // set token to header
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    throw new Error(error)
  }
)
// intercept every response
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('dsadasdas', response) 
   
      if (response.data?.isAuthenticated=='false') {
        delete axiosInstance.defaults.headers.common.Authorization
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.setItem('authenticated', response.data?.authenticated)
        // window.location.reload()
      }
    return response
  },
  async (error) => {
    return Promise.reject(new Error(error))
  }
)

export default axiosInstance


export const axiosInstanceForJuidco = axios.create({
  baseURL: `https://jharkhandegovernance.com/auth/api`,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // set token to header
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    throw new Error(error)
  }
)
// intercept every response
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.authenticated == 'false') {
      delete axiosInstance.defaults.headers.common.Authorization
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      localStorage.setItem('authenticated', response.data?.authenticated)
      alert('Session Expired')
      // window.location.reload()
    }
    return response
  },
  async (error) => {
    return Promise.reject(new Error(error))
  }
)
