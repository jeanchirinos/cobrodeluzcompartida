'use client'

import { axios } from '@/lib/axiosInstance'
import { SWR_KEY_GET_SESSION } from '../getSession/useGetSession'
// import { login } from './login'
// import { useSWRMutation } from '@/hooks/useSWRMutation'
import { API_ROUTE } from '@/constants/api-routes'
import useSWRMutationDefault from 'swr/mutation'
import { ResponseLogin } from './login'
import { SuccesResponse } from '@/utilities/request/sendData/types'

const fetcher = (url: string, { arg }: { arg: any }) =>
  axios.post(API_ROUTE.AUTH.LOGIN, arg).then(res => res.data as SuccesResponse<ResponseLogin>)

export function useLogin() {
  // return useSWRMutation({ key: SWR_KEY_GET_SESSION, fn: login })
  return useSWRMutationDefault(SWR_KEY_GET_SESSION, fetcher)
}
