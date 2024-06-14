'use server'

import { notFound, redirect } from 'next/navigation'
import { ROUTE } from '@/routes'
import { getHeaders, getUrl } from '../request/getUrlAndHeaders'

export async function newGetData<Response>(args: DefaultArgs & ArgsNewGetDataModeDefault): Promise<Response>
export async function newGetData<Response>(args: DefaultArgs & ArgsNewGetDataModeNull): Promise<Response | null>
export async function newGetData<Response>(args: DefaultArgs & ArgsNewGetDataModeErrorPage): Promise<Response>

export async function newGetData(args: ArgsNewGetData) {
  const { mode = 'default', url, config, authMode = 'auth-required' } = args

  const newUrl = await getUrl({ url })

  try {
    const newHeaders = await getHeaders({ headers: config?.headers, authMode })

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
