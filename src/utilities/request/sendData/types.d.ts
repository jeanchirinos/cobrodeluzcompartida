import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

type Config<Body> = Omit<RequestInit, 'body'> &
  (Body extends object ? { body: Body } : { body?: Body }) & { method?: 'POST' | 'PUT' | 'DELETE' }

export type DefaultArgs<Response, Body> = {
  url: string | URL
  config?: Config<Body>
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
    schema?: z.ZodType<Body>
    revalidateTagParams?: Parameters<typeof revalidateTag>
    revalidatePathParams?: Parameters<typeof revalidatePath>
    onSuccess?: (data: Response) => Promise<void> | void
    responseSchema?: z.ZodType<Response>
  }
}

export type ArgsNewSendDataModeDefault = { mode?: 'default' }
export type ArgsNewSendDataModeNull = { mode?: 'null' }
export type ArgsNewSendDataModeErrorPage = { mode?: 'error-page' }

export type ArgsNewSendData = DefaultArgs &
  (ArgsNewGetDataModeDefault | ArgsNewGetDataModeNull | ArgsNewGetDataModeErrorPage)
