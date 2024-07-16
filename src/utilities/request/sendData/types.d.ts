import { Options } from '@/utilities/handleResponse'
import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

type Config<Body> = Omit<RequestInit, 'body'> &
  (Body extends undefined ? { body?: undefined } : { body: Body }) & { method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH' }

export type DefaultArgs<BodySchema extends ZodType, ResponseData> = {
  url: string | URL
  config?: Config<z.infer<BodySchema>>
  mode?: 'default' | 'null' | 'error-page'
  /**
   * Determines the authentication mode of the petition.
   *
   * - `'auth-required'`: Requires a token. **(Default)**
   * - `'auth-not-required'`: Doesn't require a token.
   * - `'auth-no-auth'`: Petition can work with/without a token.
   *
   */
  authMode?: 'auth-required' | 'auth-not-required' | 'auth-no-auth'
  options?: {
    schema?: BodySchema
    revalidateTagParams?: Parameters<typeof revalidateTag>[0]
    revalidatePathParams?: Parameters<typeof revalidatePath>
    // responseSchema?: z.ZodType<Response>
  } & Pick<Options<ResponseData>, 'onSuccess'>
}

type CommonAttributesResponse = { msg: string }
export type SuccesResponse<ResponseData> = { ok: true; data: ResponseData } & CommonAttributesResponse
export type ErrorResponse = { ok: false; data: null } & CommonAttributesResponse

type CustomResponse<ResponseData> = SuccesResponse<ResponseData> | ErrorResponse
