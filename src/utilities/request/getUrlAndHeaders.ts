'use server'

import { cookies } from 'next/headers'
import { getApiKey, getApiUrl } from './env-variables/get'
import { COOKIES_TOKEN_NAME } from '@/constants/cookies'
import { TokenNotFoundError } from './sendData/errors'

type GetUrlARgs = { url: string | URL }

export async function getUrl({ url }: GetUrlARgs) {
  let newUrl = url

  if (typeof url === 'string' && !url.startsWith('http')) {
    newUrl = getApiUrl(url)
  }

  return newUrl
}

type GetHeadersArgs = { headers: RequestInit['headers'] } & Pick<DefaultArgs, 'authMode'>

export async function getHeaders({ headers, authMode }: GetHeadersArgs) {
  const newHeaders = new Headers(headers)

  newHeaders.append('X-API-KEY', getApiKey())

  if (authMode === 'auth-required') {
    const token = cookies().get(COOKIES_TOKEN_NAME)

    if (!token) throw new TokenNotFoundError()
  }

  if (authMode === 'auth-required' || authMode === 'auth-no-auth') {
    newHeaders.append('Cookie', cookies().toString())
  }

  return newHeaders
}
