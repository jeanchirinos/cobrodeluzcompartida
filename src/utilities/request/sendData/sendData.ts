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
  } catch (e) {
    // const displayedUrl = typeof url === 'string' ? `/${url}` : url.pathname
    // const message = `${res.status} - ${res.statusText} - ${displayedUrl}`

    if (e instanceof TokenNotFoundError) {
      return getErrorResponse({ message: e.message })
    }

    const message = 'Error en la solicitud'

    return getErrorResponse({ message })
  }

  const response = (await res.json()) as CustomResponse<ResponseData>

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
