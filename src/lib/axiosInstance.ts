import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import axiosDefault from 'axios'
import { getCookie } from 'typescript-cookie'

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
})

axios.interceptors.request.use(async function (config) {
  const token = getCookie(COOKIES_TOKEN_NAME)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// axios.interceptors.response.use(
//   function (response) {
//     console.log({ response })
//     return response
//   },
//   function (error) {
//     console.log({ error })
//     // // if (error.response?.status === 401) {
//     // //   // removeCookie(COOKIES_TOKEN_NAME)
//     // //   // push(ROUTE.HOME)
//     // // }
//     // console.log({ error })

//     // return Promise.reject(error)
//   },
// )

export { axios }
