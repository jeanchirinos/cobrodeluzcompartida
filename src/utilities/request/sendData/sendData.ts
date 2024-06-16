'use server'

import { ZodType } from 'zod'
import { getHeaders, getUrl } from '../getUrlAndHeaders'
import { CustomResponse, DefaultArgs } from './types'
import { getFormEntries } from '@/utilities/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function newSendData<ResponseData = object, Body extends ZodType = ZodType>(
  args: DefaultArgs<ResponseData, Body>,
): Promise<CustomResponse<ResponseData>> {
  const { url, config, authMode = 'auth-required', options } = args
  const { schema, onSuccess, revalidatePathParams, revalidateTagParams } = options ?? {}
  const { body, method = 'POST' } = config ?? {}

  // VALIDATIONS BEFORE REQUEST
  if (body && schema) {
    const dataToValidate = body instanceof FormData ? getFormEntries(body) : body

    const validationResult = schema.safeParse(dataToValidate)

    if (!validationResult.success) {
      const error = validationResult.error
      const message = `${error.issues[0].path[0]} : ${error.issues[0].message}`

      return { ok: false, msg: message, data: null }
    }
  }

  // REQUEST CONFIG
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

    // REQUEST
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

  // RESPONSE OK
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
    await onSuccess(customResponse.data)
  }

  if (revalidatePathParams) {
    revalidatePath(...revalidatePathParams)
  }

  if (revalidateTagParams) {
    revalidateTag(...revalidateTagParams)
  }

  // RETURN
  return customResponse
}
