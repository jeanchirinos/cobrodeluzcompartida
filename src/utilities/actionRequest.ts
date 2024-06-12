'use server'

import { requestAll } from '@/utilities/request'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { ZodError, ZodRawShape, z } from 'zod'
import { getFormEntries } from './utilities'

// Types
interface BaseConfig extends Omit<RequestInit, 'body'> {
  body?: object
  auth?: boolean
  redirectIfUnauthorized?: boolean // if auth is true this will have effect
  authIsOptional?: boolean
}

interface NotNullableConfig extends BaseConfig {
  nullable?: false
}

type RequestParamsNotNullable = [url: Parameters<typeof fetch>['0'], config?: NotNullableConfig]

export async function actionRequestPost<Response>(...params: RequestParamsNotNullable) {
  const [url, config = {}] = params

  const headers: HeadersInit = {}

  if (config.auth) {
    const jwt = cookies().get('jwt')

    if (!jwt) {
      throw new Error('Sin token')
    }

    headers.Cookie = cookies().toString()
  }

  const myConfig = {
    ...config,
    headers: { ...config.headers, ...headers },
  }

  try {
    const res = await requestAll<Response>(url, myConfig)

    const { ok = true, msg = '', data } = res as { ok: true; msg: string; data: Response }

    return { msg, ok, data: data ?? res }
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, msg: e.message, data: undefined } as const
    }

    return { ok: false, msg: 'Hubo un error en la petición', data: undefined } as const
  }
}

// POST
type Params<Body, Response> = {
  url: string
  body?: Body
  schema?: z.ZodObject<ZodRawShape> | z.ZodEffects<any>
  revalidateTagParams?: Parameters<typeof revalidateTag>
  revalidatePathParams?: Parameters<typeof revalidatePath>
  onSuccess?: (data: Response) => Promise<void> | void
  auth?: boolean
  method?: 'POST' | 'PUT' | 'DELETE'
}

export async function sendData<Body extends object, Response = {}>(params: Params<Body, Response>) {
  const {
    url,
    body,
    schema,
    onSuccess,
    revalidatePathParams,
    revalidateTagParams,
    auth = true,
    method = 'POST',
  } = params

  if (body && schema) {
    const dataToValidate = body instanceof FormData ? getFormEntries(body) : body

    try {
      schema.parse(dataToValidate)
    } catch (error) {
      if (error instanceof ZodError) {
        const message = `${error.issues[0].path[0]} : ${error.issues[0].message}`

        return { ok: false, msg: message, data: undefined } as const
      }

      return { ok: false, msg: 'Error en la validación de datos', data: undefined } as const
    }
  }

  const res = await actionRequestPost<Response>(url, {
    body,
    auth,
    method,
  })

  if (res.ok) {
    if (onSuccess) {
      await onSuccess(res.data)
    }

    if (revalidatePathParams) {
      revalidatePath(...revalidatePathParams)
    }

    if (revalidateTagParams) {
      revalidateTag(...revalidateTagParams)
    }
  }

  return res
}
