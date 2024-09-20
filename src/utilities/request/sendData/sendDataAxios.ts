import { axios } from '@/lib/axiosInstance'
import { ZodType } from 'zod'
import { getErrorResponse } from './constants'
import { CustomResponse } from './types'
import { AxiosError } from 'axios'

type DefaultArgs<BodySchema extends ZodType = ZodType> = {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE'
} & (
  | {
      data?: undefined
      schema?: undefined
    }
  | {
      data: any
      schema: BodySchema
    }
)

export async function sendDataAxios<ResponseData, BodySchema extends ZodType = ZodType>(
  args: DefaultArgs<BodySchema>,
): Promise<CustomResponse<ResponseData>> {
  const { schema, data, method = 'POST', ...restArgs } = args

  // VALIDATIONS BEFORE REQUEST
  if (data && schema) {
    const validation = validateDataBeforeSendingRequest({ data, schema })

    if (!validation.success) {
      return getErrorResponse({ message: validation.message })
    }
  }

  // SEND REQUEST
  return await axios<CustomResponse<ResponseData>>({
    ...restArgs,
    method,
    data,
  })
    .then(res => {
      return res.data
    })
    .catch((error: AxiosError) => {
      return getErrorResponse({ message: error.message })
    })
}

export function validateDataBeforeSendingRequest({ data, schema }: { data: any; schema: ZodType }) {
  const validationResult = schema.safeParse(data)

  if (!validationResult.success) {
    let message = 'Error en la validación de datos'

    if (process.env.NODE_ENV === 'development') {
      message = JSON.stringify(validationResult.error.issues)
    }

    return {
      success: false,
      message,
    } as const
  }

  return {
    success: true,
  } as const
}
