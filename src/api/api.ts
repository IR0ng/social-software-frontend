import axios, { AxiosInstance, AxiosResponse, isAxiosError } from 'axios'

export const baseURL = process.env.NEXT_PUBLIC_API_URL

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 60 * 1000,
})

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `${token}`
    }

    return config
  },
  (error) => {
    console.log('error>', error)
    return error
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }
    if (isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
)

export default instance
