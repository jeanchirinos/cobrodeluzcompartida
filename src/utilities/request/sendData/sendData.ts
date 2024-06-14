'use server'

import { ZodError } from 'zod'
import { getHeaders, getUrl } from '../getUrlAndHeaders'
import { DefaultArgs } from './types'
import { getFormEntries } from '@/utilities/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'

type CustomResponse<Response> = { msg: string } & (
  | {
      ok: true
      data: Response
    }
  | {
      ok: false
      data: null
    }
)

// export async function newSendData<Response>(
//   args: DefaultArgs,
// ): Promise<CustomResponse<Response>>
// export async function newSendData<Response>(args: DefaultArgs & ArgsNewGetDataModeNull): Promise<Response | null>
// export async function newSendData<Response>(args: DefaultArgs & ArgsNewGetDataModeErrorPage): Promise<Response>

// export async function newSendData(args: ArgsNewGetData) {
export async function newSendData<Body = unknown, Response = unknown>(
  args: DefaultArgs<Body, Response>,
): Promise<CustomResponse<Response>> {
  const { url, config, authMode = 'auth-required', options } = args

  const { schema, onSuccess, revalidatePathParams, revalidateTagParams } = options ?? {}

  const { body, method = 'POST' } = config ?? {}
  //

  if (body && schema) {
    const dataToValidate = body instanceof FormData ? getFormEntries(body) : body

    try {
      schema.parse(dataToValidate)
    } catch (e) {
      const error = e as ZodError
      const message = `${error.issues[0].path[0]} : ${error.issues[0].message}`

      return { ok: false, msg: message, data: null }
    }

    // return { ok: false, msg: 'Error en la validación de datos', data: null }
  }

  //

  const newUrl = await getUrl({ url })

  const headers = new Headers(config?.headers)
  let newBody = null

  if (config?.body instanceof FormData) {
    newBody = config.body
  } else {
    headers.append('Content-Type', 'application/json')
    headers.append('accept', 'application/json')

    newBody = JSON.stringify(config?.body)
  }

  let res = {} as globalThis.Response

  try {
    const newHeaders = await getHeaders({ headers, authMode })

    res = await fetch(newUrl, {
      ...config,
      headers: newHeaders,
      body: newBody,
      method,
    })

    if (!res.ok) {
      const displayedUrl = typeof url === 'string' ? `/${url}` : url.pathname

      throw new Error(`${res.status} - ${res.statusText} - ${displayedUrl}`, {
        cause: {
          status: res.status,
        },
      })
    }
  } catch (e) {
    const error = e as Error & { cause: { status: number } }

    return {
      ok: false,
      data: null,
      msg: error.message,
    }
  }

  //  if (res.ok) {
  const response = await res.json()

  let customResponse = {
    ok: true,
    data: response,
    msg: 'Enviado correctamente',
  }

  if (typeof response === 'object' && 'ok' in response && 'data' in response) {
    customResponse = response
  }

  if (onSuccess) {
    onSuccess(customResponse.data)
  }

  if (revalidatePathParams) {
    revalidatePath(...revalidatePathParams)
  }

  if (revalidateTagParams) {
    revalidateTag(...revalidateTagParams)
  }

  return customResponse
  //  }
}
