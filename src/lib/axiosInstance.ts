import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import axiosDefault from 'axios'
import { cookies } from 'next/headers'

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { 'X-API-KEY': process.env.API_KEY },
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = cookies().get(COOKIES_TOKEN_NAME)

  if (token) {
    config.headers.Cookie = cookies().toString()
  }

  return config
})

export { axios }
