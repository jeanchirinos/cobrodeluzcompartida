import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

type Config<Body> = Omit<RequestInit, 'body'> &
  (Body extends object ? { body: Body } : { body?: Body }) & { method?: 'POST' | 'PUT' | 'DELETE' }

export type DefaultArgs<Body, Response> = {
  url: string | URL
  config?: Config<Body>
  mode?: 'default' | 'null' | 'error-page'
  /**
   * - auth-required: Requires a token
   * - auth-not-required: Doesn't require a token
   * - auth-no-auth: Petition can work with/without a token
   */
  authMode?: 'auth-required' | 'auth-not-required' | 'auth-no-auth'
  options?: {
    schema?: z.ZodObject<ZodRawShape> | z.ZodEffects<any>
    revalidateTagParams?: Parameters<typeof revalidateTag>
    revalidatePathParams?: Parameters<typeof revalidatePath>
    onSuccess?: (data: Response) => Promise<void> | void
  }
}

export type ArgsNewSendDataModeDefault = { mode?: 'default' }
export type ArgsNewSendDataModeNull = { mode?: 'null' }
export type ArgsNewSendDataModeErrorPage = { mode?: 'error-page' }

export type ArgsNewSendData = DefaultArgs &
  (ArgsNewGetDataModeDefault | ArgsNewGetDataModeNull | ArgsNewGetDataModeErrorPage)
