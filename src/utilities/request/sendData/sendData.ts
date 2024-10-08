import { axios } from '@/lib/axiosInstance'
import { z, ZodType } from 'zod'
import { SuccesResponse } from './types'

type DefaultArgs<BodySchema extends ZodType> = {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
} & (
  | {
      data?: undefined
      schema?: undefined
    }
  | {
      schema: BodySchema
      data: z.infer<BodySchema>
    }
)

export async function sendData<ResponseData, BodySchema extends ZodType = ZodType>(
  args: DefaultArgs<BodySchema>,
): Promise<SuccesResponse<ResponseData>> {
  const { schema, data, method = 'POST', ...restArgs } = args

  // VALIDATIONS BEFORE REQUEST
  if (data && schema) {
    const validation = validateDataBeforeSendingRequest({ data, schema })

    if (!validation.success) {
      throw new Error(validation.message)
      // const axiosError = new AxiosError('Validation failed', AxiosError.ERR_BAD_REQUEST)
      // axiosError.status = HttpStatusCode.BadRequest

      // throw axiosError
    }
  }

  // SEND REQUEST
  const response = await axios<SuccesResponse<ResponseData>>({
    ...restArgs,
    method,
    data,
  })

  return response.data
}

export function validateDataBeforeSendingRequest({ data, schema }: { data: unknown; schema: ZodType }) {
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
