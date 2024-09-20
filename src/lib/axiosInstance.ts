import axiosDefault from 'axios'

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: { 'X-API-KEY': process.env.API_KEY },
})

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    // const token = localStorage.getItem('authToken') // Retrieve auth token from localStorage
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    // return config
    console.log('Request sent')
    return config
  },
  function (error) {
    // Handle the error
    return Promise.reject(error)
  },
)

export { axios }
