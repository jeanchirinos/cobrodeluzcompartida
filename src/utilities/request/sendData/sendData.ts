'use server'

import { ZodType } from 'zod'
import { getHeaders, getUrl } from '../getUrlAndHeaders'
import { CustomResponse, DefaultArgs } from './types'
import { getFormEntries } from '@/utilities/utilities'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getErrorResponse } from './constants'
import { TokenNotFoundError } from './errors'

export async function sendData<BodySchema extends ZodType, ResponseData>(
  args: DefaultArgs<BodySchema, ResponseData>,
): Promise<CustomResponse<ResponseData>> {
  const { url, config, authMode = 'auth-required', options } = args
  const { schema, onSuccess, revalidatePathParams, revalidateTagParams } = options ?? {}
  const { body, method = 'POST' } = config ?? {}

  // VALIDATIONS BEFORE REQUEST
  if (body && schema) {
    const dataToValidate = body instanceof FormData ? getFormEntries(body) : body

    const validationResult = schema.safeParse(dataToValidate)

    if (!validationResult.success) {
      const { error } = validationResult
      const message = `${error.issues[0].path[0]} : ${error.issues[0].message}`

      return getErrorResponse({ message })
    }
  }

  // REQUEST CONFIG
  const newUrl = await getUrl({ url })

  const headers = new Headers(config?.headers)
  let newBody = body

  if (!(body instanceof FormData)) {
    headers.append('Content-Type', 'application/json')
    headers.append('accept', 'application/json')

    newBody = JSON.stringify(config?.body)
  }

  let res = {} as globalThis.Response
  let response = {} as CustomResponse<ResponseData>

  try {
    const newHeaders = await getHeaders({ headers, authMode })

    // REQUEST
    res = await fetch(newUrl, {
      ...config,
      headers: newHeaders,
      body: newBody,
      method,
    })

    response = await res.json()
  } catch (e) {
    if (e instanceof TokenNotFoundError) {
      return getErrorResponse({ message: e.message })
    }

    let message = 'Error en la solicitud'

    if (process.env.NODE_ENV === 'development') {
      const displayedUrl = typeof url === 'string' ? `/${url}` : url.pathname
      message += ` : ${displayedUrl} ( ${res.status} - ${res.statusText} )`
    }

    return getErrorResponse({ message })
  }

  if (!response.ok) return response

  if (onSuccess) {
    await onSuccess(response.data)
  }

  if (revalidatePathParams) {
    revalidatePath(...revalidatePathParams)
  }

  if (revalidateTagParams) {
    revalidateTag(revalidateTagParams)
  }

  // RETURN
  return response
}
