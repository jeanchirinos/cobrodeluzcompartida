import { API_ROUTE } from '@/constants/api-routes'
import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import axiosDefault, { AxiosError, HttpStatusCode } from 'axios'
import { getCookie } from 'typescript-cookie'

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
})

const NOT_AUTHORIZATION_ROUTES = [
  API_ROUTE.AUTH.LOGIN,
  API_ROUTE.AUTH.REGISTER,
  API_ROUTE.AUTH.PASSWORD_RECOVER,
  API_ROUTE.AUTH.PASSWORD_RESET,
]

axios.interceptors.request.use(async function (config) {
  const token = getCookie(COOKIES_TOKEN_NAME)

  if (!token && !NOT_AUTHORIZATION_ROUTES.includes(config.url!)) {
    const axiosError = new AxiosError('Token not found', AxiosError.ERR_BAD_REQUEST, config)

    axiosError.status = HttpStatusCode.Unauthorized

    throw axiosError
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { axios }
