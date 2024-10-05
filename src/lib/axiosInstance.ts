import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import axiosDefault, { AxiosError, HttpStatusCode } from 'axios'
import { getCookie } from 'typescript-cookie'

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
})

axios.interceptors.request.use(async function (config) {
  const token = getCookie(COOKIES_TOKEN_NAME)

  // if (!token && config.url !== 'login') {
  if (!token) {
    const axiosError = new AxiosError('Validation failed', AxiosError.ERR_BAD_REQUEST, config)
    axiosError.status = HttpStatusCode.Unauthorized

    throw axiosError
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { axios }
