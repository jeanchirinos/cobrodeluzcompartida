'use server'

import { cookies } from 'next/headers'
import { getApiKey, getApiUrl } from '../env-variables/get'
import { notFound, redirect } from 'next/navigation'
import { ROUTE } from '@/routes'

type DefaultArgs = {
  authMode?: 'auth-required' | 'auth-not-required' | 'auth-no-auth'
  url: string | URL
  config?: Parameters<typeof fetch>['1']
}

type ArgsNewGetDataModeDefault = {
  mode?: 'default'
}

type ArgsNewGetDataModeNull = {
  mode?: 'null'
}

type ArgsNewGetDataModeErrorPage = {
  mode?: 'error-page'
}

type ArgsNewGetData =
  | (DefaultArgs & ArgsNewGetDataModeDefault)
  | (DefaultArgs & ArgsNewGetDataModeNull)
  | (DefaultArgs & ArgsNewGetDataModeErrorPage)

export async function newGetData<Response>(args: DefaultArgs & ArgsNewGetDataModeDefault): Promise<Response>

export async function newGetData<Response>(args: DefaultArgs & ArgsNewGetDataModeNull): Promise<Response | null>

export async function newGetData<Response>(args: DefaultArgs & ArgsNewGetDataModeErrorPage): Promise<Response>

export async function newGetData(args: ArgsNewGetData) {
  const { mode = 'default', url, config, authMode = 'auth-required' } = args

  const newUrl = getUrl({ url })

  try {
    const newHeaders = getHeaders({ headers: config?.headers, authMode })

    const res = await fetch(newUrl, {
      ...config,
      cache: config?.cache ?? 'no-store',
      headers: newHeaders,
    })

    if (res.ok) return res.json()

    const displayedUrl = typeof url === 'string' ? `/${url}` : url.pathname

    throw new Error(`${res.status} - ${res.statusText} - ${displayedUrl}`, {
      cause: {
        status: res.status,
      },
    })
  } catch (e) {
    const error = e as Error & { cause: { status: number } }
    const { status } = error.cause ?? {}

    if (mode === 'null') {
      return null
    } else if (mode === 'error-page') {
      if (status === 404) {
        notFound()
      }

      if (status === 401 || status === 403 || status === 405) {
        redirect(ROUTE.HOME)
      }

      // Should be a 500 error
      return notFound()
    } else {
      throw new Error(error.message)
    }
  }
}

function getUrl({ url }: { url: string | URL }) {
  let newUrl = url

  if (typeof url === 'string' && !url.startsWith('http')) {
    newUrl = getApiUrl(url)
  }

  return newUrl
}

function getHeaders({ headers, authMode }: { headers: RequestInit['headers'] } & Pick<DefaultArgs, 'authMode'>) {
  const newHeaders = new Headers(headers)

  newHeaders.append('X-API-KEY', getApiKey())

  if (authMode === 'auth-required') {
    const token = cookies().get('jwt')

    if (!token) throw new Error('Token not found', { cause: { status: 401 } })
  }

  if (authMode === 'auth-required' || authMode === 'auth-no-auth') {
    newHeaders.append('Cookie', cookies().toString())
  }

  return newHeaders
}
