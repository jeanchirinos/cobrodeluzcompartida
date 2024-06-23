'use server'

import { notFound, redirect } from 'next/navigation'
import { ROUTE } from '@/constants/routes'
import { getHeaders, getUrl } from '../getUrlAndHeaders'

export async function newGetData<Response>(args: DefaultArgs & { mode?: 'default' }): Promise<Response>
export async function newGetData<Response>(args: DefaultArgs & { mode?: 'null' }): Promise<Response | null>
export async function newGetData<Response>(args: DefaultArgs & { mode?: 'error-page' }): Promise<Response>

export async function newGetData(args: DefaultArgs) {
  const { mode = 'default', url, config, authMode = 'auth-required' } = args

  const newUrl = await getUrl({ url })

  try {
    const newHeaders = await getHeaders({ headers: config?.headers, authMode })

    const customConfig: RequestInit = {
      cache: 'no-store',
      ...config,
      headers: newHeaders,
      next: {
        tags: [typeof newUrl === 'string' ? newUrl : newUrl.href],
        ...config?.next,
      },
    }

    const res = await fetch(newUrl, customConfig)

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
