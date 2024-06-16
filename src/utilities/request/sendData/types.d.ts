import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

type Config<Body> = Omit<RequestInit, 'body'> &
  (Body extends object ? { body: Body } : { body?: Body }) & { method?: 'POST' | 'PUT' | 'DELETE' }

export type DefaultArgs<Response, Body> = {
  url: string | URL
  config?: Config<z.infer<Body>>
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
    schema?: Body
    revalidateTagParams?: Parameters<typeof revalidateTag>
    revalidatePathParams?: Parameters<typeof revalidatePath>
    onSuccess?: (data: Response) => Promise<void> | void
    responseSchema?: z.ZodType<Response>
  }
}

type CustomResponse<ResponseData = object> = { msg: string } & (
  | {
      ok: true
      data: ResponseData
    }
  | {
      ok: false
      data: null
    }
)
