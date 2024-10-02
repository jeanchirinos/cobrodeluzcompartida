import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import axiosDefault from 'axios'
import { getCookie } from 'typescript-cookie'

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
})

axios.interceptors.request.use(async function (config) {
  const token = getCookie(COOKIES_TOKEN_NAME)

  if (!token && config.url !== 'login') {
    throw new Error('Token not found')
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { axios }
